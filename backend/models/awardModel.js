import mongoose from "mongoose";

const awardSchema = new mongoose.Schema(
    {
    memberName: {
    type: String,
    required: true
    },
    achivedDetails: {
      type: String,
      required: true
    },
    memberImage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Award = mongoose.model("Award", awardSchema);

export default Award;
