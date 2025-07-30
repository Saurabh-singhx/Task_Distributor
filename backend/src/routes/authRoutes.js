import express from "express"
import { adminLogIn, adminSignUp, checkAuth, login, logout, signup } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/adminlogin",adminLogIn);
// router.post("/adminsignup",adminSignUp);
router.get("/check",protectRoute,checkAuth);

export default router;