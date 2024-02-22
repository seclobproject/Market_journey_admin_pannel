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
    packageAmount:{
      type: Number,
      required: true,
    },
    panchayath: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Panchayath",
      },

  },
  {
    timestamps: true,
  }
);

const Zonal = mongoose.model("Zonal", zonalSchema);

export default Zonal;
