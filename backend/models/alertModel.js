import mongoose from "mongoose";


const signalSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const alertSchema = new mongoose.Schema({
niftySignals:[signalSchema],
bankNiftySignals:[signalSchema],
crudeOilSignal:[signalSchema],
},  {
    timestamps: true,
  });

const Alert = mongoose.model("Alert", alertSchema);

export default Alert;
