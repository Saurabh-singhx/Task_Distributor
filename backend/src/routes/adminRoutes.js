import express from "express"

const router = express.Router();

import { checkAdmin, protectRoute } from "../middleware/auth.middleware.js";
import { createUser, deleteUsersAllTasks, uploadFile } from "../controller/admin.controller.js";
import { uploadMiddleware } from "../middleware/multer.middleware.js";

router.post("/uploadfile",checkAdmin,uploadMiddleware,uploadFile);
router.post("/createuser",checkAdmin,createUser);
router.delete("/deleteusersalltasks",checkAdmin,deleteUsersAllTasks);

export default router;