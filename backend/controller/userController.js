import sendMail from "../config/mailer.js";
import Admin from "../models/adminModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../middleware/errorHandler.js";
import User from "../models/userModel.js";



//generate sponser random code
export const generateRandomString = () => {
    const baseString = "OCV";
    const randomDigits = Math.floor(Math.random() * 999999);
    return baseString + randomDigits.toString();
  };

 


export const addUser = async (req, res, next) => {
    try {
      console.log("Reached here");
      const sponser = req.admin ? req.admin._id : (req.user ? req.user._id : null);
        console.log(sponser);
        let { name, email, phone,packageAmount,franchise, address,state,district,zonal,panchayath, transactionPassword, password } =
          req.body;
        console.log(state);
          const sponserData = (await User.findById(sponser)) || (await Admin.findById(sponser));
          console.log(sponserData);
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
      const hashedTxnPassword = bcryptjs.hashSync(transactionPassword, 10);
  
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
        transactionPassword: hashedTxnPassword,
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