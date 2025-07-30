import express from "express"

const router = express.Router();

import { checkAdmin, protectRoute } from "../middleware/auth.middleware.js";
import { createUser, uploadFile } from "../controller/admin.controller.js";
import { uploadMiddleware } from "../middleware/multer.middleware.js";

router.post("/uploadfile",protectRoute,uploadMiddleware.single('file'),uploadFile);
router.post("/createuser",checkAdmin,createUser)

export default router;