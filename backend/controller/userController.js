import sendMail from "../config/mailer.js";
import Admin from "../models/adminModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../middleware/errorHandler.js";
import User from "../models/userModel.js";
import upload from "../config/multifileUpload.js";



//generate sponser random code
export const generateRandomString = () => {
    const baseString = "OCV";
    const randomDigits = Math.floor(Math.random() * 999999);
    return baseString + randomDigits.toString();
  };

 
// add user by another user

export const addUser = async (req, res, next) => {
    try {
      console.log("Reached here");
      const sponser = req.admin ? req.admin._id : (req.user ? req.user._id : null);
        let { name, email, phone,packageAmount,franchise, address,state,district,zonal,panchayath, transactionPassword, password } =
          req.body;
        console.log(state);
          const sponserData = (await User.findById(sponser)) || (await Admin.findById(sponser));
        const sponserName = sponserData.name;
     

      const userStatus = "pending";
      const tempPackageAmount=packageAmount;
      const ownSponserId = generateRandomString();
        let isDistrictFranchise;
        let isZonalFranchise;
        let isMobileFranchise;
        const existingUser = await User.findOne({ email });
        const existingUserByPhone = await User.findOne({ phone });
        if (existingUser || existingUserByPhone) {
            return next(errorHandler(401, "User Already Exist"));
        }

        if(franchise==="District Franchise") {
          isDistrictFranchise=true;
          zonal=null;
          panchayath=null;
        }
        if(franchise==="Zonal Franchise"){
            isZonalFranchise=true;
            panchayath=null;
        } 
        if(franchise==="Mobile Franchise") {
            isMobileFranchise=true;
        }
        
      const hashedPassword = bcryptjs.hashSync(password, 10);
      // const hashedTxnPassword = bcryptjs.hashSync(transactionPassword, 10);
  
      const user = await User.create({
        sponser,
        sponserName,
        name,
        email,
        phone,
        address,
        franchise,
        state,
        district,
        zonal,
        panchayath,
        tempPackageAmount,
        isDistrictFranchise,
        isZonalFranchise,
        isMobileFranchise,
        // transactionPassword: hashedTxnPassword,
        password: hashedPassword,
        ownSponserId,
        userStatus,
      });
      if (user) {
        await sendMail(
          user.email,
          user.name,
          user.ownSponserId,
          transactionPassword,
          password
        );
  
        res.status(200).json({
          user,
        sts: "01",
          msg: "Add user Success",
        });
      } else {
        return next(errorHandler(400, "Registration failed. Please try again!"));
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };


  //user login



export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(401, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials"));
    }
    const token = jwt.sign({ userId: validUser._id }, "MarketJourney", {
      expiresIn: "1d",
    });
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      id: validUser._id,
      firstName: validUser.name,
      status: validUser.userStatus,
      email: validUser.email,
      token_type: "Bearer",
      access_token: token,
      sts: "01",
      msg: "Login Success",
    });

    // res.status(200).json(
    // });
  } catch (error) {
    next(error);
  }
};




//verify users using Screenshot of Payment

export const verifyUser= async (req, res, next) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return next(errorHandler(401, "File upload error"));
      }
      
      const {transactionNumber } = req.body;
      if(!req.files.screenshot){
        return next(errorHandler(401, " Image not found"));

      }

        const screenshotImage = req.files.screenshot[0].filename;
        const userId = req.user._id;
        const user = await User.findById(userId);
        
        if (!user) {
          return next(errorHandler(401, "User not found"));
        }

      user.screenshot = screenshotImage;
      user.userStatus = "readyToApprove";
      user.transactionNumber =transactionNumber;

      const updatedUser = await user.save();
      if(updatedUser){
        return res.status(201).json({
          updatedUser,
          sts: "01",
          msg: "Verification screenshot added successfully",
        });
      }
      
    });
  } catch (error) {
    next(error);
  }
};



//View Profile

export const viewUserProfile = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const userData = await User.findById(userId)
    const directIncome = userData.directReferalIncome.toFixed(2);
    const inDirectIncome = userData.inDirectReferalIncome.toFixed(2);
    const totalLevelIncome=userData.totalLevelIncome.toFixed(2);
    const franchise = userData.franchise;
    const wallet = userData.walletAmount.toFixed(2);

    const countFirstChild = userData.childLevel1.length;
    const countSecondChild = userData.childLevel2.length;

    if (userData) {
      res.status(200).json({
        id: userData._id,
        userStatus: userData.userStatus,
        ownSponserId: userData.ownSponserId,
        franchise: franchise,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        aadhaar: userData.aadhaar,
        screenshot: userData.screenshot,
        packageAmount: userData.packageAmount,
        myDownline: countFirstChild,
        directIncome: directIncome,
        inDirectIncome: inDirectIncome,
        walletAmount: wallet,
        totalLevelIncome:totalLevelIncome,
        sts: "01",
        msg: "get user profile Success",
      });
    } else {
      next(errorHandler("User not found"));
    }
  } catch (error) {
    next(error);
  }
};
