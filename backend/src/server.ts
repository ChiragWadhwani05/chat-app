import { config } from "dotenv";
config({ path: ".env" });
import http from "http";
import { Server } from "socket.io";

import connectDB from "./db/connection";
import { app } from "./app";

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
	console.log("Connected", socket.id);
	socket.on("message", (message) => {
		io.emit("message", message);
	});
	socket.on("disconnect", () => {
		console.log("Disconnected", socket.id);
	});
});

app.get("/api/v1", (req, res) => {
	res.send("<h1>Hello User!</h1>");
});

connectDB()
	.then(() => {
		server.listen(port, () => {
			console.log(`⚡️ Server is running at http://localhost:${port}`);
		});
	})
	.catch((error) => {
		console.log("Failed to connectDB", error);
	});
