import { ApiError } from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import { User } from "../models/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req: any, res: any, next: any) => {
	try {
		const token =
			req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];

		if (!token) {
			throw new ApiError(401, "Unauthorized");
		}
		const decodedToken = jwt.verify(
			token,
			process.env.ACCESS_TOKEN_SECRET || "chatApp"
		) as JwtPayload;
		const user = await User.findById(decodedToken?._id).select(
			"-password -refreshToken"
		);

		if (!user) {
			throw new ApiError(401, "Invalid Access Token");
		}
		console.log(decodedToken);
		req.user = user;
		next();
	} catch (error: any) {
		throw new ApiError(401, error.message);
	}
});
