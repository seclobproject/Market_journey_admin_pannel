import jwt from "jsonwebtoken";
import { errorHandler } from "../middleware/errorHandler.js";
import Admin from "../models/adminModel.js";
import bcryptjs from "bcryptjs";
import State from "../models/stateModel.js";
import District from "../models/districtModel.js";
import Zonal from "../models/zonalModel.js";
import Panchayath from "../models/panchayathModel.js";




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

//add Zonal

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
      if(!districtData){
        return next(errorHandler(401, "This District Not Found"));

      }
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
      const panchayathData=await Panchayath.findOne({name:panchayathName});
      if(panchayathData){
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
          name:panchayathName,
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
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
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
        msg: "Districts retrieved successfully",
      });
    } else {
      next(errorHandler(401, "Admin not found"));
    }
  } catch (error) {
    next(error);
  }
}


//view params Zonals
export const viewParamsZonals = async (req, res, next) => {
  try {
    const {id}=req.params;
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
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
    } else {
      next(errorHandler(401, "Admin not found"));
    }
  } catch (error) {
    next(error);
  }
}



//view params Panchayaths
export const viewParamsPanchayaths = async (req, res, next) => {
  try {
    const {id}=req.params;
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
      const zonalData = await Zonal.findById(id).populate("panchayaths")
      if (!zonalData || zonalData.length === 0) {
        return next(errorHandler(401, "No districts exist"));
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
    } else {
      next(errorHandler(401, "Admin not found"));
    }
  } catch (error) {
    next(error);
  }
}















// View all locations-------------------------------------------------------------------------------


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
        
        // get all districts
        export const viewAllDistricts = async (req, res, next) => {
          try {
            const adminId = req.admin._id;
            const admin = await Admin.findById(adminId);
        
            if (admin) {
              const districtData = await District.find({}, '_id name stateName packageAmount'); // Projection to get both '_id' and 'name' fields
              if (!districtData || districtData.length === 0) {
                return next(errorHandler(401, "No District exist"));
              }
              res.status(200).json({
                districts: districtData.map(district => ({
                  id: district._id,
                  name: district.name,
                  stateName: district.stateName,
                  packageAmount: district.packageAmount,   
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
              const zonalData = await Zonal.find({}, '_id name districtName stateName packageAmount'); 
              if (!zonalData || zonalData.length === 0) {
                return next(errorHandler(401, "No Zonals exist"));
              }
              res.status(200).json({
                zonals: zonalData.map(zonal => ({
                  id: zonal._id,
                  name: zonal.name,
                  stateName: zonal.stateName,
                  packageAmount: zonal.packageAmount, 
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
              const panchayathData = await Panchayath.find({}, '_id name districtName stateName zonalName packageAmount'); 
              if (!panchayathData || panchayathData.length === 0) {
                return next(errorHandler(401, "No Panchayaths exist"));
              }
              res.status(200).json({
                panchayaths: panchayathData.map(panchayath => ({
                  id: panchayath._id,
                  name: panchayath.name,
                  stateName: panchayath.stateName,
                  stateName: panchayath.zonalName,
                  packageAmount: panchayath.packageAmount, 
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