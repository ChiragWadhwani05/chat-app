import express from "express";
import {
	regenerateTokens,
	getUserById,
	getUserByUsername,
	isUsernameAvailable,
	loginUser,
	logoutUser,
	registerUser,
	searchUsers,
	getUser,
} from "../controllers/user.controller";
// import { upload } from "../middlewares/multer.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/is-username-available").get(isUsernameAvailable);

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

// secured routes
router.use(verifyJWT);

router.route("/").get(getUser);
router.route("/getById").get(getUserById);
router.route("/getByUsername").get(getUserByUsername);
router.route("/logout").post(logoutUser);
router.route("/refresh-token").get(regenerateTokens);
router.route("/search-user").get(searchUsers);

export default router;
