import express from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";
import { User } from "../models/user.model";
import { uploadToCloudinary } from "../utils/cloudinary";
import mongoose from "mongoose";

const avatarImages = [
	"https://res.cloudinary.com/chatapp1212/image/upload/v1713257423/ngqg1nqg9vrtwz5ndc8q.jpg",
	"https://res.cloudinary.com/chatapp1212/image/upload/v1713257422/zbh8my9d1s0evszd7uv5.jpg",
	"https://res.cloudinary.com/chatapp1212/image/upload/v1713257422/u3posw6xuqvclyyuwfht.jpg",
	"https://res.cloudinary.com/chatapp1212/image/upload/v1713257422/jgqnppiuw5fujlpl934b.jpg",
];

const generateTokens = async (userId: mongoose.Types.ObjectId) => {
	try {
		const user = await User.findById(userId);
		if (!user) {
			throw new ApiError(404, "User not found");
		}
		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (error) {
		throw new ApiError(500, "Something went wrong while generating tokens");
	}
};

const isUsernameAvailable = asyncHandler(async (req: any, res: any) => {
	const username = req.query.username;
	if (!username || username?.trim() === "") {
		throw new ApiError(400, "Username is required");
	}

	const user = await User.findOne({ username: username });
	if (!user) {
		return res.json(
			new ApiResponse(200, true, "Username available", { username })
		);
	}
	return res.json(new ApiResponse(409, false, "Username already in use", null));
});

const registerUser = asyncHandler(async (req: any, res: any) => {
	const data = JSON.parse(req.body.data);

	// Check if necessary data is provided
	if ([data.username, data.password].some((field) => field.trim() === "")) {
		throw new ApiError(400, "Username and password are necessary");
	}

	if (await User.findOne({ username: data.username })) {
		throw new ApiError(400, "Username already exists");
	}

	// choose a random num between 0 to avatarImages.length()
	const imageNum = Math.floor(Math.random() * avatarImages.length);
	// Upload image to cloudinary
	const avatarCloudinaryPath = req.files?.avatar
		? (await uploadToCloudinary(req.files.avatar[0].path)).secure_url
		: avatarImages[imageNum];

	// Create new user
	const user = await User.create({
		username: data.username,
		password: data.password,
		fullname: data.fullname || "",
		email: data.email || "",
		avatar: avatarCloudinaryPath,
	});

	const createdUser = await User.findById(user._id).select(
		"-password -refreshToken"
	);

	if (!createdUser) {
		throw new ApiError(500, "Something went wrong while registering user");
	}

	return res
		.status(200)
		.json(
			new ApiResponse(200, true, "User registered successfully", createdUser)
		);
});

const loginUser = asyncHandler(async (req: any, res: any) => {
	const { username, password } = req.body;
	if (!username || !password) {
		throw new ApiError(400, "Username and password are necessary");
	}
	const user = await User.findOne({ username: username });
	if (!user) {
		throw new ApiError(404, "User not found");
	}

	const isPasswordCorrect = await user.isPasswordCorrect(password);

	if (!isPasswordCorrect) {
		throw new ApiError(401, "Incorrect password");
	}

	const { accessToken, refreshToken } = await generateTokens(user._id);
	const loggedInUser = await User.findById(user._id).select(
		"-password -refreshToken"
	);
	const options = {
		httpOnly: true,
		secure: true,
	};

	// TODO: Add options when in production
	return res
		.status(200)
		.cookie("accessToken", accessToken)
		.cookie("refreshToken", refreshToken)
		.json(
			new ApiResponse(200, true, "User logged in successfully", {
				user: loggedInUser,
				accessToken,
				refreshToken,
			})
		);
});

const logoutUser = asyncHandler(async (req: any, res: any) => {
	await User.findByIdAndUpdate(
		req.user._id,
		{
			$set: {
				refreshToken: "",
			},
		},
		{
			new: true,
		}
	);
	const options = {
		httpOnly: true,
		secure: true,
	};

	return res
		.status(200)
		.clearCookie("accessToken")
		.clearCookie("refreshToken")
		.json(new ApiResponse(200, true, "User logged out successfully", null));
});

export { registerUser, isUsernameAvailable, loginUser, logoutUser };
