import jwt from "jsonwebtoken";
import { errorHandler } from "../middleware/errorHandler.js";
import Admin from "../models/adminModel.js";
import bcryptjs from "bcryptjs";
import State from "../models/stateModel.js";
import District from "../models/districtModel.js";
import Zonal from "../models/zonalModel.js";




// admin login Api

export const adminLogin = async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const validAdmin = await Admin.findOne({ username });
      if (!validAdmin) {
        return next(errorHandler(401, "User not found"));
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
          email: validAdmin.username,
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


//add State Franchise

export const addState=async(req,res,next)=>{
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
      const {stateName}=req.body;

      const stateData=await State.findOne({name:stateName});
      if(stateData){
        return next(errorHandler(401, "This state already exist"));
      }
      const newState = new State({
        name:stateName
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

//view States
export const viewStates = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
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
    } else {
      next(errorHandler(401, "Admin not found"));
    }
  } catch (error) {
    next(error);
  }
}

//add District Franchise

export const addDistrict=async(req,res,next)=>{
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
      const {stateName,districtName,packageAmount}=req.body;

      const districtData=await District.findOne({name:districtName});
      if(districtData){
        return next(errorHandler(401, "This District already exist"));
      }
      const stateData=await State.findOne({name:stateName});
      if(stateData){
        const newDistrict = new District({
          name:districtName,
          packageAmount:packageAmount,
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



export const addZonal=async(req,res,next)=>{
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
      const {stateName,districtName,zonalName,packageAmount}=req.body;
      const zonalData=await Zonal.findOne({name:zonalName});
      if(zonalData){
        return next(errorHandler(401, "This Zonal already exist"));
      }
      const districtData=await District.findOne({name:districtName});
      if(districtData){
        const newZonal = new Zonal({
          name:zonalName,
          packageAmount:packageAmount,
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

      }
      else{
        return next(errorHandler(401, "This District Not Found"));
      }
    } else {
      next(errorHandler(401, "Admin not found"));
    }
  } catch (error) {
    next(error)
  }
}


export const addPanchayath=async(req,res,next)=>{
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
      const {stateName,districtName,zonalName,panchayathName,packageAmount}=req.body;
      const panchayathData=await Panchayath.findOne({name:panchayathName});
      if(panchayathData){
        return next(errorHandler(401, "This Panchayath already exist"));
      }
      const zonalData=await District.findOne({name:districtName});
      if(districtData){
        const newZonal = new Zonal({
          name:zonalName,
          packageAmount:packageAmount,
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

      }
      else{
        return next(errorHandler(401, "This District Not Found"));
      }
    } else {
      next(errorHandler(401, "Admin not found"));
    }
  } catch (error) {
    next(error)
  }
}



