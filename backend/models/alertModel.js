import mongoose from "mongoose";


const alertSchema = new mongoose.Schema({
  title: String,
  description: String,
},  {
    timestamps: true,
  });

const Alert = mongoose.model("Alert", alertSchema);

export default Alert;
