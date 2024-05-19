import multer from "multer";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./public/uploads");
	},
	filename: (req, file, cb) => {
		const { originalname } = file;

		const dotIndex = originalname.lastIndexOf(".");

		const fileName = originalname.substring(0, dotIndex).trim();
		const fileFormat = originalname.substring(dotIndex);

		const uniqueSuffix =
			Date.now() + "-" + Math.round(Math.random() * Number(1000000));
		cb(null, fileName + "-" + uniqueSuffix + fileFormat);
	},
});

const multerOptions = {
	storage,
	limits: {
		fileSize: 10 * 1024 * 1024,
	},
};

export const upload = multer(multerOptions);
