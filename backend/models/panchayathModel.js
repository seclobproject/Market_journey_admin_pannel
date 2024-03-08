import mongoose from "mongoose";

const panchayathSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    stateName: {
      type: String
    },
    districtName: {
      type: String
    },
    zonalName: {
      type: String
    },
    count:{
      type:Number 
    }
  },
  {
    timestamps: true,
  }
);

const Panchayath = mongoose.model("Panchayath", panchayathSchema);

export default Panchayath;
