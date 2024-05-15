import Admin from "../models/adminModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../middleware/errorHandler.js";
import User from "../models/userModel.js";
import upload from "../config/multifileUpload.js";
import District from "../models/districtModel.js";
import Zonal from "../models/zonalModel.js";
import Panchayath from "../models/panchayathModel.js";
import { sendMail, withdrawMail } from "../config/mailer.js";
import Package from "../models/packageModel.js";

//generate sponser random code
export const generateRandomString = () => {
  const baseString = "MJ";
  const randomDigits = Math.floor(Math.random() * 999999);
  return baseString + randomDigits.toString();
};

export const addUser = async (req, res, next) => {
  try {
    let {
      name,
      email,
      phone,
      packageAmount,
      packageType,
      franchise,
      franchiseName,
      address,
      dateOfBirth,
      state,
      district,
      zonal,
      panchayath,
      password,
    } = req.body;
    // console.log(`name:${name}, email:${email}, phone:${phone}, packageAmount:${packageAmount}, packageType:${packageType},
    //  franchise:${franchise}, franchiseName:${franchiseName}, address:${address}, dateOfBirth:${dateOfBirth},
    //  state:${state}, district:${district}, zonal:${zonal}, panchayath:${panchayath}, password:${password}` );

    // Determine the sponsor
    const sponser = req.admin ? req.admin._id : req.user ? req.user._id : null;
    const sponserData = await (req.admin
      ? Admin.findById(sponser)
      : User.findById(sponser));

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    const existingUserByPhone = await User.findOne({ phone });
    if (existingUser || existingUserByPhone) {
      return next(errorHandler(401, "User Already Exists"));
    }

    // Handle franchise logic
    let isDistrictFranchise = false;
    let isZonalFranchise = false;
    let isMobileFranchise = false;
    let isSignalFranchise = false;
    let isCourseFranchise = false;
    let districtFranchise = null;
    let zonalFranchise = null;
    let nifty = false;
    let bankNifty = false;
    let crudeOil = false;

    if (franchise === "District Franchise") {
      const districtData = await User.findOne({ franchiseName });
      if (districtData) {
        return next(
          errorHandler(401, "This District franchise is already taken!")
        );
      }
      nifty=true;
      isDistrictFranchise = true;
      zonal = null;
      panchayath = null;
    } else if (franchise === "Zonal Franchise") {
      const districtData = await User.findOne({ franchiseName: district });
      if (!districtData) {
        return next(
          errorHandler(401, "No one has taken this District franchise yet!")
        );
      }
      districtFranchise = districtData._id;
      const zonalData = await User.findOne({ franchiseName });
      if (zonalData) {
        return next(
          errorHandler(401, "This Zonal franchise is already taken!")
        );
      }
      nifty=true;
      isZonalFranchise = true;
      panchayath = null;
    } else if (franchise === "Mobile Franchise") {
      isMobileFranchise = true;
      nifty=true;
      const districtData = await User.findOne({ franchiseName: district });
      if (!districtData) {
        return next(
          errorHandler(401, "No one has taken this District franchise yet!")
        );
      }
      districtFranchise = districtData._id;
      const zonalData = await User.findOne({ franchiseName: zonal });
      if (!zonalData) {
        return next(
          errorHandler(401, "No one has taken this Zonal franchise yet!")
        );
      }
      zonalFranchise = zonalData._id;
    }

    // Handle package type logic
    if (packageType === "Courses" || packageType === "Signals") {
      franchiseName = null;
      isCourseFranchise = packageType === "Courses";
      isSignalFranchise = packageType === "Signals";

      const districtData = await User.findOne({ franchiseName: district });
      if (!districtData) {
        return next(
          errorHandler(401, "No one has taken this District franchise yet!")
        );
      }
      districtFranchise = districtData._id;

      const zonalData = await User.findOne({ franchiseName: zonal });
      if (!zonalData) {
        return next(
          errorHandler(401, "No one has taken this Zonal franchise yet!")
        );
      }
      zonalFranchise = zonalData._id;

      if (isSignalFranchise) {
        switch (franchise) {
          case "Nifty":
            nifty = true;
            bankNifty = false;
            crudeOil = false;
            break;
          case "Bank Nifty":
            bankNifty = true;
            nifty = false;
            crudeOil = false;
            break;
          case "CrudeOil":
            crudeOil = true;
            nifty = false;
            bankNifty = false;
            break;
          case "Nifty & Bank Nifty":
            nifty = true;
            bankNifty = true;
            crudeOil = false;
            break;
          case "Bank Nifty & CrudeOil":
            bankNifty = true;
            crudeOil = true;
            nifty = false;
            break;
          case "Nifty & CrudeOil":
            nifty = true;
            crudeOil = true;
            bankNifty = false;
            break;
          case "All":
            nifty = true;
            bankNifty = true;
            crudeOil = true;
            break;
          default:
            break;
        }
      }
    }

    // Hash password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create new user
    const user = await User.create({
      sponser,
      sponserName: sponserData.name,
      name,
      email,
      phone,
      dateOfBirth,
      address,
      franchise,
      franchiseName,
      packageType,
      state,
      district,
      zonal,
      panchayath,
      tempPackageAmount: packageAmount,
      isDistrictFranchise,
      isZonalFranchise,
      isMobileFranchise,
      isSignalFranchise,
      isCourseFranchise,
      nifty,
      bankNifty,
      crudeOil,
      password: hashedPassword,
      ownSponserId: generateRandomString(),
      userStatus: "pending",
      districtFranchise,
      zonalFranchise,
    });
    
    // Send confirmation email
    await sendMail(user.email, user.name, user.ownSponserId, password);
    
    // Update franchise status
    if (isDistrictFranchise) {
      const districtTakeData = await District.findOne({ name: franchiseName });
      districtTakeData.taken = true;
      districtTakeData.editable = false;
      await districtTakeData.save();
      user.districtFranchise = districtTakeData._id;
      await user.save();
    }
    if (isZonalFranchise) {
      const zonalTakeData = await Zonal.findOne({ name: franchiseName });
      zonalTakeData.taken = true;
      zonalTakeData.editable = false;
      await zonalTakeData.save();
      user.zonalFranchise = zonalTakeData._id;
      await user.save();
    }
    if (isMobileFranchise) {
      const panchayathData = await Panchayath.findOne({ name: panchayath });
      panchayathData.editable = false;
      await panchayathData.save();
    }
    
    if(sponserData.isAdmin===false){
      sponserData.pendingMembers.push(user._id);
      await sponserData.save();
    }
    // Respond with success message
    res.status(200).json({
      user,
      sts: "01",
      msg: "User successfully added",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//user login

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
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
      packageType: validUser.packageType,
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

//reset user password

//change password

export const changePassword = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const userData = await User.findById(userId);
    if (userData) {
      const { newPassword, confirmPassword } = req.body;
      if (newPassword) {
        const hashedPassword = bcryptjs.hashSync(newPassword, 10);
        userData.password = hashedPassword;
      }
      const updatedUser = await userData.save();

      res
        .status(200)
        .json({ updatedUser, sts: "01", msg: "Successfully Updated" });
    } else {
      next(errorHandler("User not found, Please Login first"));
    }
  } catch (error) {
    next(error);
  }
};

//verify users using Screenshot of Payment

export const verifyUser = async (req, res, next) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return next(errorHandler(401, "File upload error"));
      }

      const { transactionNumber } = req.body;
      if (!req.files.screenshot) {
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
      user.transactionNumber = transactionNumber;

      const updatedUser = await user.save();
      if (updatedUser) {
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
  try {
    const userId = req.user._id;
    const userData = await User.findById(userId);

    if (!userData) {
      return next(errorHandler("User not found"));
    }

    const dateOfRenew = new Date(userData.renewalDate);
    const today = new Date();

    // Calculate the difference in milliseconds between today and the renewal date
    const differenceInMs = today - dateOfRenew;
    // Convert milliseconds to days
    let differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

    // If the difference is greater than or equal to 30 days, set renewal status to false
    if (differenceInDays >= 30) {
      userData.renewalStatus = false;
      userData.nifty = false;
      userData.bankNifty = false;
      userData.crudeOil = false;
    }
    await userData.save();
    // Calculate the countdown from 30 to 1
    differenceInDays = 30 - differenceInDays;

    const {
      _id,
      userStatus,
      ownSponserId,
      franchise,
      franchiseName,
      name,
      email,
      phone,
      address,
      dateOfBirth,
      aadhaar,
      screenshot,
      packageAmount,
      tempPackageAmount,
      bankDetails,
      nomineeDetails,
      autoPoolStatus,
      renewalStatus,
      points,
      isDistrictFranchise,
      isZonalFranchise,
      isMobileFranchise,
      isSignalFranchise,
      isCourseFranchise,
      packageType,
      panchayath,
      district,
      actualPackageAmount,
      zonal,
      state,
      districtFranchise,
      zonalFranchise,
      isPromoter
    } = userData;

    const directIncome = userData.directReferalIncome.toFixed(2);
    const inDirectIncome = userData.inDirectReferalIncome.toFixed(2);
    const totalLevelIncome = userData.totalLevelIncome.toFixed(2);
    const walletAmount = userData.walletAmount.toFixed(2);
    const countFirstChild = userData.childLevel1.length;
    const countSecondChild = userData.childLevel2.length;

    res.status(200).json({
      id: _id,
      userStatus,
      ownSponserId,
      franchise,
      franchiseName,
      packageType,
      name,
      email,
      phone,
      state,
      district,
      panchayath,
      zonal,
      address,
      dateOfBirth,
      aadhaar,
      points,
      screenshot,
      packageAmount,
      renewalStatus,
      tempPackageAmount,
      myDownline: countFirstChild,
      directIncome,
      inDirectIncome,
      walletAmount,
      totalLevelIncome,
      bankDetails,
      nomineeDetails,
      pool: autoPoolStatus,
      actualPackageAmount,
      isDistrictFranchise,
      districtFranchise,
      zonalFranchise,
      isZonalFranchise,
      isMobileFranchise,
      isSignalFranchise,
      isCourseFranchise,
      isPromoter,
      daysUntilRenewal: differenceInDays, // Add the days until renewal
      sts: "01",
      msg: "get user profile Success",
    });
  } catch (error) {
    next(error);
  }
};

//

// edit user profile by user

export const editProfile = async (req, res, next) => {
  try {
    const id = req.user._id;
    const userData = await User.findById(id);
    if (userData) {
      const { name, email, password, address, dateOfBirth } = req.body;
      userData.name = name || userData.name;
      userData.email = email || userData.email;
      userData.address = address || userData.address;
      userData.dateOfBirth = dateOfBirth || userData.dateOfBirth;

      if (password) {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        userData.password = hashedPassword;
      }

      // if (txnPassword) {
      //   const hashedPassword = bcryptjs.hashSync(txnPassword, 10);
      //   userData.transactionPassword = hashedPassword;
      // }

      const updatedUser = await userData.save();
      // Update sponserName for users with this user as their sponser
      await User.updateMany(
        { sponser: id },
        { $set: { sponserName: userData.name } }
      );
      if (email) {
        await sendMail(userData.email, userData.name, userData.ownSponserId);
      }
      res
        .status(200)
        .json({ updatedUser, sts: "01", msg: "Successfully Updated" });
    } else {
      next(errorHandler("User not found, Please Login first"));
    }
  } catch (error) {
    next(error);
  }
};

// add user by Referal link
export const addReferalUser = async (req, res, next) => {
  try {
    let {
      userId,
      name,
      email,
      phone,
      packageAmount,
      packageType,
      franchise,
      franchiseName,
      address,
      dateOfBirth,
      state,
      district,
      zonal,
      panchayath,
      password,
    } = req.body;
    const sponser = userId;
    const sponserData = await (req.admin
      ? Admin.findById(sponser)
      : User.findById(sponser));

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    const existingUserByPhone = await User.findOne({ phone });
    if (existingUser || existingUserByPhone) {
      return next(errorHandler(401, "User Already Exists"));
    }

    // Handle franchise logic
    let isDistrictFranchise = false;
    let isZonalFranchise = false;
    let isMobileFranchise = false;
    let isSignalFranchise = false;
    let isCourseFranchise = false;
    let districtFranchise = null;
    let zonalFranchise = null;
    let nifty = false;
    let bankNifty = false;
    let crudeOil = false;

    if (franchise === "District Franchise") {
      const districtData = await User.findOne({ franchiseName });
      if (districtData) {
        return next(
          errorHandler(401, "This District franchise is already taken!")
        );
      }
      isDistrictFranchise = true;
      zonal = null;
      panchayath = null;
    } else if (franchise === "Zonal Franchise") {
      const districtData = await User.findOne({ franchiseName: district });
      if (!districtData) {
        return next(
          errorHandler(401, "No one has taken this District franchise yet!")
        );
      }
      districtFranchise = districtData._id;
      const zonalData = await User.findOne({ franchiseName });
      if (zonalData) {
        return next(
          errorHandler(401, "This Zonal franchise is already taken!")
        );
      }
      isZonalFranchise = true;
      panchayath = null;
    } else if (franchise === "Mobile Franchise") {
      isMobileFranchise = true;
      const districtData = await User.findOne({ franchiseName: district });
      if (!districtData) {
        return next(
          errorHandler(401, "No one has taken this District franchise yet!")
        );
      }
      districtFranchise = districtData._id;
      const zonalData = await User.findOne({ franchiseName: zonal });
      if (!zonalData) {
        return next(
          errorHandler(401, "No one has taken this Zonal franchise yet!")
        );
      }
      zonalFranchise = zonalData._id;
    }

    // Handle package type logic
    if (packageType === "Courses" || packageType === "Signals") {
      franchiseName = null;
      isCourseFranchise = packageType === "Courses";
      isSignalFranchise = packageType === "Signals";

      const districtData = await User.findOne({ franchiseName: district });
      if (!districtData) {
        return next(
          errorHandler(401, "No one has taken this District franchise yet!")
        );
      }
      districtFranchise = districtData._id;

      const zonalData = await User.findOne({ franchiseName: zonal });
      if (!zonalData) {
        return next(
          errorHandler(401, "No one has taken this Zonal franchise yet!")
        );
      }
      zonalFranchise = zonalData._id;

      if (isSignalFranchise) {
        switch (franchise) {
          case "Nifty":
            nifty = true;
            bankNifty = false;
            crudeOil = false;
            break;
          case "Bank Nifty":
            bankNifty = true;
            nifty = false;
            crudeOil = false;
            break;
          case "CrudeOil":
            crudeOil = true;
            nifty = false;
            bankNifty = false;
            break;
          case "Nifty & Bank Nifty":
            nifty = true;
            bankNifty = true;
            crudeOil = false;
            break;
          case "Bank Nifty & CrudeOil":
            bankNifty = true;
            crudeOil = true;
            nifty = false;
            break;
          case "Nifty & CrudeOil":
            nifty = true;
            crudeOil = true;
            bankNifty = false;
            break;
          case "All":
            nifty = true;
            bankNifty = true;
            crudeOil = true;
            break;
          default:
            break;
        }
      }
    }

    // Hash password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create new user
    const user = await User.create({
      sponser,
      sponserName: sponserData.name,
      name,
      email,
      phone,
      dateOfBirth,
      address,
      franchise,
      franchiseName,
      packageType,
      state,
      district,
      zonal,
      panchayath,
      tempPackageAmount: packageAmount,
      isDistrictFranchise,
      isZonalFranchise,
      isMobileFranchise,
      isSignalFranchise,
      isCourseFranchise,
      nifty,
      bankNifty,
      crudeOil,
      password: hashedPassword,
      ownSponserId: generateRandomString(),
      userStatus: "pending",
      districtFranchise,
      zonalFranchise,
    });
    
    // Send confirmation email
    await sendMail(user.email, user.name, user.ownSponserId, password);
    
    // Update franchise status
    if (isDistrictFranchise) {
      const districtTakeData = await District.findOne({ name: franchiseName });
      districtTakeData.taken = true;
      districtTakeData.editable = false;
      await districtTakeData.save();
      user.districtFranchise = districtTakeData._id;
      await user.save();
    }
    if (isZonalFranchise) {
      const zonalTakeData = await Zonal.findOne({ name: franchiseName });
      zonalTakeData.taken = true;
      zonalTakeData.editable = false;
      await zonalTakeData.save();
      user.zonalFranchise = zonalTakeData._id;
      await user.save();
    }
    if (isMobileFranchise) {
      const panchayathData = await Panchayath.findOne({ name: panchayath });
      panchayathData.editable = false;
      await panchayathData.save();
    }
    
    if(sponserData.isAdmin===false){
      sponserData.pendingMembers.push(user._id);
      await sponserData.save();
    }
    // Respond with success message
    res.status(200).json({
      user,
      sts: "01",
      msg: "User successfully added",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const paginateArray = (array, page = 1, pageSize = 10) => {
  try {
    const totalDocs = array.length;
    const totalPages = Math.ceil(totalDocs / pageSize);

    const offset = pageSize * (page - 1);
    const results = array.slice(offset, offset + pageSize);

    return {
      results,
      page,
      pageSize,
      totalPages,
      totalDocs,
    };
  } catch (error) {
    throw new Error(`Pagination error: ${error.message}`);
  }
};

export const viewLevel1User = async (req, res, next) => {
  try {
    const userId = req.query.id || req.user._id;
    const searchText = req.query.searchText;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const { packageName } = req.body;


    // Fetch the user document by its ID and populate its child documents
    const user = await User.findById(userId)
      .select("childLevel1 pendingMembers ownSponserId userStatus")
      .populate([
        {
          path: "childLevel1",
          select:
            "name ownSponserId phone address email sponserName userStatus actualPackageAmount franchise franchiseName packageType",
        },
        {
          path: "pendingMembers",
          select:
            "name ownSponserId phone address email sponserName userStatus tempPackageAmount franchise franchiseName packageType",
        },
      ]);

    // If user document is not found, return an error
    if (!user) {
      return next(errorHandler("User not found"));
    }

    // Destructure relevant fields from the user document
    const { childLevel1, pendingMembers, ownSponserId, userStatus } = user;

    let combinedArray = [];
    
    // If there are pending members, include them in the combined array
    if (pendingMembers.length > 0) {
      combinedArray = [...pendingMembers];
    }

    // If there are level1 users, include them in the combined array
    if (childLevel1.length > 0) {
      combinedArray = [...combinedArray, ...childLevel1];
    }

    // Filter combined array based on search text
    let filteredCombinedArray = combinedArray;
    if (searchText) {
      const searchRegex = new RegExp(searchText, "i");
      filteredCombinedArray = combinedArray.filter(doc =>
        searchRegex.test(doc.name) || searchRegex.test(doc.sponserName) || searchRegex.test(doc.email) || searchRegex.test(doc.franchise)
      );
    }

   // Filter combined array based on package name
   if (packageName) {
    filteredCombinedArray = filteredCombinedArray.filter(doc => doc.franchise === packageName);
  }
    // Paginate the combined array
    const paginatedCombinedArray = paginateArray(filteredCombinedArray, page, pageSize);

    // Send the response with paginated users and other relevant information
    res.status(200).json({
      child1: paginatedCombinedArray.results,
      ownSponserId,
      userStatus,
      pagination: {
        page: paginatedCombinedArray.page,
        pageSize: paginatedCombinedArray.pageSize,
        totalPages: paginatedCombinedArray.totalPages,
        totalDocs: paginatedCombinedArray.totalDocs,
      },
      sts: "01",
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};


export const viewLevel2User = async (req, res, next) => {
  try {
    const userId = req.query.id || req.user._id;
    const searchText = req.query.searchText;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    // Fetch the user document by its ID and populate its child documents
    const user = await User.findById(userId)
      .select("childLevel2 ownSponserId userStatus")
      .populate([
        {
          path: "childLevel2",
          select:
            "name ownSponserId phone address email sponserName userStatus packageAmount franchise franchiseName packageType",
        },
      ]);

    // If user document is not found, return an error
    if (!user) {
      return next(errorHandler("User not found"));
    }

    // Destructure relevant fields from the user document
    const { childLevel2, ownSponserId, userStatus } = user;

    // Filter childLevel2 array based on search text
    let filteredChildLevel2 = childLevel2;
    if (searchText) {
      const searchRegex = new RegExp(searchText, "i");
      filteredChildLevel2 = childLevel2.filter(doc =>
        searchRegex.test(doc.name) || searchRegex.test(doc.sponserName) || searchRegex.test(doc.email) || searchRegex.test(doc.franchise)
      );
    }

    // Paginate filtered childLevel2 array
    const paginatedChildLevel2 = paginateArray(filteredChildLevel2, page, pageSize);

    // Send the response with paginated child documents and other relevant information
    res.status(200).json({
      child2: paginatedChildLevel2.results,
      ownSponserId,
      userStatus,
      pagination: {
        page: paginatedChildLevel2.page,
        pageSize: paginatedChildLevel2.pageSize,
        totalPages: paginatedChildLevel2.totalPages,
        totalDocs: paginatedChildLevel2.totalDocs,
      },
      sts: "01",
      msg: "Success",
    });
  } catch (error) {
    next(error);
  }
};



//request for wallet withdrawal



export const walletWithdrawRequest = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { withdrawAmount } = req.body;
    const admin = await Admin.findOne();
    const recipient = admin.email;
    // Fetch user data
    const user = await User.findById(userId);

    if (!user) {
      return next(errorHandler(401, "User not found. Please login first."));
    }
    // Calculate weeks since user creation
    const createdAt = user.createdAt;
    const todayDate = new Date();
    const weeksDifference = calculateWeeksDifference(createdAt, todayDate);

    // Update user data for approval
    const dematCount = user.demateAccounts.length;
    const demateDifference = weeksDifference - dematCount;
    if (dematCount === 0) {
      return next(
        errorHandler(
          401,
          `Withdrawal is only possible after adding at least one demat account.`
        )
      );
    }
    if (weeksDifference > dematCount || dematCount == 0) {
      return next(
        errorHandler(
          401,
          `Your Demate accounts is lessthan your Weeks, Please add ${demateDifference} more Accounts`
        )
      );
    }
    // Calculate TDS amount
    const tdsAmount = withdrawAmount * 0.9;

    // Check if wallet amount is sufficient
    if (user.walletAmount < withdrawAmount) {
      return next(
        errorHandler(
          401,
          "Insufficient funds. Amount should be less than Wallet Amount."
        )
      );
    }

    // Update user's wallet withdraw status
    user.walletWithdrawStatus = "pending";
    user.walletWithdrawAmount = withdrawAmount;
    user.tdsAmount = tdsAmount;

    // Save updated user data
    const updatedUser = await user.save();

    // Respond with updated user data
    if (updatedUser) {
      await withdrawMail(
        admin.email,
        admin.name,
        user.name,
        user.walletWithdrawAmount,
        user.tdsAmount,
        user.walletAmount
      );

      res.status(200).json({
        updatedUser,
        msg: "User wallet withdraw request sent to admin.",
      });
    }
  } catch (error) {
    next(error);
  }
};

// Function to calculate weeks difference between two dates
const calculateWeeksDifference = (startDate, endDate) => {
  const timeDifferenceMs = endDate.getTime() - startDate.getTime();
  return Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24 * 7));
};

// view add on packages

export const viewAddOn = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const userData = await User.findById(userId);

    if (!userData) {
      return next(errorHandler(401, "User not found. Please login first."));
    }
    if (userData.renewalStatus) {
      const { nifty, bankNifty, crudeOil } = userData;

      const addOns = [];

      if (!nifty) {
        const niftyPackage = await Package.findOne({ packageName: "Nifty" });
        if (niftyPackage) {
          addOns.push(niftyPackage);
        }
      }

      if (!bankNifty) {
        const bankNiftyPackage = await Package.findOne({
          packageName: "Bank Nifty",
        });
        if (bankNiftyPackage) {
          addOns.push(bankNiftyPackage);
        }
      }

      if (!crudeOil) {
        const crudeOilPackage = await Package.findOne({
          packageName: "CrudeOil",
        });
        if (crudeOilPackage) {
          addOns.push(crudeOilPackage);
        }
      }

      if (!nifty && !bankNifty) {
        const niftyAndBankPackage = await Package.findOne({ packageName: "Nifty & Bank Nifty" });
        if (niftyAndBankPackage) {
          addOns.push(niftyAndBankPackage);
        }
      }
      if (!nifty && !crudeOil) {
        const niftyAndCrudePackage = await Package.findOne({ packageName: "Nifty & CrudeOil" });
        if (niftyAndCrudePackage) {
          addOns.push(niftyAndCrudePackage);
        }
      }
      if (!bankNifty && !crudeOil) {
        const bankAndCrudePackage = await Package.findOne({ packageName: "Bank Nifty & CrudeOil" });
        if (bankAndCrudePackage) {
          addOns.push(bankAndCrudePackage);
        }
      }

      if (!bankNifty && !crudeOil && !nifty) {
        const allPackage = await Package.findOne({ packageName: "All" });
        if (allPackage) {
          addOns.push(allPackage);
        }
      }

      res.status(200).json({
        addOns,
        msg: "get addons successfully",
      });
    } else {
      res.status(200).json({
        msg: "your package is expired",
      });
    }
  } catch (error) {
    next(error);
  }
};

//view convert packages

export const viewConvertPackages = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const userData = await User.findById(userId);

    if (userData.packageType === "Franchise") {
      return res.status(200).json({
        msg: "Can't convert this franchise",
      });
    }

    const currentPackage = userData.franchise;

    const anotherPackages = await Package.find({
      packageName: {
        $nin: [currentPackage, "District Franchise", "Zonal Franchise"],
      },
    });

    res.status(200).json({
      anotherPackages,
      msg: "Got addons successfully",
    });
  } catch (error) {
    next(error);
  }
};

//view Renewal packages

export const viewRenewalPackages = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const userData = await User.findById(userId);
    if (!userData) {
      return next(errorHandler(401, "User not found. Please login first."));
    }
    if (userData.packageType === "Franchise") {
     const renewPackages = await Package.find({
        franchiseName: "Signals",
        packageName: { $nin: ["Morning Cafe","Night Cafe", "Algo"] },
      });
      return res.status(200).json({
        renewPackages,
        msg: "get renewal signals",
      });
    }
    let renewPackages = [];
    const renewPackage = await Package.findOne({
      packageName: userData.franchise,
    });
    renewPackages.push(renewPackage);
    res.status(200).json({
      renewPackages,
      msg: "Got addons successfully",
    });
  } catch (error) {
    next(error);
  }
};

//request for renewal

export const renewalRequest = async (req, res, next) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return next(errorHandler(401, "File upload error"));
      }
      const { action, reqPackage, amount } = req.body;
console.log(reqPackage);
      if (!req.files.screenshot) {
        return next(errorHandler(401, "Image not found"));
      }
      const screenshotImage = req.files.screenshot[0].filename;
      const userId = req.user._id;

      // Use findOne instead of find to get a single document
      const userData = await User.findOne({ _id: userId });

      if (!userData) {
        return next(errorHandler(401, "User not found. Please login first."));
      }

      userData.screenshot = screenshotImage;
      userData.subscriptionStatus = "pending";
      userData.action = action;
      userData.pendingPackage = reqPackage;
      userData.tempPackageAmount = amount;

      const updatedUser = await userData.save();

      if (updatedUser) {
        res.status(200).json({
          sts: "01",
          msg: "Request posted for renewal",
        });
      }
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
