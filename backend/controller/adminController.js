import jwt from "jsonwebtoken";
import { errorHandler } from "../middleware/errorHandler.js";
import Admin from "../models/adminModel.js";
import bcryptjs from "bcryptjs";
import State from "../models/stateModel.js";
import District from "../models/districtModel.js";
import Zonal from "../models/zonalModel.js";
import Panchayath from "../models/panchayathModel.js";
import User from "../models/userModel.js";
import {
  addToAutoPoolWallet,
  franchiseIncomeGenerator,
  generatePromotersIncome,
  generateReferalIncome,
  levelIncomeGenerator,
  setAutoPool,
} from "./incomeGereratorController.js";
import Demate from "../models/demateModel.js";
import { sendMail } from "../config/mailer.js";
import Package from "../models/packageModel.js";

// admin login Api

export const adminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
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
      email: validAdmin.email,
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
  try {
    const { email, newPassword } = req.body;
    const validAdmin = await Admin.findOne({ username: email });
    if (validAdmin) {
      if (newPassword) {
        const hashedPassword = bcryptjs.hashSync(newPassword, 10);
        validAdmin.password = hashedPassword;
      }
      const updatedUser = await validAdmin.save();

      res
        .status(200)
        .json({ updatedUser, sts: "01", msg: "Successfully Updated" });
    } else {
      next(errorHandler(401, "Admin not found, Please check Email first"));
    }
  } catch (error) {
    next(error);
  }
};

//view admin profile

export const viewAdminProfile = async (req, res, next) => {
  try {
    const adminId = req.admin._id;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return next(errorHandler(401, "Admin Login Failed"));
    }

    const countInPoolA = admin.poolA.length;
    const countInPoolB = admin.poolB.length;
    const countInPoolC = admin.poolC.length;
    const countInPoolD = admin.poolD.length;
    const countInPoolE = admin.poolE.length;
    return res.status(201).json({
      admin,
      countInPoolA,
      countInPoolB,
      countInPoolC,
      countInPoolD,
      countInPoolE,
      sts: "01",
      msg: " Successfully Get Admin Profile",
    });
  } catch (error) {
    next(error);
  }
};

//view all users by Admin---------------------------------------------------------------------------------------------------------------------

export const viewAllUsers = async (req, res, next) => {
  try {
    const adminId = req.admin._id;

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

// ADD, EDIT , DELETE State----------------------------------------------------------------------------------------------------------

//add State Franchise

export const addState = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
      const { stateName } = req.body;
      const stateNameLowercase = stateName.toLowerCase();

      // Use a case-insensitive query to find existing state names
      const existingState = await State.findOne({
        name: { $regex: new RegExp("^" + stateNameLowercase + "$", "i") },
      });

      if (existingState) {
        return next(errorHandler(401, "This state already exist"));
      }
      const newState = new State({
        name: stateNameLowercase,
      });
      const state = await newState.save();
      if (state) {
        res.status(200).json({
          state,
          sts: "01",
          msg: "State added Successfull",
        });
      } else {
        next(errorHandler(401, "State add Not success"));
      }
    } else {
      next(errorHandler(401, "Admin not found"));
    }
  } catch (error) {
    next(error);
  }
};

