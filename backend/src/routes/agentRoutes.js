import express from "express"
import { getTask } from "../controller/agent.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/agent-task",protectRoute,getTask);

export default router;