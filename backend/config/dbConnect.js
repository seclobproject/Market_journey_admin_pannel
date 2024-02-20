import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();



const dbConnect = () => {
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log(err);
    })
};

export default dbConnect;
