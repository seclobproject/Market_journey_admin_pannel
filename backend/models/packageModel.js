import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    packageName:{
      type: String
    },
    packageAmount: {
      type: String,
      required: true,
    },
    renewalAmount:{
      type:Number,
      required:true
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
