import mongoose from "mongoose";

const homeImageSchema = new mongoose.Schema(
  {
    description: {
      type: String
    },
    homeImage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const HomeImage = mongoose.model("HomeImage", homeImageSchema);

export default HomeImage;
