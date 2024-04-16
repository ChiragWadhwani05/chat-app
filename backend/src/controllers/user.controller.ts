import express from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";
import { User } from "../models/user.model";
import { uploadToCloudinary } from "../utils/cloudinary";

const avatarImages = [
	"https://res.cloudinary.com/chatapp1212/image/upload/v1713257423/ngqg1nqg9vrtwz5ndc8q.jpg",
	"https://res.cloudinary.com/chatapp1212/image/upload/v1713257422/zbh8my9d1s0evszd7uv5.jpg",
	"https://res.cloudinary.com/chatapp1212/image/upload/v1713257422/u3posw6xuqvclyyuwfht.jpg",
	"https://res.cloudinary.com/chatapp1212/image/upload/v1713257422/jgqnppiuw5fujlpl934b.jpg",
];

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

export { registerUser };
