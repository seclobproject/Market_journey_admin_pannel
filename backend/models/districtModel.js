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
      }
  },
  {
    timestamps: true,
  }
);

const District = mongoose.model("District", districtSchema);

export default District;
