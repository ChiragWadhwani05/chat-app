class ApiResponse {
	statusCode: number;
	data: any;
	message: string;
	success: boolean;

	constructor(
		statusCode: number,
		success: boolean,
		message = "Success",
		data: any
	) {
		this.statusCode = statusCode;
		this.success = success;
		this.message = message;
		this.data = data;
	}
}
export { ApiResponse };
