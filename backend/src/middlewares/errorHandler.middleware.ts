import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";

const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// If the error is an instance of ApiError, use its properties
	if (err instanceof ApiError) {
		return res.status(err.statusCode).json({
			success: err.success,
			message: err.message,
			data: err.data,
			errors: err.errors,
			stack: process.env.NODE_ENV === "production" ? null : err.stack,
		});
	}

	// For other unexpected errors
	return res.status(500).json({
		success: false,
		message: "Internal Server Error",
		data: null,
		errors: [{ message: err.message }],
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};

export { errorHandler };
