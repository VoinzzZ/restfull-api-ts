import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./interfaces/routes/user.routes";
import { errorHandler } from "./interfaces/middlewares/errorHandler";

dotenv.config();

const app = express();

// --- Global Middlewares ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.use("/api/users", userRoutes);

// --- Health Check ---
app.get("/", (req, res) => {
    res.json({ status: "ok", message: "API is running" });
});

// --- Global Error Handler (must be last) ---
app.use(errorHandler);

export default app;