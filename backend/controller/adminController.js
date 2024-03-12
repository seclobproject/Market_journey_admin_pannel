import jwt from "jsonwebtoken";
import { errorHandler } from "../middleware/errorHandler.js";
import Admin from "../models/adminModel.js";
import bcryptjs from "bcryptjs";
import State from "../models/stateModel.js";
import District from "../models/districtModel.js";
import Zonal from "../models/zonalModel.js";
import Panchayath from "../models/panchayathModel.js";
import User from "../models/userModel.js";
import { generateReferalIncome } from "./incomeGereratorController.js";




// admin login Api

export const adminLogin = async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const validAdmin = await Admin.findOne({ username });
      if (!validAdmin) {
        return next(errorHandler(401, "Admin not found"));
      }
        const validPassword = bcryptjs.compareSync(password, validAdmin.password);
        if (!validPassword) {
          return next(errorHandler(401, "Wrong credentials"));
        }
        const token = jwt.sign({ userId: validAdmin._id }, "MarketJourney", {
          expiresIn: "1d",
        }); 
  
        res.status(200).json({
          id: validAdmin._id,
          name: validAdmin.name,
          email:validAdmin.email,
          token_type: "Bearer",
          access_token: token,
          sts: "01",
          msg: "Admin Login Success",
        });
     
    } catch (error) {
      next(error);
    }
  };


  //forgot password

  export const forgotPassword = async (req, res, next) => {
    const { email, newPassword } = req.body;
    try {
      const validAdmin = await Admin.findOne({ username:email });
      if (validAdmin) {
        if (newPassword) {
          const hashedPassword = bcryptjs.hashSync(newPassword, 10);
          validAdmin.password = hashedPassword;
        }
        const updatedUser = await validAdmin.save();
  
        res.status(200).json({ updatedUser, sts: "01", msg: "Successfully Updated" });
      } else {
        next(errorHandler(401,"Admin not found, Please check Email first"));
      }
     
    } catch (error) {
      next(error);
    }
  };


//view admin profile


// export const viewAdminProfile=async(req,res,next)=>{
//   const adminId = req.admin._id;

//   try {
//     const admin = await Admin.findById(adminId);
//     if (admin) {
//   } catch (error) {
    
//   }
// }


//view all users by Admin---------------------------------------------------------------------------------------------------------------------

export const viewAllUsers = async (req, res, next) => {
  const adminId = req.admin._id;

  try {
    const admin = await Admin.findById(adminId);
    if (admin) {
    const userData = await User.find().select(
      "name ownSponserId phone address email userStatus packageAmount sponserName franchise"
    );
      return res.status(201).json({
        userData,
        sts: "01",
          msg: " Successfully Get all users",
      });
    } else {
      next(errorHandler("User not found"));
    }
  } catch (error) {
    next(error);
  }
};





//add State Franchise

export const addState=async(req,res,next)=>{
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
      const {stateName}=req.body;
      const stateNameLowercase = stateName.toLowerCase();

      // Use a case-insensitive query to find existing state names
      const existingState = await State.findOne({ name: { $regex: new RegExp('^' + stateNameLowercase + '$', 'i') } });

      if(existingState){
        return next(errorHandler(401, "This state already exist"));
      }
      const newState = new State({
        name:stateNameLowercase
      });
      const state = await newState.save();
      if(state){
        res.status(200).json({
          state,
          sts: "01",
          msg: "State added Successfull",
        });
      }else{
      next(errorHandler(401, "State add Not success"));
      }

    } else {
      next(errorHandler(401, "Admin not found"));
    }
  } catch (error) {
    next(error)
  }
}




//add District Franchise

export const addDistrict=async(req,res,next)=>{
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
      const {stateName,districtName}=req.body;
      const districtNameLowercase = districtName.toLowerCase();


      const existingDistrict = await District.findOne({ name: { $regex: new RegExp('^' + districtNameLowercase + '$', 'i') } });

      if(existingDistrict){
        return next(errorHandler(401, "This District already exist"));
      }
      const stateData=await State.findOne({name:stateName});
      if(stateData){
        const newDistrict = new District({
          name:districtNameLowercase,
          stateName
        });
        
        const district = await newDistrict.save();
        if(district){
          stateData.districts.push(district._id)
          await stateData.save();
          res.status(200).json({
            district,
            sts: "01",
            msg: "District added Successfull",
          });
        }else{
        next(errorHandler(401, "District add Not success"));
        }

      }
      else{
        return next(errorHandler(401, "This state Not Found"));
      }

      

    } else {
      next(errorHandler(401, "Admin not found"));
    }
  } catch (error) {
    next(error)
  }
}

