import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		fullname: {
			type: String,
		},
		password: {
			type: String,
			required: true,
			Selection: false,
		},
		avatar: {
			type: String,
			default: "",
		},
		email: {
			type: String,
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		bio: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

// Hash password before saving into database
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	const salt = await bcryptjs.genSalt(10);
	this.password = await bcryptjs.hash(this.password, salt);
	next();
});

// Generate access token
userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{ userId: this._id, username: this.username },
		process.env.ACCESS_TOKEN_SECRET || "chatApp",
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
		}
	);
};

// Generate refresh token
userSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{ userId: this._id },
		process.env.REFRESH_TOKEN_SECRET || "chatApp",
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
		}
	);
};

// Check password
userSchema.methods.isPasswordCorrect = async function (
	candidatePassword: string
) {
	return await bcryptjs.compare(candidatePassword, this.password);
};

export const User = mongoose.model("User", userSchema);
