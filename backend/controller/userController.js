import sendMail from "../config/mailer.js";
import Admin from "../models/adminModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../middleware/errorHandler.js";
import User from "../models/userModel.js";
import upload from "../config/multifileUpload.js";
import District from "../models/districtModel.js";
import Zonal from "../models/zonalModel.js";
import Panchayath from "../models/panchayathModel.js";



//generate sponser random code
export const generateRandomString = () => {
    const baseString = "MJ";
    const randomDigits = Math.floor(Math.random() * 999999);
    return baseString + randomDigits.toString();
  };

 
// add user by another user

// export const addUser = async (req, res, next) => {
//     try {
//       const sponser = req.admin ? req.admin._id : (req.user ? req.user._id : null);
//         let { name, email, phone,packageAmount,packageType,franchise,franchiseName, address,dateOfBirth,state,district,zonal,panchayath, password } =
//           req.body;
//           console.log(name, email, phone,packageAmount,franchise,franchiseName, address,dateOfBirth,state,district,zonal,panchayath, password);
//           const sponserData = (await User.findById(sponser)) || (await Admin.findById(sponser));
     
//       const userStatus = "pending";
//       const tempPackageAmount=packageAmount;
//       const ownSponserId = generateRandomString();
//         let isDistrictFranchise;
//         let isZonalFranchise;
//         let isMobileFranchise;
//         let isSignalFranchise;
//         let isCourseFranchise;
//         let districtFranchise;
//         let zonalFranchise;
//         let nifty;
//         let bankNifty;
//         let crudeOil;
//         const existingUser = await User.findOne({ email });
//         const existingUserByPhone = await User.findOne({ phone });
//         if (existingUser || existingUserByPhone) {
//             return next(errorHandler(401, "User Already Exist"));
//         }
            

//         if(franchise==="District Franchise") {
//           const districtData=await User.findOne({franchiseName:franchiseName})
//           if(districtData)return next(errorHandler(401, "This District franchise Already taken!!"));
//           isDistrictFranchise=true;
//           zonal=null;
//           panchayath=null;
//         }else if(franchise==="Zonal Franchise"){

//           const zonalData=await User.findOne({franchiseName:franchiseName})
//           if(zonalData)return next(errorHandler(401, "This Zonal franchise Already taken!!"));
//           isZonalFranchise=true;
//           panchayath=null;
//         }else if(franchise==="Mobile Franchise"){
//           franchiseName=null;
//           isMobileFranchise=true;
//           const districtData=await User.findOne({franchiseName:district})
//          if(!districtData)return next(errorHandler(401, "No one has taken this District franchise yet!!"));
//           districtFranchise=districtData._id;
//           const zonalData=await User.findOne({franchiseName:zonal})
//          if(!zonalData)return next(errorHandler(401, "No one has taken this Zonal franchise yet!!"));
//           zonalFranchise=zonalData._id;

//         }
//         if(packageType==="Courses"){
//           franchiseName=null;
//           isCourseFranchise=true;
//           const districtData=await User.findOne({franchiseName:district})
//          if(!districtData)return next(errorHandler(401, "No one has taken this District franchise yet!!"));
//           districtFranchise=districtData._id;
//           const zonalData=await User.findOne({franchiseName:zonal})
//          if(!zonalData)return next(errorHandler(401, "No one has taken this Zonal franchise yet!!"));
//           zonalFranchise=zonalData._id;
//         }
//         if(packageType==="Signals"){
//           franchiseName=null;
//           isSignalFranchise=true;
//           const districtData=await User.findOne({franchiseName:district})
//          if(!districtData)return next(errorHandler(401, "No one has taken this District franchise yet!!"));
//           districtFranchise=districtData._id;
//           const zonalData=await User.findOne({franchiseName:zonal})
//          if(!zonalData)return next(errorHandler(401, "No one has taken this Zonal franchise yet!!"));
//           zonalFranchise=zonalData._id;
//           if(franchise==="Nifty"){
//             nifty=true;
//           }
//           if(franchise==="Bank Nifty"){
//             bankNifty=true;
//           }
//           if(franchise==="Crude Oil"){
//             crudeOil=true;
//           }
//           if(franchise==="Nifty & Bank Nifty"){
//             nifty=true;
//             bankNifty=true;
//           }
//           if(franchise==="Bank Nifty & Crude Oil"){
//             bankNifty=true;
//             crudeOil=true;
//           }
//           if(franchise==="Nifty & Crude Oil"){
//             crudeOil=true;
//             nifty=true;
//           }
//           if(franchise==="All"){
//             crudeOil=true;
//             nifty=true;
//             bankNifty=true;
//           }
//         }
//       const hashedPassword = bcryptjs.hashSync(password, 10);
//       // const hashedTxnPassword = bcryptjs.hashSync(transactionPassword, 10);
//       const user = await User.create({
//         sponser,
//         sponserName:sponserData.name,
//         name,
//         email,
//         phone,
//         dateOfBirth,
//         address,
//         franchise,
//         franchiseName,
//         packageType,
//         state,
//         district,
//         zonal,
//         panchayath,
//         tempPackageAmount,
//         isDistrictFranchise,
//         isZonalFranchise,
//         isMobileFranchise,
//         isSignalFranchise,
//         nifty,
//         bankNifty,
//         crudeOil,
//         password: hashedPassword,
//         ownSponserId,
//         userStatus,
//         districtFranchise,
//         zonalFranchise
//       });
//       if (user) {
//         await sendMail(
//           user.email,
//           user.name,
//           user.ownSponserId,
//           password
//         );
//         if(isDistrictFranchise){
//           const districtTakeData=await District.findOne({name:franchiseName})
//           districtTakeData.taken=true;
//           districtTakeData.editable=false;
//           await districtTakeData.save();
//         }
//         if(isZonalFranchise){
//           const zonalTakeData=await Zonal.findOne({name:franchiseName})
//           zonalTakeData.taken=true;
//           zonalTakeData.editable=false;
//           await zonalTakeData.save();
//         }
//         if(isMobileFranchise){
//           const panchayathData=await Panchayath.findOne({name:panchayath})
//           panchayathData.editable=false;
//           await panchayathData.save();
//         }

