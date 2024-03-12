import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

},  {
    timestamps: true,
  });

const Alert = mongoose.model("Alert", alertSchema);

export default Alert;
