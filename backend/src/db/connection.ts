import mongoose from "mongoose";

const connectDB = async () => {
	const url = process.env.DB_URL;
	if (url) {
		try {
			const connectionInstance = await mongoose.connect(
				`${url}/${process.env.DB_NAME}`,
				{}
			);
			console.log(
				"\n☘️  MongoDB connected " + connectionInstance.connection.host
			);
		} catch (error) {
			console.log(error);
			process.exit(1);
		}
	} else {
		console.log("Could not find Database URL");
		process.exit(1);
	}
};

export default connectDB;