//add Zonal

export const addZonal=async(req,res,next)=>{
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
      const {stateName,districtName,zonalName}=req.body;
      const zonalNameLowercase = zonalName.toLowerCase();
      const existingZonal = await Zonal.findOne({ name: { $regex: new RegExp('^' + zonalNameLowercase + '$', 'i') } });

      if(existingZonal){
        return next(errorHandler(401, "This Zonal already exist"));
      }
      const districtData=await District.findOne({name:districtName});
      if(!districtData){
        return next(errorHandler(401, "This District Not Found"));

      }
        const newZonal = new Zonal({
          name:zonalNameLowercase,
          stateName,
          districtName
        });
        
        const zonal = await newZonal.save();
        if(zonal){
          districtData.zonals.push(zonal._id)
          await districtData.save();
          res.status(200).json({
            zonal,
            sts: "01",
            msg: "Zonal added Successfull",
          });
        }else{
        next(errorHandler(401, "Zonal add Not success"));
        }
    } else {
      next(errorHandler(401, "Admin not found"));
    }
  } catch (error) {
    next(error)
  }
}

//add panchayath

export const addPanchayath=async(req,res,next)=>{
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
      const {stateName,districtName,zonalName,panchayathName}=req.body;
      const panchayathNameLowercase = panchayathName.toLowerCase();
      console.log(panchayathNameLowercase);

      const existingPanchayath = await Panchayath.findOne({ name: { $regex: new RegExp('^' + panchayathNameLowercase + '$', 'i') } });
      if(existingPanchayath){
        return next(errorHandler(401, "This Panchayath already exist"));
      }
      const districtData=await District.findOne({name:districtName});
      if(!districtData){
        return next(errorHandler(401, "This District Not Found"));
      }
      const zonalData=await Zonal.findOne({name:zonalName});
      if(!zonalData){
        return next(errorHandler(401, "This Zonal Not Found"));
      }
        const newPanchayath = new Panchayath({
          name:panchayathNameLowercase,
          stateName,
          districtName,
          zonalName
        });
        
        const panchayath = await newPanchayath.save();
        if(panchayath){
          zonalData.panchayaths.push(panchayath._id)
          await zonalData.save();
          res.status(200).json({
            panchayath,
            sts: "01",
            msg: "Panchayath added Successfull",
          });
        }else{
        next(errorHandler(401, "Panchayath add Not success"));
        }
    } else {
      next(errorHandler(401, "Admin not found"));
    }
  } catch (error) {
    next(error)
  }
}


// view params locations-----------------------------------------------------------------------------------------------




//view params Districts
export const viewParamsDistricts = async (req, res, next) => {
  try {
    const {id}=req.params;
    // const adminId = req.admin._id;
    // const admin = await Admin.findById(adminId);
    // const adminId = req.admin ? req.admin._id : (req.user ? req.user._id : null);
    // const admin = (await User.findById(adminId)) || (await Admin.findById(adminId));
    

    // if (admin) {
      const stateData = await State.findById(id).populate("districts")
      if (!stateData || stateData.length === 0) {
        return next(errorHandler(401, "No states exist"));
      }
      const districts=stateData.districts;
      res.status(200).json({
        districts: districts.map(district => ({
          id: district._id,
          name: district.name
        })),
        sts: "01",
        msg: "Districts retrieved success",
      });
    // } else {
    //   next(errorHandler(401, "Admin not found"));
    // }
  } catch (error) {
    next(error);
  }
}


