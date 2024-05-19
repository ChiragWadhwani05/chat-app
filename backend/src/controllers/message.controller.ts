import { Chat } from "../models/chat.model";
import { Message } from "../models/message.model";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";

const createMessage = asyncHandler(async (req: any, res: any) => {
	const senderId = req.user._id;
	const { chatId, content } = req.body;

	if (!chatId || !content) {
		throw new ApiError(400, "Chat ID and content are required");
	}

	const chat = await Chat.findById(chatId);

	if (!chat) {
		throw new ApiError(404, "Chat not found");
	}
	if (chat.participants.indexOf(senderId) === -1) {
		throw new ApiError(400, "You are not a participant of this chat");
	}

	const message = await Message.create({
		sender: senderId,
		chat: chatId,
		content,
	});

	return res
		.status(200)
		.json(new ApiResponse(200, true, "Message sent", message));
});

const getChatMessages = asyncHandler(async (req: any, res: any) => {
	const userId = req.user._id;
	const chatId = req.params.chatId;

	const chat = await Chat.findById(chatId);

	if (!chat) {
		throw new ApiError(404, "Chat not found");
	}

	const messages = await Message.find({ chat: chatId }).sort({
		createdAt: -1,
	});
	// TODO: Add pagination
	return res
		.status(200)
		.json(new ApiResponse(200, true, "Messages found", messages));
});

export { createMessage, getChatMessages };
