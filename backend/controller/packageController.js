import { errorHandler } from "../middleware/errorHandler.js";
import Admin from "../models/adminModel.js";
import Package from "../models/packageModel.js";

// export const addPackage=async(req,res,next)=>{
//     try {
//         const adminId = req.admin._id;
//     const admin = await Admin.findById(adminId);

//     if (admin) {
//       const {franchiseName,packageAmount,packageName}=req.body;
//       const packageData=await Package.findOne({franchiseName:franchiseName});
//       if (franchiseName !== "Mobile Franchise" && packageData) {
//         // Returning an error message if the package already exists
//         return next(errorHandler(401, "This Package already exists"));
//     }
//     if(franchiseName==="Mobile Franchise"){
//       const newPackage = new Package({
//         franchiseName,
//         packageName,
//         packageAmount
//       });
//     }else{
//       const newPackage = new Package({
//         franchiseName,
//         packageName:franchiseName,
//         packageAmount
//       });
//     }
//     const addPackage = await newPackage.save();
//     if(addPackage){
//       res.status(200).json({
//           addPackage,
//         sts: "01",
//         msg: "Package added Successfull",
//       });
//     }else{
//     next(errorHandler(401, "Package add Not success"));
//     }

//     } else {
//         next(errorHandler(401, "Admin not found"));
//       }
//     } catch (error) {
//         next(error)
//     }
// }
export const addPackage = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return next(errorHandler(401, "Admin not found"));
    }

    const { franchiseName, packageAmount, packageName } = req.body;
    // if (franchiseName !== "Courses"&&franchiseName !=="Signals") {
    //     const packageData = await Package.findOne({ franchiseName: franchiseName });
    //     if (packageData) {
    //         return next(errorHandler(401, "This Package already exists"));
    //     }
    // }
    const packageDetails = await Package.findOne({ packageName: packageName });
    if (packageDetails) {
      return next(errorHandler(401, "This Package already exists"));
    }
    // const validFranchiseNames = ["Mobile Franchise", "District Franchise", "Zonal Franchise"];
    // const newPackageName = validFranchiseNames.includes(franchiseName) ? franchiseName : packageName;

    const newPackage = new Package({
      franchiseName,
      packageName,
      packageAmount,
    });

    const addPackage = await newPackage.save();

    if (addPackage) {
      return res.status(200).json({
        addPackage,
        sts: "01",
        msg: "Package added successfully",
      });
    } else {
      return next(errorHandler(401, "Package add not successful"));
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const editPackage = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const { id } = req.params;
    const { packageAmount } = req.body;

    // Find the admin
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return next(errorHandler(401, "Admin not found"));
    }

    // Find the data to edit
    let packageData = await Package.findById(id);
    if (!packageData) {
      return next(errorHandler(404, "Package not found"));
    }

    // Update the data with the new values if they are provided
    packageData.packageAmount = packageAmount || packageData.packageAmount;

    // Save the updated SEO data
    const updatedPackage = await packageData.save();

    // Respond with the updated SEO data
    if (updatedPackage) {
      return res.status(200).json({
        updatedPackage,
        sts: "01",
        msg: "Package amount updated successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

// get all Packages
export const viewPackages = async (req, res, next) => {
  try {
    // const adminId = req.admin._id;
    // const admin = await Admin.findById(adminId);

    // if (admin) {
    const packageData = await Package.find();
    if (!packageData || packageData.length === 0) {
      return next(errorHandler(401, "No Package exist"));
    }
    res.status(200).json({
      packageData,
      sts: "01",
      msg: "Packages retrieved successfully",
    });
    // } else {
    //   next(errorHandler(401, "Admin not found"));
    // }
  } catch (error) {
    next(error);
  }
};
