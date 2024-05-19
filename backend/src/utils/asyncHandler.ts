const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
	Promise.resolve(fn(req, res, next)).catch((err) => {
		next(err);
	});
};

// const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
// 	try {
// 		fn(req, res, next);
// 	} catch (error: any) {
// 		res.status(500).json({ success: false, message: error.message });
// 	}
// };

export default asyncHandler;
