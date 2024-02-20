import mongoose from "mongoose";

const panchayathSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    mobileUser: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "MobileUser",
      }],

  },
  {
    timestamps: true,
  }
);

const Panchayath = mongoose.model("Panchayath", panchayathSchema);

export default Panchayath;
