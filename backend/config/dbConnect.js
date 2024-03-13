import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();



const dbConnect = () => {
    mongoose.connect("mongodb+srv://seclobclt:Kt8ijiCdxYWON9N5@marketjourney.xbtw2lb.mongodb.net/market_journey?retryWrites=true&w=majority").then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log(err);
    })
};

export default dbConnect;
