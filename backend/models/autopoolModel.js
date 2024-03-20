import mongoose from "mongoose";

const autoPoolSchema = new mongoose.Schema({
  poolA:[{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  poolB: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  poolC: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  poolD: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

},  {
    timestamps: true,
  });

const AutoPool = mongoose.model("AutoPool", autoPoolSchema);

export default AutoPool;
