import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    franchiseName: {
      type: String,
      required: true,
      unique: true,
    },
    packageAmount: {
        type: String,
        required: true,
      },

      packageUsers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model("Package", packageSchema);

export default Package;
