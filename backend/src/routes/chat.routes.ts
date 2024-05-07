import express from "express";
import {
	createChat,
	createGroupChat,
	getAllChats,
} from "../controllers/chat.controller";

import { verifyJWT } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

const router = express.Router();

router.use(verifyJWT);

router.route("/create-chat").post(createChat);
router.route("/create-group").post(
	upload.fields([
		{
			name: "avatar",
			maxCount: 1,
		},
	]),
	createGroupChat
);
router.route("/get-all-chats").get(getAllChats);

export default router;
