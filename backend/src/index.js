import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ConnectDB } from "./lib/db.js";
import authRoutes from "./routes/authRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


const app = express();
dotenv.config();

const PORT = process.env.PORT || 4005;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use("/api/admin", adminRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
  ConnectDB();
});