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
  const autoPoolDistributionSchema = new mongoose.Schema(
    {
      reportName: String,
      distributedAmount:Number,
      amountpoolA: Number,
      amountpoolB: Number,
      amountpoolC: Number,
      amountpoolD: Number,
      amountpoolE: Number,
      countInPoolA:Number,
      countInPoolB:Number,
      countInPoolC:Number,
      countInPoolD:Number,
      countInPoolE:Number,
      status: String,
    },
    {
      timestamps: true,
    }
  );

    const addBounusSchema = new mongoose.Schema(
      {
        reportName: String,
        userID: String,
        name: String,
        bonusAmount:Number,
        transactionId:String,
        description:String,
        phone:Number,
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
autoPoolPercentageA:Number,
autoPoolPercentageB:Number,
autoPoolPercentageC:Number,
autoPoolPercentageD:Number,
autoPoolPercentageE:Number,
autoPoolWallet:{
  type: Number,
  default: 0,
},
shareFromPool:{
  type:Number,
  default:0
},
totalShareFromPool:{
  type:Number,
  default:0
},
totalPaidBonusAmount:{
  type:Number,
  default:0
},
totalPaidPoolAmount:{
  type:Number,
  default:0
},
autoPoolHistory:[autoPoolSchema],
autoPoolDistributionHistory:[autoPoolDistributionSchema],
addBounusHistory:[addBounusSchema],

});
      
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;