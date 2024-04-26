import mongoose from "mongoose";

const zonalSchema = new mongoose.Schema(
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
    panchayaths: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Panchayath",
      }],
      taken:{
        type:Boolean,
        default:false
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

const Zonal = mongoose.model("Zonal", zonalSchema);

export default Zonal;
