import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";
import fs from "fs";
import { ApiError } from "./apiError";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});

const uploadToCloudinary = async (filePath: string) => {
	try {
		if (!filePath) {
			throw new ApiError(400, "File path is missing or invalid");
		}

		const compressedImagePath = `${filePath}-compressed.jpg`; // Adjust file extension if needed
		await sharp(filePath)
			.resize({ width: 800 })
			.jpeg({ quality: 80 })
			.toFile(compressedImagePath);

		// Upload the compressed image file to Cloudinary
		const response = await cloudinary.uploader.upload(compressedImagePath, {
			resource_type: "auto",
		});

		fs.unlinkSync(filePath); // Delete the file from the server
		fs.unlinkSync(compressedImagePath); // Delete the file from the server

		return response;
	} catch (error: any) {
		fs.unlinkSync(filePath); // Delete the file from the server
		throw new ApiError(
			error.status || 500,
			error.message || "Something went wrong while uploading file to cloudinary"
		);
	}
};

export { uploadToCloudinary };