//         res.status(200).json({
//           user,
//         sts: "01",
//           msg: "Add user Success",
//         });
//       } else {
//         return next(errorHandler(400, "Registration failed. Please try again!"));
//       }
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   };
export const addUser = async (req, res, next) => {
  try {
    const { name, email, phone, packageAmount, packageType, franchise, franchiseName, address, dateOfBirth, state, district, zonal, panchayath, password } = req.body;

    // Determine the sponsor
    const sponser = req.admin ? req.admin._id : (req.user ? req.user._id : null);
    const sponserData = await (req.admin ? Admin.findById(sponser) : User.findById(sponser));

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
        return next(errorHandler(401, "This District franchise is already taken!"));
      }
      isDistrictFranchise = true;
      zonal = null;
      panchayath = null;
    } else if (franchise === "Zonal Franchise") {
      const zonalData = await User.findOne({ franchiseName });
      if (zonalData) {
        return next(errorHandler(401, "This Zonal franchise is already taken!"));
      }
      isZonalFranchise = true;
      panchayath = null;
    } else if (franchise === "Mobile Franchise") {
      isMobileFranchise = true;
      const districtData = await User.findOne({ franchiseName: district });
      if (!districtData) {
        return next(errorHandler(401, "No one has taken this District franchise yet!"));
      }
      districtFranchise = districtData._id;
      const zonalData = await User.findOne({ franchiseName: zonal });
      if (!zonalData) {
        return next(errorHandler(401, "No one has taken this Zonal franchise yet!"));
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
        return next(errorHandler(401, "No one has taken this District franchise yet!"));
      }
      districtFranchise = districtData._id;
      
      const zonalData = await User.findOne({ franchiseName: zonal });
      if (!zonalData) {
        return next(errorHandler(401, "No one has taken this Zonal franchise yet!"));
      }
      zonalFranchise = zonalData._id;

      if (isSignalFranchise) {
        switch (franchise) {
          case "Nifty":
            nifty = true;
            break;
          case "Bank Nifty":
            bankNifty = true;
            break;
          case "Crude Oil":
            crudeOil = true;
            break;
          case "Nifty & Bank Nifty":
            nifty = true;
            bankNifty = true;
            break;
          case "Bank Nifty & Crude Oil":
            bankNifty = true;
            crudeOil = true;
            break;
          case "Nifty & Crude Oil":
            nifty = true;
            crudeOil = true;
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
      nifty,
      bankNifty,
      crudeOil,
      password: hashedPassword,
      ownSponserId: generateRandomString(),
      userStatus: "pending",
      districtFranchise,
      zonalFranchise
    });

    // Send confirmation email
    await sendMail(user.email, user.name, user.ownSponserId, password);

    // Update franchise status
    if (isDistrictFranchise) {
      const districtTakeData = await District.findOne({ name: franchiseName });
      districtTakeData.taken = true;
      districtTakeData.editable = false;
      await districtTakeData.save();
    }
    if (isZonalFranchise) {
      const zonalTakeData = await Zonal.findOne({ name: franchiseName });
      zonalTakeData.taken = true;
      zonalTakeData.editable = false;
      await zonalTakeData.save();
    }
    if (isMobileFranchise) {
      const panchayathData = await Panchayath.findOne({ name: panchayath });
      panchayathData.editable = false;
      await panchayathData.save();
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


//reset user password

//change password

export const changePassword = async (req, res, next) => {
  const userId = req.user._id;
  const userData = await User.findById(userId);
  try {
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
        franchiseName: userData.franchiseName,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        dateOfBirth: userData.dateOfBirth,
        aadhaar: userData.aadhaar,
        screenshot: userData.screenshot,
        packageAmount: userData.packageAmount,
        tempPackageAmount:userData.tempPackageAmount,
        myDownline: countFirstChild,
        directIncome: directIncome,
        inDirectIncome: inDirectIncome,
        walletAmount: wallet,
        totalLevelIncome:totalLevelIncome,
        bankDetails:userData.bankDetails,
        nomineeDetails:userData.nomineeDetails,
        pool:userData.autoPoolStatus,
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


//

   // edit user profile by user

   export const editProfile = async (req, res, next) => {
    const id = req.user._id;
    try {
        const userData = await User.findById(id);
        if (userData) {
          const { name,email, password, address,dateOfBirth } =
            req.body;
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
      await User.updateMany({ sponser: id }, { $set: { sponserName: userData.name } });
          if(email) {
            await sendMail(
              userData.email,
              userData.name,
              userData.ownSponserId,
          );}
      res.status(200).json({ updatedUser, sts: "01", msg: "Successfully Updated" });
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
    let { userId,name, email, phone,packageAmount,franchiseName,franchise, address,state,district,zonal,panchayath, password } =
    req.body;
    const sponser = userId;
          const sponserData = (await User.findById(sponser)) || (await Admin.findById(sponser));
        const sponserName = sponserData.name;
     
        const userStatus = "pending";
        const tempPackageAmount=packageAmount;
        const ownSponserId = generateRandomString();
          let isDistrictFranchise;
          let isZonalFranchise;
          let isMobileFranchise;
          let districtFranchise;
          let zonalFranchise;
          const existingUser = await User.findOne({ email });
          const existingUserByPhone = await User.findOne({ phone });
          if (existingUser || existingUserByPhone) {
              return next(errorHandler(401, "User Already Exist"));
          }
              
  
          if(franchise==="District Franchise") {
            isDistrictFranchise=true;
            zonal=null;
            panchayath=null;
          }else if(franchise==="Zonal Franchise"){
            isZonalFranchise=true;
            panchayath=null;
          }else if(franchise==="Mobile Franchise"){
            isMobileFranchise=true;
            const districtData=await User.findOne({franchiseName:district})
            districtFranchise=districtData._id;
            const zonalData=await User.findOne({franchiseName:zonal})
            zonalFranchise=zonalData._id;
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
          franchiseName,
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
          districtFranchise,
          zonalFranchise
        });
        if (user) {
          await sendMail(
            user.email,
            user.name,
            user.ownSponserId,
            transactionPassword,
            password
          );
          if(isDistrictFranchise){
            const districtTakeData=await District.findOne({name:franchiseName})
            districtTakeData.taken=true;
            await districtTakeData.save();
          }
          if(isZonalFranchise){
            const zonalTakeData=await Zonal.findOne({name:franchiseName})
            zonalTakeData.taken=true;
            await zonalTakeData.save();
          }

        res.status(200).json({
          user,
        sts: "01",
          msg: "Add user Success",
        });
      } else {
        return next(errorHandler(400, "Registration failed. Please try again!"));
      }
  } catch (error) {
    next(error);
  }
};

// view level 1 and leve 2 users------------------------------------------------------------------------------------------------------

// export const viewLevel1User=async(req,res,next)=>{
//   try {
//     const userId = req.query.id || req.user._id;

//     // Fetch the user document by its ID and populate its child documents
//     const user = await User.findById(userId)
//       .select("childLevel1 ownSponserId userStatus")
//       .populate([
//         {
//           path: "childLevel1",
//           select:
//             "name ownSponserId phone address email sponserName userStatus packageAmount franchise franchiseName",
//         },
//       ]);
// console.log(user);
//     // If user document is not found, return an error
//     if (!user) {
//       return next(errorHandler("User not found"));
//     }

//     // Destructure relevant fields from the user document
//     const { childLevel1, ownSponserId, userStatus } =
//       user;

//     // Send the response with child documents and other relevant information
//     res.status(200).json({
//       child1: childLevel1,
//       ownSponserId,
//       userStatus,
//       sts: "01",
//       msg: "Success",
//     });
//   } catch (error) {
//     next(error)
//   }
// }


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
          totalDocs
      };
  } catch (error) {
      throw new Error(`Pagination error: ${error.message}`);
  }
};

export const viewLevel1User = async (req, res, next) => {
  try {
      const userId = req.query.id || req.user._id;

      // Fetch the user document by its ID and populate its child documents
      const user = await User.findById(userId)
          .select("childLevel1 ownSponserId userStatus")
          .populate([
              {
                  path: "childLevel1",
                  select: "name ownSponserId phone address email sponserName userStatus packageAmount franchise franchiseName",
              },
          ]);

      // If user document is not found, return an error
      if (!user) {
          return next(errorHandler("User not found"));
      }

      // Destructure relevant fields from the user document
      const { childLevel1, ownSponserId, userStatus } = user;

      // Paginate childLevel1 array
      const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
      const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided
      const paginatedChildLevel1 = paginateArray(childLevel1, page, pageSize);

      // Send the response with paginated child documents and other relevant information
      res.status(200).json({
          child1: paginatedChildLevel1.results,
          ownSponserId,
          userStatus,
          pagination: {
              page: paginatedChildLevel1.page,
              pageSize: paginatedChildLevel1.pageSize,
              totalPages: paginatedChildLevel1.totalPages,
              totalDocs: paginatedChildLevel1.totalDocs
          },
          sts: "01",
          msg: "Success",
      });
  } catch (error) {
      next(error)
  }
};



// export const viewLevel2User=async(req,res,next)=>{
//   try {
//     const userId = req.query.id || req.user._id;

//     // Fetch the user document by its ID and populate its child documents
//     const user = await User.findById(userId)
//       .select("childLevel2 ownSponserId userStatus")
//       .populate([
//         {
//           path: "childLevel2",
//           select:
//             "name ownSponserId phone address email sponserName userStatus packageAmount franchise franchiseName",
//         },
//       ]);

//     // If user document is not found, return an error
//     if (!user) {
//       return next(errorHandler("User not found"));
//     }

//     // Destructure relevant fields from the user document
//     const { childLevel2, ownSponserId, userStatus } =
//       user;

//     // Send the response with child documents and other relevant information
//     res.status(200).json({
//       child2: childLevel2,
//       ownSponserId,
//       userStatus,
//       sts: "01",
//       msg: "Success",
//     });
//   } catch (error) {
//     next(error)
//   }
// }

export const viewLevel2User = async (req, res, next) => {
  try {
      const userId = req.query.id || req.user._id;

      // Fetch the user document by its ID and populate its child documents
      const user = await User.findById(userId)
          .select("childLevel2 ownSponserId userStatus")
          .populate([
              {
                  path: "childLevel2",
                  select: "name ownSponserId phone address email sponserName userStatus packageAmount franchise franchiseName",
              },
          ]);

      // If user document is not found, return an error
      if (!user) {
          return next(errorHandler("User not found"));
      }

      // Destructure relevant fields from the user document
      const { childLevel2, ownSponserId, userStatus } = user;

      // Paginate childLevel1 array
      const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
      const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided
      const paginatedChildLevel2 = paginateArray(childLevel2, page, pageSize);

      // Send the response with paginated child documents and other relevant information
      res.status(200).json({
          child2: paginatedChildLevel2.results,
          ownSponserId,
          userStatus,
          pagination: {
              page: paginatedChildLevel2.page,
              pageSize: paginatedChildLevel2.pageSize,
              totalPages: paginatedChildLevel2.totalPages,
              totalDocs: paginatedChildLevel2.totalDocs
          },
          sts: "01",
          msg: "Success",
      });
  } catch (error) {
      next(error)
  }
};



//request for wallet withdrawal

export const walletWithdrawRequest = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { withdrawAmount } = req.body;

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
const demateDifference=weeksDifference-dematCount;
    if(dematCount===0){
      return next(errorHandler(401, `Withdrawal is only possible after adding at least one demat account.` ));
    }
     if (weeksDifference > (dematCount)||dematCount==0) {
      return next(errorHandler(401, `Your Demate accounts is lessthan your Weeks, Please add ${demateDifference} more Accounts` ));
  };
    // Calculate TDS amount
    const tdsAmount = withdrawAmount * 0.90;



    // Check if wallet amount is sufficient
    if (user.walletAmount < withdrawAmount) {
      return next(errorHandler(401, "Insufficient funds. Amount should be less than Wallet Amount."));
    }



    // Update user's wallet withdraw status
    user.walletWithdrawStatus = "pending";
    user.walletWithdrawAmount = withdrawAmount;
    user.tdsAmount = tdsAmount;

    // Save updated user data
    const updatedUser = await user.save();

    // Respond with updated user data
    res.status(200).json({
      updatedUser,
      msg: "User wallet withdraw request sent to admin.",
    });

  } catch (error) {
    next(error);
  }
};


// Function to calculate weeks difference between two dates
const calculateWeeksDifference = (startDate, endDate) => {
  const timeDifferenceMs = endDate.getTime() - startDate.getTime();
  return Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24 * 7));
};
