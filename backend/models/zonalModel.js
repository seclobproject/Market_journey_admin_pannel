import mongoose from "mongoose";

const zonalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