export const editState = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);
    const { id } = req.params;
    const { stateName } = req.body;

    if (!admin) {
      return next(errorHandler(401, "Admin not found"));
    }
    let stateData = await State.findById(id);
    if (!stateData) {
      return next(errorHandler(404, "state data not found"));
    }
    if (stateData.editable === false) {
      return next(errorHandler(404, "Already use this State, so can't edit "));
    }

    stateData.name = stateName || stateData.name;
    const updatedState = await stateData.save();

    if (updatedState) {
      return res.status(200).json({
        id: updatedState._id,
        stateName: updatedState.name,
        isEditable: updatedState.editable,
        sts: "01",
        msg: "State data updated successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

//delete State

export const deleteState = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);
    const { id } = req.params;

    if (!admin) {
      return next(errorHandler(401, "Admin not found"));
    }
    let stateData = await State.findById(id);
    if (!stateData) {
      return next(errorHandler(404, "state data not found"));
    }
    if (stateData.editable === false) {
      return next(
        errorHandler(404, "Already use this State, so can't Delete ")
      );
    }

    const deletedState = await State.findByIdAndDelete(id);

    if (deletedState) {
      return res.status(200).json({
        deletedState,
        sts: "01",
        msg: "State  deleted successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

// ADD, EDIT , DELETE Districts------------------------------------------------------------------------------------------------------------

//add District Franchise

export const addDistrict = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
      const { stateName, districtName } = req.body;
      const districtNameLowercase = districtName.toLowerCase();

      const existingDistrict = await District.findOne({
        name: { $regex: new RegExp("^" + districtNameLowercase + "$", "i") },
      });

      if (existingDistrict) {
        return next(errorHandler(401, "This District already exist"));
      }
      const stateData = await State.findOne({
        name: { $regex: new RegExp("^" + stateName + "$", "i") },
      });
      if (stateData) {
        const newDistrict = new District({
          name: districtNameLowercase,
          stateName,
        });

        const district = await newDistrict.save();
        if (district) {
          if(!stateData.districts.includes(district._id)){
            stateData.districts.push(district._id);
            stateData.editable = false;
            await stateData.save();
            res.status(200).json({
              district,
              sts: "01",
              msg: "District added Successfull",
            });

          }else{
          next(errorHandler(401, "This District already exist in this State"));
          }
        } else {
          next(errorHandler(401, "District add Not success"));
        }
      } else {
        return next(errorHandler(401, "This state Not Found"));
      }
    } else {
      next(errorHandler(401, "Admin not found"));
    }
  } catch (error) {
    next(error);
  }
};

//edit District

export const editDistrict = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);
    const { id } = req.params;
    const { districtName } = req.body;

    if (!admin) {
      return next(errorHandler(401, "Admin not found"));
    }
    let districtData = await District.findById(id);
    if (!districtData) {
      return next(errorHandler(404, "district data not found"));
    }

    if (districtData.editable === false) {
      return next(
        errorHandler(404, "Already use this District, so can't edit ")
      );
    }

    districtData.name = districtName || districtData.name;
    const updatedDistrict = await districtData.save();

    if (updatedDistrict) {
      return res.status(200).json({
        id: updatedDistrict._id,
        districtName: updatedDistrict.name,
        stateName: updatedDistrict.stateName,
        isEditable: updatedDistrict.editable,
        sts: "01",
        msg: "District  updated successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

//delete District

export const deleteDistrict = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);
    const { id } = req.params;

    if (!admin) {
      return next(errorHandler(401, "Admin not found"));
    }

    let districtData = await District.findById(id);
    if (!districtData) {
      return next(errorHandler(404, "District data not found"));
    }

    if (!districtData.editable) {
      return next(
        errorHandler(
          404,
          "This district is already in use and cannot be deleted"
        )
      );
    }

    const stateName = districtData.stateName;
    const stateData = await State.findOne({ name: stateName });

    if (!stateData) {
      return next(errorHandler(404, "State data not found"));
    }

    // Delete the district from the District model
    const deletedDistrict = await District.findByIdAndDelete(id);

    // Remove the deleted district from the districts array in the State model
    if (deletedDistrict) {
      const upState = await State.findByIdAndUpdate(
        stateData._id,
        { $pull: { districts: deletedDistrict._id } },
        { new: true }
      );

      // If there are no more districts in the state, set editable to true
      if (upState.districts.length === 0) {
        upState.editable = true;
        await upState.save();
      }
      return res.status(200).json({
        deletedDistrict,
        sts: "01",
        msg: "District deleted successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

// ADD, EDIT , DELETE Zonals------------------------------------------------------------------------------------------------------------
//add Zonal

export const addZonal = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
      const { stateName, districtName, zonalName } = req.body;
      const zonalNameLowercase = zonalName.toLowerCase();
      const existingZonal = await Zonal.findOne({
        name: { $regex: new RegExp("^" + zonalNameLowercase + "$", "i") },
      });

      if (existingZonal) {
        return next(errorHandler(401, "This Zonal already exist"));
      }
      const districtData = await District.findOne({
        name: { $regex: new RegExp("^" + districtName + "$", "i") },
      });
      if (!districtData) {
        return next(errorHandler(401, "This District Not Found"));
      }
      const newZonal = new Zonal({
        name: zonalNameLowercase,
        stateName,
        districtName,
      });

      const zonal = await newZonal.save();
      if (zonal) {
        if(!districtData.zonals.includes(zonal._id)){
          districtData.zonals.push(zonal._id);
          districtData.editable = false;
          await districtData.save();
          res.status(200).json({
            zonal,
            sts: "01",
            msg: "Zonal added Successfull",
          });

        }else{
        next(errorHandler(401, "This District already exist in this State"));
        }
      } else {
        next(errorHandler(401, "Zonal add Not success"));
      }
    } else {
      next(errorHandler(401, "Admin not found"));
    }
  } catch (error) {
    next(error);
  }
};

//edit Zonal

export const editZonal = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);
    const { id } = req.params;
    const { zonalName } = req.body;

    if (!admin) {
      return next(errorHandler(401, "Admin not found"));
    }
    let zonalData = await Zonal.findById(id);
    if (!zonalData) {
      return next(errorHandler(404, "zoanl data not found"));
    }
    if (zonalData.editable === false) {
      return next(errorHandler(404, "Already use this Zonal, so can't edit "));
    }

    zonalData.name = zonalName || zonalData.name;
    const updatedzonal = await zonalData.save();

    if (updatedzonal) {
      return res.status(200).json({
        id: updatedzonal._id,
        zonalName: updatedzonal.name,
        stateName: updatedzonal.stateName,
        districtName: updatedzonal.districtName,
        isEditable: updatedzonal.editable,
        sts: "01",
        msg: "Zonal  updated successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

//delete zonal

export const deleteZonal = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);
    const { id } = req.params;

    if (!admin) {
      return next(errorHandler(401, "Admin not found"));
    }
    let zonalData = await Zonal.findById(id);
    if (!zonalData) {
      return next(errorHandler(404, "zonal data not found"));
    }
    if (zonalData.editable === false) {
      return next(
        errorHandler(404, "Already use this Zonal, so can't delete ")
      );
    }
    const districtName = zonalData.districtName;
    const districtData = await District.findOne({ name: districtName });

    const deletedZonal = await Zonal.findByIdAndDelete(id);

    if (deletedZonal) {
      const upDistrict = await District.findByIdAndUpdate(
        districtData._id,
        { $pull: { zonals: deletedZonal._id } },
        { new: true }
      );

      if (upDistrict.zonals.length == 0) {
        upDistrict.editable = true;
        await upDistrict.save();
      }
      return res.status(200).json({
        deletedZonal,
        sts: "01",
        msg: "Zonal  deleted successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

// ADD, EDIT , DELETE Panchayath------------------------------------------------------------------------------------------------------------

//add panchayath

export const addPanchayath = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
      const { stateName, districtName, zonalName, panchayathName } = req.body;
      const panchayathNameLowercase = panchayathName.toLowerCase();

      const existingPanchayath = await Panchayath.findOne({
        name: { $regex: new RegExp("^" + panchayathNameLowercase + "$", "i") },
      });
      if (existingPanchayath) {
        return next(errorHandler(401, "This Panchayath already exist"));
      }
      const districtData = await District.findOne({ name: districtName });
      if (!districtData) {
        return next(errorHandler(401, "This District Not Found"));
      }
      const zonalData = await Zonal.findOne({ name: zonalName });
      if (!zonalData) {
        return next(errorHandler(401, "This Zonal Not Found"));
      }
      const newPanchayath = new Panchayath({
        name: panchayathNameLowercase,
        stateName,
        districtName,
        zonalName,
      });

      const panchayath = await newPanchayath.save();
      if (panchayath) {
        
        zonalData.panchayaths.push(panchayath._id);
        zonalData.editable = false;
        await zonalData.save();
        res.status(200).json({
          panchayath,
          sts: "01",
          msg: "Panchayath added Successfull",
        });
      } else {
        next(errorHandler(401, "Panchayath add Not success"));
      }
    } else {
      next(errorHandler(401, "Admin not found"));
    }
  } catch (error) {
    next(error);
  }
};

//edit Panchayath

export const editPanchayath = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);
    const { id } = req.params;
    const { panchayathName } = req.body;

    if (!admin) {
      return next(errorHandler(401, "Admin not found"));
    }
    let panchayathData = await Panchayath.findById(id);
    if (!panchayathData) {
      return next(errorHandler(404, "panchayath data not found"));
    }
    if (panchayathData.editable === false) {
      return next(
        errorHandler(404, "Already use this Panchayath, so can't edit ")
      );
    }

    panchayathData.name = panchayathName || panchayathData.name;
    const updatedPanchayath = await panchayathData.save();

    if (updatedPanchayath) {
      return res.status(200).json({
        id: updatedPanchayath._id,
        panchayathName: updatedPanchayath.name,
        stateName: updatedPanchayath.stateName,
        zonalName: updatedPanchayath.zonalName,
        districtName: updatedPanchayath.districtName,
        isEditable: updatedPanchayath.editable,
        sts: "01",
        msg: "Panchayath data updated successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

//delete panchayath

export const deletePanchayath = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);
    const { id } = req.params;

    if (!admin) {
      return next(errorHandler(401, "Admin not found"));
    }
    let panchayathData = await Panchayath.findById(id);
    if (!panchayathData) {
      return next(errorHandler(404, "panchayath data not found"));
    }
    if (panchayathData.editable === false) {
      return next(
        errorHandler(404, "Already use this Panchayath, so can't delete ")
      );
    }
    const zonalName = panchayathData.zonalName;
    const zonalData = await Zonal.findOne({ name: zonalName });
    const deletedPanchayath = await Panchayath.findByIdAndDelete(id);

    if (deletedPanchayath) {
      const upZonal = await Zonal.findByIdAndUpdate(
        zonalData._id,
        { $pull: { panchayaths: deletedPanchayath._id } },
        { new: true }
      );
      if (upZonal.panchayaths.length == 0) {
        upZonal.editable = true;
        await upZonal.save();
      }
      return res.status(200).json({
        deletedPanchayath,
        sts: "01",
        msg: "Panchayath deleted successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

// view params locations-----------------------------------------------------------------------------------------------

//view params Districts
export const viewParamsDistricts = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const adminId = req.admin._id;
    // const admin = await Admin.findById(adminId);
    // const adminId = req.admin ? req.admin._id : (req.user ? req.user._id : null);
    // const admin = (await User.findById(adminId)) || (await Admin.findById(adminId));

    // if (admin) {
    const stateData = await State.findById(id).populate("districts");
    if (!stateData || stateData.length === 0) {
      return next(errorHandler(401, "No states exist"));
    }
    const districts = stateData.districts;
    res.status(200).json({
      districts: districts.map((district) => ({
        id: district._id,
        name: district.name,
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
};

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
    const districts = stateData.districts.filter((district) => !district.taken);

    res.status(200).json({
      districts: districts.map((district) => ({
        id: district._id,
        name: district.name,
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
    const { id } = req.params;
    // const adminId = req.admin._id;
    // const admin = await Admin.findById(adminId);
    // const adminId = req.admin ? req.admin._id : (req.user ? req.user._id : null);
    // const admin = (await User.findById(adminId)) || (await Admin.findById(adminId));

    // if (admin) {
    const districtData = await District.findById(id).populate("zonals");
    if (!districtData || districtData.length === 0) {
      return next(errorHandler(401, "No districts exist"));
    }
    const zonals = districtData.zonals;
    res.status(200).json({
      zonals: zonals.map((zonal) => ({
        id: zonal._id,
        name: zonal.name,
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
};

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
    const zonals = districtData.zonals.filter((zonal) => !zonal.taken);

    res.status(200).json({
      zonals: zonals.map((zonal) => ({
        id: zonal._id,
        name: zonal.name,
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
    const { id } = req.params;
    // const adminId = req.admin ? req.admin._id : (req.user ? req.user._id : null);
    // const admin = (await User.findById(adminId)) || (await Admin.findById(adminId));

    // const adminId = req.admin._id;
    // const admin = await Admin.findById(adminId);

    // if (admin) {
    const zonalData = await Zonal.findById(id).populate("panchayaths");
    if (!zonalData || zonalData.length === 0) {
      return next(errorHandler(401, "No zonal exist"));
    }
    const panchayaths = zonalData.panchayaths;
    res.status(200).json({
      panchayaths: panchayaths.map((panchayath) => ({
        id: panchayath._id,
        name: panchayath.name,
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
};

// View all locations-------------------------------------------------------------------------------

//view States
export const viewStates = async (req, res, next) => {
  try {
    // const adminId = req.admin._id;
    // const admin = await Admin.findById(adminId);

    // if (admin) {
    const stateData = await State.find({}, "_id name editable"); // Projection to get both '_id' and 'name' fields
    // if (!stateData || stateData.length === 0) {
    //   return next(errorHandler(401, "No states exist"));
    // }
    res.status(200).json({
      states: stateData.map((state) => ({
        id: state._id,
        stateName: state.name,
        isEditable: state.editable,
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
};

// get all districts
export const viewAllDistricts = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
      const districtData = await District.find(
        {},
        "_id name stateName editable"
      ); // Projection to get both '_id' and 'name' fields
      // if (!districtData || districtData.length === 0) {
      //   return next(errorHandler(401, "No District exist"));
      // }
      res.status(200).json({
        districts: districtData.map((district) => ({
          id: district._id,
          districtName: district.name,
          stateName: district.stateName,
          isEditable: district.editable,
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
};

// get all Zonals
export const viewAllZonals = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
      const zonalData = await Zonal.find(
        {},
        "_id name districtName stateName editable "
      );
      if (!zonalData || zonalData.length === 0) {
        return next(errorHandler(401, "No Zonals exist"));
      }
      res.status(200).json({
        zonals: zonalData.map((zonal) => ({
          id: zonal._id,
          zonalName: zonal.name,
          stateName: zonal.stateName,
          districtName: zonal.districtName,
          isEditable: zonal.editable,
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
};

// get all Panchayaths
export const viewAllPanchayaths = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
      const panchayathData = await Panchayath.find(
        {},
        "_id name districtName stateName zonalName editable "
      );
      if (!panchayathData || panchayathData.length === 0) {
        return next(errorHandler(401, "No Panchayaths exist"));
      }
      res.status(200).json({
        panchayaths: panchayathData.map((panchayath) => ({
          id: panchayath._id,
          panchayathName: panchayath.name,
          stateName: panchayath.stateName,
          zonalName: panchayath.zonalName,
          districtName: panchayath.districtName,
          isEditable: panchayath.editable,
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
};

//admin verify user functions-------------------------------------------------------------------------------------------------------

// view Users to Approve

export const getReadyToApproveUsers = async (req, res, next) => {
  try {
    const userId = req.admin._id;
    const adminData = await Admin.findById(userId);
    if (!adminData) {
      return next(errorHandler(401, "Admin Login Failed"));
    }
    const userData = await User.find({
      userStatus: { $eq: "readyToApprove" },
    }).select(
      "name email phone userStatus screenshot tempPackageAmount sponserName createdAt updatedAt"
    );

    if (!userData) {
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
      if (userData) {
        const sponserId1 = userData.sponser;
        const sponserUser1 =
          (await User.findById(sponserId1)) ||
          (await Admin.findById(sponserId1));
        let sponserUser2;
        let updatedSponser1;
        let updatedSponser2;
        const sponserId2 = sponserUser1.sponser || null;
        if (sponserId2)
          sponserUser2 =
            (await User.findById(sponserId2)) ||
            (await Admin.findById(sponserId2));

        userData.userStatus = "approved";
        userData.renewalStatus = true;
        userData.renewalDate = new Date();
        userData.packageAmount = userData.tempPackageAmount;
        userData.actualPackageAmount = userData.tempPackageAmount;
        userData.paidForCompany = userData.tempPackageAmount;
        const updatedUser = await userData.save();
        if (updatedUser) {
          if (sponserUser2) {
            sponserUser2.childLevel2.push(updatedUser._id);
            updatedSponser2 = await sponserUser2.save();
          }
          if (sponserUser1) {
            if(sponserUser1.isAdmin===false){
              sponserUser1.pendingMembers.pull(updatedUser._id);
            }
            sponserUser1.childLevel1.push(updatedUser._id);
            updatedSponser1 = await sponserUser1.save();
          }
          if (updatedUser.state) {
            const statData = await State.findOne({ name: updatedUser.state });
            if (statData) {
              statData.users.push(updatedUser._id);
              await statData.save();
            }
          }
          if (updatedUser.district) {
            const distData = await District.findOne({
              name: updatedUser.district,
            });
            if (distData) {
              distData.users.push(updatedUser._id);
              await distData.save();
            }
          }
          if (updatedUser.zonal) {
            const zoneData = await Zonal.findOne({ name: updatedUser.zonal });
            if (zoneData) {
              zoneData.users.push(updatedUser._id);
              await zoneData.save();
            }
          }
          if (updatedUser.panchayath) {
            const panchData = await Panchayath.findOne({
              name: updatedUser.panchayath,
            });
            if (panchData) {
              panchData.users.push(updatedUser._id);
              await panchData.save();
            }
          }
          if (sponserUser1.isAdmin === false) {
            const referalIncome = await generateReferalIncome(
              updatedSponser1,
              updatedSponser2._id,
              updatedUser
            );
          }

          if (
            !updatedSponser1.isDistrictFranchise &&
            !updatedSponser1.isZonalFranchise
          )
            await setAutoPool(updatedSponser1, updatedUser);
          if (updatedUser.packageAmount >= 5000) {
            await addToAutoPoolWallet(updatedUser);
          }
          await generatePromotersIncome(
            updatedUser.packageAmount,
            updatedUser,
            0.025
          );

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
    console.log(error);
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
        userData.screenshot = null;
        const updatedUser = await userData.save();

        if (updatedUser) {
          res
            .status(200)
            .json({ updatedUser, msg: "User verification rejected!" });
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

    const results = await model
      .find(query)
      .select("createdAt ownSponserId name sponserName packageAmount franchise renewalStatus userStatus email")
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(pageSize);

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

export const viewAllPageUsers = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided
    const searchText = req.query.searchText; // Text to search for in name, sponserName, and phone fields

    const admin = await Admin.findById(adminId);
    if (admin) {
      let query = {};
      if (searchText) {
        // If search text is provided, create a regex to match any part of the string
        const searchRegex = new RegExp(searchText, "i");
        query = {
          $or: [
            { name: { $regex: searchRegex } },
            { sponserName: { $regex: searchRegex } },
            { email: { $regex: searchRegex } },
            { franchise: { $regex: searchRegex } }
          ],
        };
      }

      const userData = await paginate(User, query, page, pageSize);

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


//   const paginate = async (model, query, page = 1, pageSize = 10, searchQuery = {}) => {
//     try {
//         const totalDocs = await model.countDocuments({ ...query, ...searchQuery });
//         const totalPages = Math.ceil(totalDocs / pageSize);
//         const offset = pageSize * (page - 1);
//         const results = await model.find({ ...query, ...searchQuery }).sort({ createdAt: -1 }).skip(offset).limit(pageSize);
//         return {
//             results,
//             page,
//             pageSize,
//             totalPages,
//             totalDocs
//         };
//     } catch (error) {
//         throw new Error(`Pagination error: ${error.message}`);
//     }
// };

// export const viewAllPageUsers = async (req, res, next) => {
//     const adminId = req.admin._id;
//     const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
//     const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided
//     const searchQuery = {}; // Initialize empty search query

//     // Check if search query parameter exists
//     if (req.query.search) {
//         // Define the fields on which you want to search
//         const searchFields = ["name", "sponserName", "ownSponserId", "packageAmount", "franchiseName", "franchise"];
//         // Construct regex search criteria for each field
//         const regexSearchCriteria = searchFields.map(field => ({ [field]: { $regex: req.query.search, $options: "i" } }));
//         // Combine all search criteria with OR operator
//         searchQuery.$or = regexSearchCriteria;
//     }

//     try {
//         const admin = await Admin.findById(adminId);
//         if (admin) {
//             const userData = await paginate(User, {}, page, pageSize, searchQuery);
//             return res.status(200).json({
//                 userData,
//                 sts: "01",
//                 msg: "Successfully Get all users",
//             });
//         } else {
//             next(errorHandler("User not found"));
//         }
//     } catch (error) {
//         next(error);
//     }
// };

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
      totalDocs,
    };
  } catch (error) {
    throw new Error(`Pagination error: ${error.message}`);
  }
};

export const viewAllPageZonal = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided

    const admin = await Admin.findById(adminId);
    if (admin) {
      const zonalData = await zonalpaginate(Zonal, {}, page, pageSize);

      return res.status(200).json({
        zonals: zonalData.results.map((zonal) => ({
          id: zonal._id,
          zonalName: zonal.name,
          stateName: zonal.stateName,
          districtName: zonal.districtName,
          isEditable: zonal.editable,
        })),
        page: zonalData.page,
        pageSize: zonalData.pageSize,
        totalPages: zonalData.totalPages,
        totalDocs: zonalData.totalDocs,
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
      totalDocs,
    };
  } catch (error) {
    throw new Error(`Pagination error: ${error.message}`);
  }
};

export const viewAllPagePanchayath = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided

    const admin = await Admin.findById(adminId);
    if (admin) {
      const panchayathData = await panchayathpaginate(
        Panchayath,
        {},
        page,
        pageSize
      );

      return res.status(200).json({
        panchayaths: panchayathData.results.map((panchayath) => ({
          id: panchayath._id,
          panchayathName: panchayath.name,
          stateName: panchayath.stateName,
          zonalName: panchayath.zonalName,
          districtName: panchayath.districtName,
          isEditable: panchayath.editable,
        })),
        page: panchayathData.page,
        pageSize: panchayathData.pageSize,
        totalPages: panchayathData.totalPages,
        totalDocs: panchayathData.totalDocs,
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
  try {
    const { id } = req.params;
    const adminId = req.admin._id;
    const adminData = await Admin.findById(adminId);
    if (!adminData) {
      return next(errorHandler(401, "Admin not exist"));
    }

    const userData = await User.findById(id);

    const countFirstChild = userData.childLevel1.length;
    const countSecondChild = userData.childLevel1.length;
    const countThreeChild = userData.childLevel1.length;

    if (userData) {
      res.status(200).json({
        id: userData._id,
        userStatus: userData.userStatus,
        ownSponserId: userData.ownSponserId,
        franchise: userData.franchise,
        packageType: userData.packageType,
        franchiseName: userData.franchiseName,
        sponserName: userData.sponserName,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        dateOfBirth: userData.dateOfBirth,
        district: userData.district,
        zonal: userData.zonal,
        state: userData.state,
        isPromoter:userData.isPromoter,
        panchayath: userData.panchayath,
        screenshot: userData.screenshot,
        aadhaar2: userData.aadhaar2,
        renewalStatus: userData.renewalStatus,
        packageAmount: userData.packageAmount,
        actualPackageAmount:userData.actualPackageAmount,
        myDownline: countFirstChild,
        directIncome: userData.directReferalIncome.toFixed(2),
        inDirectIncome: userData.inDirectReferalIncome.toFixed(2),
        walletAmount: userData.walletAmount.toFixed(2),
        points: userData.points.toFixed(2),
        bankDetails: userData.bankDetails,
        nomineeDetails: userData.nomineeDetails,
        totalLevelIncome: userData.totalLevelIncome.toFixed(2),

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
  try {
    const adminId = req.admin._id;
    const { id } = req.params;
    const adminData = await Admin.findById(adminId);
    if (adminData) {
      const userData = await User.findById(id);
      if (userData) {
        const { name, email, password, address, dateOfBirth } = req.body;
        userData.name = name || userData.name;
        userData.address = address || userData.address;
        userData.email = email || userData.email;
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
    } else {
      return next(errorHandler(401, "Admin Login Failed"));
    }
  } catch (error) {
    next(error);
  }
};

//---------------------------------------------------approve and reject Wallet withdraw----------------------------------------------

//view all withdrawal requests

const pendingWithdrawPaginate = async (
  model,
  query,
  page = 1,
  pageSize = 10
) => {
  try {
    const totalDocs = await model.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / pageSize);

    const offset = pageSize * (page - 1);

    const results = await model
      .find(query)
      .select(
        "name email phone walletWithdrawStatus createdAt walletWithdrawAmount tdsAmount updatedAt"
      )
      .skip(offset)
      .limit(pageSize);

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

// Paginated version of viewWithdrawPending
export const viewWithdrawPendingPaginated = async (req, res, next) => {
  try {
    const userId = req.admin._id;
    let page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided

    const adminData = await Admin.findById(userId);
    if (adminData) {
      const withdrawPendingQuery = {
        walletWithdrawStatus: "pending",
      };
      const paginatedWithdrawPending = await pendingWithdrawPaginate(
        User,
        withdrawPendingQuery,
        page,
        pageSize
      );

      res.status(200).json({
        userData: paginatedWithdrawPending.results,
        pagination: {
          page: paginatedWithdrawPending.page,
          pageSize: paginatedWithdrawPending.pageSize,
          totalPages: paginatedWithdrawPending.totalPages,
          totalDocs: paginatedWithdrawPending.totalDocs,
        },
        sts: "01",
        msg: "Get withdraw pending users Success",
      });
    } else {
      return next(errorHandler(401, "Admin Login Failed"));
    }
  } catch (error) {
    next(error);
  }
};

// //admin can approve wallet withdrawal

// export const approveWalletWithdrawal = async (req, res, next) => {
//   try {
//     const adminId = req.admin._id;
//     const { id } = req.params;

//     // Fetch admin data
//     const admin = await Admin.findById(adminId);
//     if (!admin) {
//       return next(errorHandler(401, "Admin login failed."));
//     }

//     // Fetch user data
//     const user = await User.findById(id);
//     if (!user) {
//       return next(errorHandler(404, "User not found."));
//     }

//     // Calculate new wallet amount
//     const tdsAmount=user.tdsAmount;
//     const withdrawAmount = user.walletWithdrawAmount;
//     const newWalletAmount = user.walletAmount - user.walletWithdrawAmount;

//     // Update user data
//     user.walletWithdrawStatus = "approved";
//     user.walletAmount = newWalletAmount;
//     user.totalWithdrawAmount += user.walletWithdrawAmount;
//     user.walletWithdrawAmount = 0;
//     user.tdsAmount = 0;
//     user.walletWithdrawHistory.push({
//       reportName: "walletWithdrawReport",
//       name: user.name,
//       ownID: user.ownSponserId,
//       franchise: user.franchise,
//       requestedAmount: withdrawAmount,
//       TDS: "10%",
//       releasedAmount: tdsAmount,
//       newWalletAmount: newWalletAmount,
//       status: "Approved",
//     });

//     // Save updated user data
//     const updatedUser = await user.save();

//     // Respond with updated user data
//     res.status(200).json({
//       updatedUser,
//       msg: "User wallet withdraw request accepted!",
//     });

//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

// //admin can reject wallet withdrawal

// export const rejectWalletWithdrawal = async (req, res, next) => {
//   try {
//     const adminId = req.admin._id;
//     const { id } = req.params;

//     // Fetch admin data
//     const admin = await Admin.findById(adminId);
//     if (!admin) {
//       return next(errorHandler(401, "Admin login failed."));
//     }

//     // Fetch user data
//     const user = await User.findById(id);
//     if (!user) {
//       return next(errorHandler(404, "User not found."));
//     }

//     // Calculate new wallet amount
//     const withdrawAmount = userData.walletWithdrawAmount;

//     // Update user data
//     user.walletWithdrawStatus = "";
//     user.walletWithdrawAmount = 0;
//     user.tdsAmount = 0;
//     user.walletWithdrawHistory.push({
//       reportName: "walletWithdrawReject",
//       name: user.name,
//       ownID: user.ownSponserId,
//       franchise: user.franchise,
//       requestedAmount: withdrawAmount,
//       status: "Rejected",
//     });

//     // Save updated user data
//     const updatedUser = await user.save();

//     // Respond with updated user data
//     res.status(200).json({
//       updatedUser,
//       msg: "User wallet withdraw request Rejected!",
//     });

//   } catch (error) {
//     next(error);
//   }
// };

export const processWalletWithdrawal = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const { id } = req.params;
    const { action } = req.body; // action can be "approve" or "reject"

    // Fetch admin data
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return next(errorHandler(401, "Admin login failed."));
    }

    // Fetch user data
    const user = await User.findById(id);
    if (!user) {
      return next(errorHandler(404, "User not found."));
    }

    // Check if the action is valid
    if (action !== "approve" && action !== "reject") {
      return next(
        errorHandler(
          400,
          "Invalid action. Please provide 'approve' or 'reject'."
        )
      );
    }

    if (action === "approve") {
      // Calculate new wallet amount for approval
      const tdsAmount = user.tdsAmount;
      const withdrawAmount = user.walletWithdrawAmount;
      const newWalletAmount = user.walletAmount - user.walletWithdrawAmount;

      // Update user data for approval
      user.walletWithdrawStatus = "approved";
      user.walletAmount = newWalletAmount;
      user.totalWithdrawAmount += user.walletWithdrawAmount;
      user.walletWithdrawAmount = 0;
      user.tdsAmount = 0;
      user.walletWithdrawHistory.push({
        reportName: "walletWithdrawReport",
        name: user.name,
        ownID: user.ownSponserId,
        franchise: user.franchise,
        requestedAmount: withdrawAmount,
        TDS: "10%",
        releasedAmount: tdsAmount,
        newWalletAmount: newWalletAmount,
        status: "Approved",
      });
    } else if (action === "reject") {
      // Calculate new wallet amount for rejection
      const withdrawAmount = user.walletWithdrawAmount;

      // Update user data for rejection
      user.walletWithdrawStatus = "";
      user.walletWithdrawAmount = 0;
      user.tdsAmount = 0;
      user.walletWithdrawHistory.push({
        reportName: "walletWithdrawReject",
        name: user.name,
        ownID: user.ownSponserId,
        franchise: user.franchise,
        requestedAmount: withdrawAmount,
        status: "Rejected",
      });
    }

    // Save updated user data
    const updatedUser = await user.save();

    // Respond with updated user data
    let msg =
      action === "approve"
        ? "User wallet withdraw request accepted!"
        : "User wallet withdraw request rejected!";
    res.status(200).json({
      updatedUser,
      msg,
    });
  } catch (error) {
    next(error);
  }
};

//add bonus fuctions-----------------------------------------------------------------------------------------------------

export const addBonus = async (req, res, next) => {
  try {
    const adminId = req.admin.id;
    const { id } = req.params;

    const { bonusAmount, description } = req.body;
    // Fetch admin data
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return next(errorHandler(401, "Admin login failed."));
    }

    // Fetch user data
    const user = await User.findById(id);
    if (!user) {
      return next(errorHandler(404, "User not found."));
    }

    user.totalBonusAmount += bonusAmount;
    user.walletAmount += bonusAmount;
    user.bonusHistory.push({
      reportName: "userBonusHistory",
      bonusAmount: bonusAmount,
      description: description,
      status: "Approved",
    });
    let updatedUser = await user.save();
    if (updatedUser) {
      admin.totalPaidBonusAmount += bonusAmount;
      admin.addBounusHistory.push({
        reportName: "Admin bonus History",
        userID: updatedUser.ownSponserId,
        name: updatedUser.name,
        bonusAmount: bonusAmount,
        description: description,
        phone: updatedUser.phone,
        status: "Approved",
      });
    }
    const updatedAdmin = await admin.save();
    if (updatedUser.packageType === "Franchise") {
      if(updatedUser.franchise==="Mobile Franchise"){
        await franchiseIncomeGenerator(
          updatedUser,
          bonusAmount,
          "bonus",
          0.12,
          0.2
        );
        updatedUser = await User.findById(id);
        await levelIncomeGenerator(updatedUser, bonusAmount);
      }
      updatedUser = await User.findById(id);
      await generatePromotersIncome(bonusAmount, updatedUser, 0.07);
    }
    res.status(200).json({ sts: "01", msg: "Successfully Bonus Added" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//admin approve and reject demate account

export const processDematAccount = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const { id } = req.params;
    const { action } = req.body; // action can be "approve" or "reject"

    // Fetch admin data
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return next(errorHandler(401, "Admin login failed."));
    }

    // Fetch Demat data
    const dematData = await Demate.findById(id).populate("sponser");
    if (!dematData) {
      return next(errorHandler(404, "Demat data not found."));
    }

    const user = dematData.sponser;

    // Check if the action is valid
    if (action !== "approve" && action !== "reject") {
      return next(
        errorHandler(
          400,
          "Invalid action. Please provide 'approve' or 'reject'."
        )
      );
    }

    if (action === "approve") {
      await User.findOneAndUpdate(
        { _id: user._id },
        { $push: { demateAccounts: dematData._id } }
      );
      if (dematData.state) {
        const statData = await State.findOne({ name: dematData.state });
        if (statData) {
          statData.demates.push(dematData._id);
          await statData.save();
        }
      }
      if (dematData.district) {
        const distData = await District.findOne({ name: dematData.district });
        if (distData) {
          distData.demates.push(dematData._id);
          await distData.save();
        }
      }
      if (dematData.zonal) {
        const zoneData = await Zonal.findOne({ name: dematData.zonal });
        if (zoneData) {
          zoneData.demates.push(dematData._id);
          await zoneData.save();
        }
      }
      if (dematData.panchayath) {
        const panchData = await Panchayath.findOne({
          name: dematData.panchayath,
        });
        if (panchData) {
          panchData.demates.push(dematData._id);
          await panchData.save();
        }
      }
      dematData.status = "approved";
    } else if (action === "reject") {
      // Update DematData status to empty string for rejection
      dematData.status = "";
    }

    // Save updated DematData
    const updatedDemateData = await dematData.save();

    // Respond with appropriate message
    const msg =
      action === "approve"
        ? " Demat Account Approved!"
        : "Demat Account rejected!";
    res.status(200).json({
      updatedDemateData,
      msg,
    });
  } catch (error) {
    next(error);
  }
};

//accept renewal request

export const acceptRenewalRequest = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const { id } = req.params;

    const adminData = await Admin.findById(adminId);
    if (adminData) {
      const userData = await User.findById(id);
      if (userData) {
        const {
          action,
          pendingPackage,
          subscriptionStatus,
          renewalDate,
          renewalStatus,
          tempPackageAmount,
        } = userData;

        userData.subscriptionHistory.push({
          reportName: "subscriptionHistory",
          name:userData.name,
          pendingPackage: pendingPackage,
          action: action,
          amount: tempPackageAmount,
          status: "Approved",
        });



        if (action === "addOn") {
          switch (pendingPackage) {
            case "Nifty":
              userData.nifty = true;
              break;
            case "Bank Nifty":
              userData.bankNifty = true;
              break;
            case "CrudeOil":
              userData.crudeOil = true;
              break;
            case "Nifty & Bank Nifty":
              userData.nifty = true;
              userData.bankNifty = true;
              break;
            case "Nifty & CrudeOil":
              userData.nifty = true;
              userData.crudeOil = true;
              break;
            case "Bank Nifty & CrudeOil":
              userData.crudeOil = true;
              userData.bankNifty = true;
              break;
            case "All":
              userData.crudeOil = true;
              userData.bankNifty = true;
              userData.nifty = true;
              break;
            default:
              break;
          }
          userData.subscriptionStatus = "";
          userData.pendingPackage = "";
          userData.action = "";
          userData.packageAmount = tempPackageAmount;
          userData.paidForCompany += tempPackageAmount;
        }
        if (action === "convert") {
          const packageData = await Package.findOne({
            packageName: pendingPackage,
          });
          userData.franchise = packageData.packageName;
          userData.packageType = packageData.franchiseName;
          userData.packageAmount = tempPackageAmount;
          userData.actualPackageAmount = tempPackageAmount;
          userData.paidForCompany += tempPackageAmount;
          if (packageData.franchiseName == "Franchise") {
            userData.isMobileFranchise = true;
            userData.isSignalFranchise = false;
            userData.isCourseFranchise = false;
            userData.nifty=false;
            userData.bankNifty=false;
            userData.crudeOil=false;
          }
          if (packageData.franchiseName == "Signals") {
            userData.isMobileFranchise = false;
            userData.isSignalFranchise = true;
            userData.isCourseFranchise = false;
            switch (packageData.packageName) {
              case "Nifty":
                userData.nifty = true;
                userData.bankNifty = false;
                userData.crudeOil = false;
                break;
              case "Bank Nifty":
                userData.bankNifty = true;
                userData.nifty = false;
                userData.crudeOil = false;
                break;
              case "CrudeOil":
                userData.crudeOil = true;
                userData.nifty = false;
                userData.bankNifty = false;
                break;
              case "Nifty & Bank Nifty":
                userData.nifty = true;
                userData.bankNifty = true;
                userData.crudeOil = false;
                break;
              case "Bank Nifty & CrudeOil":
                userData.bankNifty = true;
                userData.crudeOil = true;
                userData.nifty = false;
                break;
              case "Nifty & CrudeOil":
                userData.nifty = true;
                userData.crudeOil = true;
                userData.bankNifty = false;
                break;
              case "All":
                userData.nifty = true;
                userData.bankNifty = true;
                userData.crudeOil = true;
                break;
              default:
              console.log(packageData.name);

                userData.nifty = false;
                userData.bankNifty = false;
                userData.crudeOil = false;
                break;
            }
          }
          if (packageData.franchiseName == "Courses") {
            userData.isMobileFranchise = false;
            userData.isSignalFranchise = false;
            userData.isCourseFranchise = true;
            userData.nifty=false;
            userData.bankNifty=false;
            userData.crudeOil=false;
          }
          userData.renewalStatus = true;
          userData.renewalDate = new Date();
          userData.subscriptionStatus = "";
          userData.pendingPackage = "";
          userData.action = "";
        }

        if (action === "renewal") {
          const packageData = await Package.findOne({
            packageName: pendingPackage,
          });
          if (
            userData.packageType === "Franchise" ||
            userData.packageType === "Signals"
          ) {
            switch (packageData.packageName) {
              case "Nifty":
                userData.nifty = true;
                userData.bankNifty = false;
                userData.crudeOil = false;
                break;
              case "Bank Nifty":
                userData.bankNifty = true;
                userData.nifty = false;
                userData.crudeOil = false;
                break;
              case "CrudeOil":
                userData.crudeOil = true;
                userData.nifty = false;
                userData.bankNifty = false;
                break;
              case "Nifty & Bank Nifty":
                userData.nifty = true;
                userData.bankNifty = true;
                userData.crudeOil = false;
                break;
              case "Bank Nifty & CrudeOil":
                userData.bankNifty = true;
                userData.crudeOil = true;
                userData.nifty = false;
                break;
              case "Nifty & CrudeOil":
                userData.nifty = true;
                userData.crudeOil = true;
                userData.bankNifty = false;
                break;
              case "All":
                userData.nifty = true;
                userData.bankNifty = true;
                userData.crudeOil = true;
                break;
              default:
                break;
            }
          }
          userData.packageAmount = tempPackageAmount;
          userData.paidForCompany += tempPackageAmount;
          userData.renewalStatus = true;
          userData.renewalDate = new Date();
          userData.subscriptionStatus = "";
          userData.pendingPackage = "";
          userData.action = "";
        }

        const sponserId1 = userData.sponser;
        const sponserUser1 =
          (await User.findById(sponserId1)) ||
          (await Admin.findById(sponserId1));
        let sponserUser2;
        const sponserId2 = sponserUser1.sponser || null;
        if (sponserId2)
          sponserUser2 =
            (await User.findById(sponserId2)) ||
            (await Admin.findById(sponserId2));

        const updatedUser = await userData.save();
        if (updatedUser) {
          if (sponserUser1.isAdmin === false) {
            const referalIncome = await generateReferalIncome(
              sponserUser1,
              sponserUser2._id,
              updatedUser
            );
          }

          if (
            !sponserUser1.isDistrictFranchise &&
            !sponserUser1.isZonalFranchise
          )
            await setAutoPool(sponserUser1, updatedUser);
          if (updatedUser.packageAmount >= 5000) {
            await addToAutoPoolWallet(updatedUser);
          }
          await generatePromotersIncome(
            updatedUser.packageAmount,
            updatedUser,
            0.025
          );

          res
            .status(200)
            .json({ updatedUser, msg: "User Renewal request Accepted!" });
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

export const rejectRenewalRequest = async (req, res, next) => {
  try {
    const adminId = req.admin._id;

    const { id } = req.params;
    const adminData = await Admin.findById(adminId);
    if (adminData) {
      const userData = await User.findById(id);
      if (userData) {
        userData.subscriptionHistory.push({
          reportName: "subscriptionHistory",
          name:userData.name,
          pendingPackage: userData.pendingPackage,
          action: userData.action,
          amount: userData.tempPackageAmount,
          status: "Rejected",
        });
        userData.subscriptionStatus = "";
        userData.pendingPackage = "";
        userData.action = "";
        userData.tempPackageAmount = "";

        const updatedUser = await userData.save();

        if (updatedUser) {
          res
            .status(200)
            .json({ updatedUser, msg: "User renewal request rejected!" });
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

//Dashbaord Datas

export const dashboardDatas = async (req, res, next) => {
  try {
    const adminId = req.admin._id;

    const adminData = await Admin.findById(adminId);
    if (!adminData) {
      return next(errorHandler(401, "Admin Login Failed"));
    }
    const latestPoolShare=adminData.shareFromPool;
    const totalPoolShare=adminData.totalShareFromPool;
    const totalPackages = await Package.countDocuments();

    // Count total users
    const totalUsersCount = await User.countDocuments();

    // Count pending users
    const pendingUsersCount = await User.countDocuments({
      userStatus: "pending",
    });

    // Count approved users
    const approvedUsersCount = await User.countDocuments({
      userStatus: "approved",
    });

    const readyToApproveCount =
      totalUsersCount - (pendingUsersCount + approvedUsersCount);

    // Calculate total wallet amount of all users
    const totalWalletAmount = await User.aggregate([
      {
        $group: {
          _id: null,
          totalWalletAmount: { $sum: "$walletAmount" },
        },
      },
    ]);

    // Calculate total withdrawal amount
    const totalWithdrawAmount = await User.aggregate([
      {
        $group: {
          _id: null,
          totalWithdrawAmount: { $sum: "$totalWithdrawAmount" },
        },
      },
    ]);

    // Calculate total paid amount for company
    const totalPaidForCompany = await User.aggregate([
      {
        $group: {
          _id: null,
          totalPaidForCompany: { $sum: "$paidForCompany" },
        },
      },
    ]);
    const totalProfit=(totalPaidForCompany.length > 0
      ? totalPaidForCompany[0].totalPaidForCompany
      : 0)-(totalWalletAmount.length > 0
        ? totalWalletAmount[0].totalWalletAmount
        : 0);

    // Respond with dashboard data
    res.status(200).json({
      totalPackages,
      totalUsersCount,
      pendingUsersCount,
      approvedUsersCount,
      readyToApproveCount,
      latestPoolShare,
      totalPoolShare,
      totalProfit,
      totalWalletAmount:
        totalWalletAmount.length > 0
          ? totalWalletAmount[0].totalWalletAmount
          : 0,
      totalWithdrawAmount:
        totalWithdrawAmount.length > 0
          ? totalWithdrawAmount[0].totalWithdrawAmount
          : 0,
      totalPaidForCompany:
        totalPaidForCompany.length > 0
          ? totalPaidForCompany[0].totalPaidForCompany
          : 0,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
