import  express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRouter from "./router/adminRoute.js";
import userRouter from "./router/userRoute.js";

import dbConnect from "./config/dbConnect.js";
dbConnect();

const NODE_ENV = "production";
const app=express();
app.use(cors())


app.use(express.json());
app.use(cookieParser());

// Uploads
// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/uploads", express.static("/var/www/seclob/marketjourney/uploads"));
// Uploads

// const appDir = path.resolve(process.cwd());
// console.log(appDir);

app.use("/api/user",userRouter );
app.use("/api/admin", adminRouter);

if (NODE_ENV == "production") {
  // app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  // });

  app.use(express.static("/var/www/seclob/marketjourney/frontend/dist"));

  app.get("*", (req, res) => {
    res.sendFile("/var/www/seclob/marketjourney/frontend/dist/index.html");
  });

} else {
  app.get("/", (req, res) => {
    res.status(201).json("Running");
  });
}

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server Error";
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  });

app.listen(8000,()=>{
    console.log('Server listening on port 8000');
})