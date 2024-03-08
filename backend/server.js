import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRouter from "./router/adminRoute.js";
import userRouter from "./router/userRoute.js";
import dbConnect from "./config/dbConnect.js";

// Importing express
const app = express();

// Database connection
dbConnect();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Serving static files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});

// Starting the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
