import mongoose from "mongoose";

const homeVideoSchema = new mongoose.Schema(
    {
    videoTitle: {
    type: String,
    required: true
    },
    videoLink: {
      type: String,
      required: true
    },
    videoThambnail: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const homeVideo = mongoose.model("homeVideo", homeVideoSchema);

export default homeVideo;
