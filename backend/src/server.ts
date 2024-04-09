import { config } from "dotenv";
config({ path: ".env" });

import connectDB from "./db/connection";
import { app } from "./app";

const port = process.env.PORT || 3000;

connectDB()
	.then(() => {
		app.listen(port, () => {
			console.log(`⚡️ Server is running at http://localhost:${port}`);
		});
	})
	.catch((error) => {
		console.log("Failed to connectDB", error);
	});
