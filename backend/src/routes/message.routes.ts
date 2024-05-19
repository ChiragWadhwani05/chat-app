import express from "express";
import {
	createMessage,
	getChatMessages,
} from "../controllers/message.controller";

const router = express.Router();

import { verifyJWT } from "../middlewares/auth.middleware";

router.use(verifyJWT);

router.route("/create-message").post(createMessage);
router.route("/get-chat-messages/:chatId").get(getChatMessages);

export default router;
