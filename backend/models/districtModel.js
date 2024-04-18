import mongoose from "mongoose";

const districtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    stateName: {
      type: String
    },
    zonals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Zonal",
      }],
      taken:{
        type:Boolean,
        default:false
      },
      editable:{
        type:Boolean,
        default:true
      },
      zonalFranchises: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      mobileFranchises: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      signalFranchises: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      courseFranchises: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const District = mongoose.model("District", districtSchema);

export default District;
