import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		isGroupChat: {
			type: Boolean,
			required: true,
		},
		avatar: {
			type: String,
			default: "",
		},
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
			},
		],
	},
	{
		timestamps: true,
	}
);

export const Chat = mongoose.model("Chat", chatSchema);
