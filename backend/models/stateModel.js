import mongoose from "mongoose";

const stateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    districts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "District",
      }],
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

const State = mongoose.model("State", stateSchema);

export default State;
