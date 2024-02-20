import jwt from "jsonwebtoken";
import { errorHandler } from "../middleware/errorHandler.js";
import Admin from "../models/adminModel.js";
import bcryptjs from "bcryptjs";






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
        const token = jwt.sign({ userId: validAdmin._id }, "Albetros", {
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
    const { id } = req.params;
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
      const {stateName}=req.body;

      const stateData=await State.findOne({name:stateName});

    } else {
      next(errorHandler(401, "Admin not found"));
    }
  } catch (error) {
    
  }
}


