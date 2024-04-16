import express from "express";
import {
	isUsernameAvailable,
	registerUser,
} from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";

const router = express.Router();

router.route("/is-username-available").get(isUsernameAvailable);

router.route("/register").post(
	upload.fields([
		{
			name: "avatar",
			maxCount: 1,
		},
	]),
	registerUser
);

export default router;
