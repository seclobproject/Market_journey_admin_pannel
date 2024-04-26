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
    },
    editable:{
      type:Boolean,
      default:true
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    demates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Demate" }],

  },
  {
    timestamps: true,
  }
);

const Panchayath = mongoose.model("Panchayath", panchayathSchema);

export default Panchayath;