// view params Not taken Districts-
export const viewNotTakenDistricts = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the state by ID and populate its districts
    const stateData = await State.findById(id).populate("districts");

    if (!stateData || stateData.length === 0) {
      return next(errorHandler(401, "No states exist"));
    }

    // Filter out the districts where taken is false
    const districts = stateData.districts.filter(district => !district.taken);

    res.status(200).json({
      districts: districts.map(district => ({
        id: district._id,
        name: district.name
      })),
      sts: "01",
      msg: "Districts retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};


//view params Zonals
export const viewParamsZonals = async (req, res, next) => {
  try {
    const {id}=req.params;
    // const adminId = req.admin._id;
    // const admin = await Admin.findById(adminId);
    // const adminId = req.admin ? req.admin._id : (req.user ? req.user._id : null);
    // const admin = (await User.findById(adminId)) || (await Admin.findById(adminId));
    

    // if (admin) {
      const districtData = await District.findById(id).populate("zonals")
      if (!districtData || districtData.length === 0) {
        return next(errorHandler(401, "No districts exist"));
      }
      const zonals=districtData.zonals;
      res.status(200).json({
        zonals: zonals.map(zonal => ({
          id: zonal._id,
          name: zonal.name
        })),
        sts: "01",
        msg: "Zonals retrieved successfully",
      });
    // } else {
    //   next(errorHandler(401, "Admin not found"));
    // }
  } catch (error) {
    next(error);
  }
}

// view params Not taken Districts-
export const viewNotTakenZonals = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the state by ID and populate its districts
    const districtData = await District.findById(id).populate("zonals");

    if (!districtData || districtData.length === 0) {
      return next(errorHandler(401, "No District exist"));
    }

    // Filter out the districts where taken is false
    const zonals = districtData.zonals.filter(zonal => !zonal.taken);

    res.status(200).json({
      zonals: zonals.map(zonal => ({
        id: zonal._id,
        name: zonal.name
      })),
      sts: "01",
      msg: "Zonals retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};




//view params Panchayaths
export const viewParamsPanchayaths = async (req, res, next) => {
  try {
    const {id}=req.params;
    // const adminId = req.admin ? req.admin._id : (req.user ? req.user._id : null);
    // const admin = (await User.findById(adminId)) || (await Admin.findById(adminId));
    
    // const adminId = req.admin._id;
    // const admin = await Admin.findById(adminId);

    // if (admin) {
      const zonalData = await Zonal.findById(id).populate("panchayaths")
      if (!zonalData || zonalData.length === 0) {
        return next(errorHandler(401, "No zonal exist"));
      }
      const panchayaths=zonalData.panchayaths;
      res.status(200).json({
        panchayaths: panchayaths.map(panchayath => ({
          id: panchayath._id,
          name: panchayath.name
        })),
        sts: "01",
        msg: "panchayaths retrieved successfully",
      });
    // } else {
    //   next(errorHandler(401, "Admin not found"));
    // }
  } catch (error) {
    next(error);
  }
}















// View all locations-------------------------------------------------------------------------------


        //view States
        export const viewStates = async (req, res, next) => {
          try {
            // const adminId = req.admin._id;
            // const admin = await Admin.findById(adminId);
            
            // if (admin) {
              const stateData = await State.find({}, '_id name'); // Projection to get both '_id' and 'name' fields
              if (!stateData || stateData.length === 0) {
                return next(errorHandler(401, "No states exist"));
              }
              res.status(200).json({
                states: stateData.map(state => ({
                  id: state._id,
                  name: state.name
                })),
                sts: "01",
                msg: "States retrieved successfully",
              });
            // } else {
            //   next(errorHandler(401, "Admin not found"));
            // }
          } catch (error) {
            next(error);
          }
        }
        
        // get all districts
        export const viewAllDistricts = async (req, res, next) => {
          try {
            const adminId = req.admin._id;
            const admin = await Admin.findById(adminId);
        
            if (admin) {
              const districtData = await District.find({}, '_id name stateName'); // Projection to get both '_id' and 'name' fields
              if (!districtData || districtData.length === 0) {
                return next(errorHandler(401, "No District exist"));
              }
              res.status(200).json({
                districts: districtData.map(district => ({
                  id: district._id,
                  name: district.name,
                  stateName: district.stateName,
                })),
                sts: "01",
                msg: "Districts retrieved successfully",
              });
            } else {
              next(errorHandler(401, "Admin not found"));
            }
          } catch (error) {
            next(error);
          }
        }
        
        // get all Zonals
        export const viewAllZonals = async (req, res, next) => {
          try {
            const adminId = req.admin._id;
            const admin = await Admin.findById(adminId);
        
            if (admin) {
              const zonalData = await Zonal.find({}, '_id name districtName stateName '); 
              if (!zonalData || zonalData.length === 0) {
                return next(errorHandler(401, "No Zonals exist"));
              }
              res.status(200).json({
                zonals: zonalData.map(zonal => ({
                  id: zonal._id,
                  name: zonal.name,
                  stateName: zonal.stateName,
                  districtName: zonal.districtName, 
        
                })),
                sts: "01",
                msg: "Zonals retrieved successfully",
              });
            } else {
              next(errorHandler(401, "Admin not found"));
            }
          } catch (error) {
            next(error);
          }
        }

                // get all Panchayaths
        export const viewAllPanchayaths = async (req, res, next) => {
          try {
            const adminId = req.admin._id;
            const admin = await Admin.findById(adminId);
        
            if (admin) {
              const panchayathData = await Panchayath.find({}, '_id name districtName stateName zonalName '); 
              if (!panchayathData || panchayathData.length === 0) {
                return next(errorHandler(401, "No Panchayaths exist"));
              }
              res.status(200).json({
                panchayaths: panchayathData.map(panchayath => ({
                  id: panchayath._id,
                  name: panchayath.name,
                  stateName: panchayath.stateName,
                  zonalName: panchayath.zonalName,
                  districtName: panchayath.districtName, 
        
                })),
                sts: "01",
                msg: "Panchayaths retrieved successfully",
              });
            } else {
              next(errorHandler(401, "Admin not found"));
            }
          } catch (error) {
            next(error);
          }
        }





//admin verify user functions-------------------------------------------------------------------------------------------------------


// view Users to Approve

export const getReadyToApproveUsers = async (req, res, next) => {
  const userId = req.admin._id;
  const adminData = await Admin.findById(userId);
  try {
    if (!adminData) {
      return next(errorHandler(401, "Admin Login Failed"));
    }
      const userData = await User.find({
        userStatus: { $eq: "readyToApprove" },
      }).select(
        "name email phone userStatus screenshot tempPackageAmount sponserName createdAt"
      );

        if(!userData){
      return next(errorHandler(401, "no user found"));

        }

      res.status(200).json({
        userData,
        sts: "01",
        msg: "get approved users Success",
      });
   
  } catch (error) {
    next(error);
  }
};


//admin can verify users

export const acceptUser = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const { id } = req.params;

    const adminData = await Admin.findById(adminId);
    if (adminData) {
      const userData = await User.findById(id);
      console.log(userData);
      if (userData) {
        const sponserId1=userData.sponser;
        const sponserUser1= (await User.findById(sponserId1)) || (await Admin.findById(sponserId1));
        let sponserUser2;
        const sponserId2 = sponserUser1.sponser || null;
        if (sponserId2)sponserUser2 = (await User.findById(sponserId2)) || (await Admin.findById(sponserId2));
        
        userData.userStatus = "approved";
        userData.packageAmount=userData.tempPackageAmount;
        const updatedUser = await userData.save();
        if (updatedUser) {
          if (sponserUser2) {
            sponserUser2.childLevel2.push(updatedUser._id);
            await sponserUser2.save();
          }
          if (sponserUser1) {
            sponserUser1.childLevel1.push(updatedUser._id);
            await sponserUser1.save();
          }
          // const referalIncome=generateReferalIncome(sponserUser1,sponserUser2,updatedUser)
          res
            .status(200)
            .json({ updatedUser, msg: "User verification Accepted!" });
        }
      } else {
        next(errorHandler("User not Found"));
      }
    } else {
      return next(errorHandler(401, "Admin Login Failed"));
    }
  } catch (error) {
    next(error);
  }
};

//reject Userverification

export const rejectUser = async (req, res, next) => {
  try {
    const adminId = req.admin._id;

    const { id } = req.params;
    const adminData = await Admin.findById(adminId);
    if (adminData) {
      const userData = await User.findById(id);
      if (userData) {
        userData.userStatus = "pending";
        userData.screenshot=null;
        const updatedUser = await userData.save();

        if (updatedUser) {
         
          res.status(200).json({ updatedUser, msg: "User verification rejected!" });
        }
      } else {
        next(errorHandler("User not Found"));
      }
    } else {
      return next(errorHandler(401, "Admin Login Failed"));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
            
// pagination for user list
            
    const paginate = async (model, query, page = 1, pageSize = 10) => {
              try {
                  const totalDocs = await model.countDocuments(query);
                  const totalPages = Math.ceil(totalDocs / pageSize);
            
                  const offset = pageSize * (page - 1);
            
                  const results = await model.find(query).skip(offset).limit(pageSize);
            
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
            
              export const viewAllPageUsers = async (req, res, next) => {
              const adminId = req.admin._id;
              const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
              const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided
            
              try {
                  const admin = await Admin.findById(adminId);
                  if (admin) {
                      const userData = await paginate(User, {}, page, pageSize);
            
                      return res.status(200).json({
                          userData,
                          sts: "01",
                          msg: "Successfully Get all users",
                      });
                  } else {
                      next(errorHandler("User not found"));
                  }
              } catch (error) {
                  next(error);
              }
            };



    // pagination for zonal list
            
    const zonalpaginate = async (model, query, page = 1, pageSize = 10) => {
      try {
          const totalDocs = await model.countDocuments(query);
          const totalPages = Math.ceil(totalDocs / pageSize);
    
          const offset = pageSize * (page - 1);
    
          const results = await model.find(query).skip(offset).limit(pageSize);
    
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
    
      export const viewAllPageZonal = async (req, res, next) => {
      const adminId = req.admin._id;
      const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
      const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided
    
      try {
          const admin = await Admin.findById(adminId);
          if (admin) {
              const zonalData = await zonalpaginate(Zonal, {}, page, pageSize);
    
              return res.status(200).json({
                zonalData,
                  sts: "01",
                  msg: "Successfully Get all users",
              });
          } else {
              next(errorHandler("User not found"));
          }
      } catch (error) {
          next(error);
      }
    };


     // pagination for panchayath list
            
     const panchayathpaginate = async (model, query, page = 1, pageSize = 10) => {
      try {
          const totalDocs = await model.countDocuments(query);
          const totalPages = Math.ceil(totalDocs / pageSize);
    
          const offset = pageSize * (page - 1);
    
          const results = await model.find(query).skip(offset).limit(pageSize);
    
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
    
      export const viewAllPagePanchayath = async (req, res, next) => {
      const adminId = req.admin._id;
      const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
      const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided
    
      try {
          const admin = await Admin.findById(adminId);
          if (admin) {
              const panchayathData = await panchayathpaginate(Panchayath, {}, page, pageSize);
    
              return res.status(200).json({
                panchayathData,
                  sts: "01",
                  msg: "Successfully Get all users",
              });
          } else {
              next(errorHandler("User not found"));
          }
      } catch (error) {
          next(error);
      }
    };



    //View Profile by params userId

export const viewUserDetails = async (req, res, next) => {
  const { id } = req.params;
  const adminId = req.admin._id;
  try {
    const adminData = await Admin.findById(adminId)
    if(!adminData){
      return next(errorHandler(401, "Admin not exist"));
    }

    const userData = await User.findById(id)

    const countFirstChild = userData.childLevel1.length;
    const countSecondChild = userData.childLevel1.length;
    const countThreeChild = userData.childLevel1.length;
   
    if (userData) {
      res.status(200).json({
        id: userData._id,
        userStatus: userData.userStatus,
        ownSponserId: userData.ownSponserId,
        franchise: userData.franchise,
        franchiseName:userData.franchiseName,
        sponserName:userData.sponserName,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        district:userData.district,
        screenshot:userData.screenshot,
        aadhaar: userData.aadhaar,
        aadhaar2: userData.aadhaar2,
        capitalAmount: userData.packageAmount,
        myDownline: countFirstChild,
        directIncome: userData.directReferalIncome,
        inDirectIncome: userData.inDirectReferalIncome,
        totalIncome: userData.walletAmount,
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


// edit user profile by admin

export const editProfileByAdmin = async (req, res, next) => {
  const adminId = req.admin._id;
  const { id } = req.params;
  const adminData = await Admin.findById(adminId);
  try {
    if (adminData) {
      const userData = await User.findById(id);
      if (userData) {
        const { name, password, address } =
          req.body;
        userData.name = name || userData.name;
        userData.address = address || userData.address;

        if (password) {
          const hashedPassword = bcryptjs.hashSync(password, 10);
          userData.password = hashedPassword;
        }

        // if (txnPassword) {
        //   const hashedPassword = bcryptjs.hashSync(txnPassword, 10);
        //   userData.transactionPassword = hashedPassword;
        // }

        const updatedUser = await userData.save();
        res
          .status(200)
          .json({ updatedUser, sts: "01", msg: "Successfully Updated" });
      } else {
        next(errorHandler("User not found, Please Login first"));
      }
    } else {
      return next(errorHandler(401, "Admin Login Failed"));
    }
  } catch (error) {
    next(error);
  }
};



//--------------------------------------------------------------------------------------------------
