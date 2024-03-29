import mongoose from "mongoose";




const autoPoolSchema = new mongoose.Schema(
    {
      reportName: String,
      userID: String,
      Amount:Number,
      franchise:String,
      franchiseName:String,
      name: String,
      percentageCredited:String,
      amountCredited: Number,
      status: String,
    },
    {
      timestamps: true,
    }
  );





const adminSchema = new mongoose.Schema({
    name:String,
username: String,
password: String,
isAdmin:{
    type: Boolean,
      default: true,
  },
childLevel1: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
childLevel2: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
poolA: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
poolB: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
poolC: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
poolD: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
poolE: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
autoPoolWallet:{
  type: Number,
  default: 0,
},
autoPoolHistory:[autoPoolSchema]
});
      
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;