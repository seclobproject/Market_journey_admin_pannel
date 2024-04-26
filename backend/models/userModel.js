import mongoose from "mongoose";
import Package from "./packageModel.js";

const allTransactionSchema = new mongoose.Schema(
  {
    userID: String,
    name: String,
    amount: Number,
    transactionCode: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const creditBounusSchema = new mongoose.Schema(
  {
    reportName: String,
    bonusAmount:Number,
    transactionId:String,
    description:String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const withdrawSchema = new mongoose.Schema(
  {
    name: String,
    reportName: String,
    ownID: String,
    franchise: String,
    requestedAmount: Number,
    TDS: String,
    releasedAmount: Number,
    newWalletAmount: Number,
    status: String,
  },
  {
    timestamps: true,
  }
);
const ReferalAmountSchema = new mongoose.Schema(
  {
    newMember:String,
    reportName: String,
    userID: String,
    franchise:String,
    designation:String,
    name: String,
    Amount:Number,
    percentageCredited:String,
    amountCredited: Number,
    status: String,
  },
  {
    timestamps: true,
  }
);





const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sponser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sponserName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    dateOfBirth:{
      type: Date,
    },
    franchise: {
      type: String,
      required: true,
    },
    packageType: {
      type: String,
    },
    franchiseName: {
      type: String
    },
    state: {
          type: String,
    },
    district: {
      type: String,
    },
    zonal: {
      type: String,
    },
    panchayath: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    bankDetails: {
      holderName: String,
      accountNum: String,
      ifscCode: String,
      bankName: String,
    },
    nomineeDetails: {
      name: String,
      phone: String,
      address: String,
      bankName: String,
      accountNum: String,
      ifscCode: String,
      aadhaarNum: String,
      pancardNum: String,
    },
    transactionNumber: {
      type: String,
    },
    screenshot: {
      type: String,
      default: null,
    },
    invoicePdf: {
      type: String,
      default: null,
    },
    aadhaar2: {
      type: String,
      default: null,
    },
    withdrawAmount: {
      type: Number,
    },
    withdrawStatus: {
      type: String,
    },
    nifty:{
      type: Boolean,
      default: false,
    },
    bankNifty:{
      type: Boolean,
      default: false,
    },
    crudeOil:{
      type: Boolean,
      default: false,
    },
    walletWithdrawHistory: [withdrawSchema],
    directReferalIncome: {
      type: Number,
      default: 0,
    },
    inDirectReferalIncome: {
      type: Number,
      default: 0,
    },
    totalLevelIncome:{
      type: Number,
      default: 0,
    },
    totalAutoPoolIncome:{
      type: Number,
      default: 0,
    },
    directReferalHistory: [ReferalAmountSchema],
    inDirectReferalHistory: [ReferalAmountSchema],
    levelIncomeHistory: [ReferalAmountSchema],
    autoPoolIncomeHistory: [ReferalAmountSchema],
    isDistrictFranchise: {
      type: Boolean,
      default: false,
    },
    isZonalFranchise: {
        type: Boolean,
        default: false,
      },
    isMobileFranchise: {
        type: Boolean,
        default: false,
      },
    isSignalFranchise: {
        type: Boolean,
        default: false,
      },
      isCourseFranchise: {
        type: Boolean,
        default: false,
      },
    ownSponserId: {
      type: String,
      required: true,
    },
    walletAmount: {
      type: Number,
      default: 0,
    },
    tdsAmount: {
      type: Number,
      default: 0,
    },
    walletWithdrawAmount: {
      type: Number,
      default: 0,
    },
    totalWithdrawAmount: {
      type: Number,
      default: 0,
    },
    walletWithdrawStatus: {
      type: String,
    },
    packageAmount: {
      type: Number,
      default: 0,
    },
    paidForCompany: {
      type: Number,
      default: 0,
    },
    tempPackageAmount: {
      type: Number,
      default: 0,
    },
    transactionCode: {
      type: String,
    },
    totalBonusAmount:{
      type:Number,
      default:0
    },
    bonusHistory: [creditBounusSchema],
    isAdmin:{
      type: Boolean,
        default: false,
    },
    isPromoter:{
      type: Boolean,
        default: false,
    },
    userStatus: {
      type: String,
      enum: ["pending", "readyToApprove", "approved"],
    },
    autoPoolStatus: {
      type: String,
      enum: ["noPool", "poolA", "poolB","poolC","poolD","poolE"],
      default: "noPool",
    },
    withdrawable:{
      type: Boolean,
        default: false,
    },   
    renewalStatus:{
      type: Boolean
    },
    subscriptionStatus:{
      type: String,
    },
    pendingPackage:{
      type: String,
    },
    action:{
      type: String,
    },
    renewalDate:{
      type: Date
    },

    allTransactions: [allTransactionSchema],
    districtFranchise:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
    zonalFranchise:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
    demateAccounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Demate" }],
    signals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Alert" }],
    childLevel1: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    childLevel2: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;