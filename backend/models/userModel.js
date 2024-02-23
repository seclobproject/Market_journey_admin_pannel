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

const levelROISchema = new mongoose.Schema(
  {
    reportName: String,
    userID: String,
    name: String,
    dayROI: Number,
    capitalAmount: Number,
    LevelAmountCredited: Number,
    percentage: Number,
  },
  {
    timestamps: true,
  }
);

const dailyROISchema = new mongoose.Schema(
  {
    reportName: String,
    name: String,
    capitalAmount: Number,
    percentage: Number,
    creditedAmount: Number,
  },
  {
    timestamps: true,
  }
);

const addFundSchema = new mongoose.Schema(
  {
    name: String,
    topUpAmount: Number,
    transactionCode: String,
    addFundUrl: String,
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
    packageName: String,
    tnxID: String,
    withdrawAmount: Number,
    transactionCode: String,
    walletUrl: String,
    status: String,
  },
  {
    timestamps: true,
  }
);
const ReferalAmountSchema = new mongoose.Schema(
  {
    reportName: String,
    userID: String,
    name: String,
    amountCredited: Number,
    transactionCode: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    sponser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sponserName: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      unique: true,
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
    password: {
      type: String,
      required: true,
    },
    transactionPassword: {
      type: String,
      required: true,
    },
    aadhaar: {
      type: String,
      default: null,
    },
    aadhaar2: {
      type: String,
      default: null,
    },
    wallet: {
      type: Number,
    },
    withdrawAmount: {
      type: Number,
    },
    withdrawStatus: {
      type: String,
    },
    transactionID: {
      type: String,
    },

    walletWithdrawHistory: [withdrawSchema],
    referalIncome: {
      type: Number,
      default: 0,
    },
    referalHistory: [ReferalAmountSchema],
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
    ownSponserId: {
      type: String,
      required: true,
    },
    walletAmount: {
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
    packageName: {
      type: String,
    },
    addFundHistory: [addFundSchema],
    transactionCode: {
      type: String,
    },
    walletWithdrawUrl: {
      type: String,
    },
    addPackageStatus: {
      type: String,
    },
    userStatus: {
      type: String,
      enum: ["pending", "readyToApprove", "approved"],
    },
    allTransactions: [allTransactionSchema],
    childLevel1: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    childLevel2: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;