import asyncHandler from "../utils/asyncHandler";
import { Chat } from "../models/chat.model";
import { Message } from "../models/message.model";
import { User } from "../models/user.model";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";

const createChat = asyncHandler(async (req: any, res: any) => {
	const userId = req.user._id;
	const data = req.body;

	if (!data.receiverId) {
		throw new ApiError(400, "Receiver ID is required");
	}
	const receiver = await User.findById(data.receiverId);
	if (!receiver) {
		throw new ApiError(404, "Receiver not found");
	}
	const chat = await Chat.create({
		participants: [userId, data.receiverId],
	});
	// send the message to the receiver
	const message = await Message.create({
		sender: userId,
		chat: chat._id,
		content: data.content,
	});

	return res
		.status(200)
		.json(new ApiResponse(200, true, "Chat created successfully", message));
});

const createGroupChat = asyncHandler(async (req: any, res: any) => {
	const userId = req.user._id;
	const { name, participants } = req.body;

	if (!name) {
		throw new ApiError(400, "Group name is required");
	}
	if (participants.length < 2) {
		throw new ApiError(400, "A Group must have at least 3 members");
	}

	const chat = await Chat.create({
		name: name,
		participants: [...participants, userId],
		admin: userId,
		isGroupChat: true,
	});

	if (!chat) {
		throw new ApiError(500, "Failed to create group chat");
	}

	return res.status(200).json(new ApiResponse(200, true, "Group created", chat));
});

export { createChat, createGroupChat };
