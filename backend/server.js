import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRouter from "./router/adminRoute.js";
import userRouter from "./router/userRoute.js";
import dbConnect from "./config/dbConnect.js";

const NODE_ENV = "production";
const app = express();

// Database connection
dbConnect();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Serving static files
app.use(
  "/uploads",
  express.static("/var/www/seclob/marketjourney/adminfolder/uploads")
);
// app.use("/uploads", express.static("uploads"));

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

// Production setup
if (NODE_ENV === "production") {
  // Serve frontend files
  app.use(
    express.static("/var/www/seclob/marketjourney/adminfolder/frontend/dist")
  );

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(
      "/var/www/seclob/marketjourney/adminfolder/frontend/dist/index.html"
    );
  });
}

// Starting the server
const PORT = process.env.PORT || 6003;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
