import  express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRouter from "./router/adminRoute.js";

import dbConnect from "./config/dbConnect.js";
dbConnect();

const app=express();
app.use(cors())


app.use(express.json());
app.use(cookieParser());

app.use("/api/admin", adminRouter);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server Error";
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  });

app.listen(3001,()=>{
    console.log('Server listening on port 3001');
})