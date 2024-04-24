import express from "express";
import {
	isUsernameAvailable,
	loginUser,
	logoutUser,
	registerUser,
} from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";

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

router.route("/login").post(loginUser);

// router.route("/getById").get(getUserById);
// router.route("/getByUsername").get(getUserByUsername);

// secured routes

router.route("/logout").post(verifyJWT, logoutUser);

export default router;
