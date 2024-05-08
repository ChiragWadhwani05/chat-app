import asyncHandler from "../utils/asyncHandler";
import { Chat } from "../models/chat.model";
import { Message } from "../models/message.model";
import { User } from "../models/user.model";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { uploadToCloudinary } from "../utils/cloudinary";

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

	const isChatExists = await Chat.findOne({
		$or: [
			{ participants: [userId, data.receiverId] },
			{ participants: [data.receiverId, userId] },
		],
	});

	if (isChatExists) {
		throw new ApiError(400, "Chat already exists");
	}

	const chat = await Chat.create({
		isGroupChat: false,
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
		.json(new ApiResponse(200, true, "Chat created successfully", chat));
});

const createGroupChat = asyncHandler(async (req: any, res: any) => {
	const data = JSON.parse(req.body.data);
	const userId = req.user._id;
	const { name, participants } = data;

	const avatarCloudinaryPath = req.files?.avatar
		? (await uploadToCloudinary(req.files.avatar[0].path)).secure_url
		: null;

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
		avatar: avatarCloudinaryPath,
	});

	if (!chat) {
		throw new ApiError(500, "Failed to create group chat");
	}

	return res.status(200).json(new ApiResponse(200, true, "Group created", chat));
});

const getAllChats = asyncHandler(async (req: any, res: any) => {
	const userId = req.user._id;
	const chats = await Chat.find({
		participants: { $in: [userId] },
	})
		.populate(
			"participants",
			"-password -refreshToken -email -createdAt -updatedAt"
		)
		.sort({ updatedAt: -1 });

	const otherParticipant = (participants: any) => {
		participants = participants.filter(
			(participant: any) => participant._id != userId
		);

		if (participants[0].fullname) {
			return participants[0].fullname;
		}
		return participants[0];
	};
	const finalChats = chats.map((chat) => {
		const otherParticipants = (participants: any) => {
			participants = participants.filter(
				(participant: any) => participant._id != userId
			);
			return participants;
		};

		return {
			_id: chat._id,
			isGroupChat: chat.isGroupChat,
			name: chat.isGroupChat
				? chat.name
				: otherParticipants(chat.participants)[0].fullname,
			avatar: chat.isGroupChat
				? chat.avatar
					? chat.avatar
					: chat.participants
							.slice(0, 3)
							.map((participant: any) => participant.avatar)
				: otherParticipants(chat.participants)[0].avatar,
		};
	});

	return res
		.status(200)
		.json(new ApiResponse(200, true, "Chats found successfully", finalChats));
});

export { createChat, createGroupChat, getAllChats };
