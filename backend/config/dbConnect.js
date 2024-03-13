import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();



const dbConnect = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/marketjourney").then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log(err);
    })
};

export default dbConnect;
