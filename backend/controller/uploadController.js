import upload from "../config/multifileUpload.js";
import { errorHandler } from "../middleware/errorHandler.js";
import Admin from "../models/adminModel.js";
import Alert from "../models/alertModel.js";
import Award from "../models/awardModel.js";
import HomeImage from "../models/homeImageModel.js";
import homeVideo from "../models/homeVideoModel.js";
import LiveNews from "../models/liveNewsModel.js";
import User from "../models/userModel.js";



//upload Home image 


export const uploadHomeImages=async(req,res,next)=>{
    try {
      const adminId = req.admin._id;
      const adminData = await Admin.findById(adminId)
      if(!adminData){
        return next(errorHandler(401, "Admin not exist"));
      }
      upload(req, res, async function (err) {
        if (err) {
          return next(errorHandler(401, "File upload error"));
        }
        
        const {description } = req.body;
        if(!req.files.homeImage){
          return next(errorHandler(401, " Image not found"));
        }
  
          const homeImage = req.files.homeImage[0].filename;
  
       
          const newImage = await HomeImage.create({
            description,
            homeImage
          });
          if(newImage){
            return res.status(201).json({
              sts: "01",
              msg: "image Added Successfully",
            });
          }
          
        });
  
    } catch (error) {
      next(error)
    }
  }


  //view Home Images


  export const viewHomeImages=async(req,res,next)=>{
    try {
      const homeImageData=await HomeImage.find()
      if(homeImageData){
        const ImageCount=homeImageData.length;
        res.status(200).json({
            homeImageData,
            ImageCount,
          sts: "Image data get Success",
        });
      }else {
      next(errorHandler(401,"Blogs not found"));
    }
  } catch (error) {
    next(error);
  }

  }



    // delete single image
export const deleteSingleImage = async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      const adminId = req.admin._id;
      const admin = await Admin.findById(adminId);
  
      if (admin) {
        const deletedImage = await HomeImage.findByIdAndDelete(id);
  
        if (deletedImage) {
          res.status(200).json({
            deletedImage,
            sts: "01",
            msg: "Image deleted successfully",
          });
        } else {
          next(errorHandler(404,"ImageData not found"));
        }
      } else {
        next(errorHandler(401, "Admin not found"));
      }
    } catch (error) {
      next(error);
    }
  };





//upload Home videos


export const uploadHomeVideos=async(req,res,next)=>{
    try {
      const adminId = req.admin._id;
      const adminData = await Admin.findById(adminId)
      if(!adminData){
        return next(errorHandler(401, "Admin not exist"));
      }
      upload(req, res, async function (err) {
        if (err) {
          return next(errorHandler(401, "File upload error"));
        }
        
        const {videoTitle,videoLink } = req.body;
        if(!req.files.videoThambnail){
          return next(errorHandler(401, " video not found"));
        }
  
          const videoThambnail = req.files.videoThambnail[0].filename;
  
       
          const newVideo = await homeVideo.create({
            videoTitle,
            videoLink,
            videoThambnail
          });
          if(newVideo){
            return res.status(201).json({
              sts: "01",
              msg: "video Added Successfully",
            });
          }
          
        });
  
    } catch (error) {
      next(error)
    }
  }




// view all video data

  export const viewHomeVideos=async(req,res,next)=>{
    try {
      const homeVideoData=await homeVideo.find()
      if(homeVideoData){
        const videoCount=homeVideoData.length;
        res.status(200).json({
            homeVideoData,
            videoCount,
          sts: "Video data get Success",
        });
      }else {
      next(errorHandler(401,"Video not found"));
    }
  } catch (error) {
    next(error);
  }

  }


  // edit video details
// Function to update existing home video
export const updateHomeVideo = async (req, res, next) => {
    try {
      const adminId = req.admin._id;
      const adminData = await Admin.findById(adminId);
      if (!adminData) {
        return next(errorHandler(401, "Admin not exist"));
      }
  
      upload(req, res, async function (err) {
        if (err) {
          return next(errorHandler(401, "File upload error"));
        }
  
        const {id} = req.params; // Extracting videoId from params
        const { videoTitle, videoLink } = req.body;
        const thambnailFile = req.files && req.files.thambnail && req.files.thambnail[0];
        const videoData=await homeVideo.findById(id)
        // If a thumbnail file is provided, update the video thumbnail
        const videoThambnail = thambnailFile ? thambnailFile.filename : videoData.videoThambnail;

        const updatedVideo = await homeVideo.findByIdAndUpdate(
            id,
          {
            $set: {
              videoTitle,
              videoLink,
              videoThambnail,
            },
          },
          { new: true }
        );
  
        if (updatedVideo) {
          return res.status(200).json({
            status: "success",
            message: "Video updated successfully",
            updatedVideo,
          });
        } else {
          return next(errorHandler(404, "Video not found"));
        }
      });
    } catch (error) {
      next(error);
    }
  };
  


      // delete single Video
export const deleteSingleVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (admin) {
      const deletedVideo = await homeVideo.findByIdAndDelete(id);

      if (deletedVideo) {
        res.status(200).json({
          deletedVideo,
          sts: "01",
          msg: "video deleted successfully",
        });
      } else {
        next(errorHandler(404,"Video Data not found"));
      }
    } else {
      next(errorHandler(401, "Admin not found"));
    }
  } catch (error) {
    next(error);
  }
};

//-------------------------------------Awards and rewards------------------------------------------------------------------



//upload Award Details


export const uploadAwardDetails=async(req,res,next)=>{
  try {
    const adminId = req.admin._id;
    const adminData = await Admin.findById(adminId)
    if(!adminData){
      return next(errorHandler(401, "Admin not exist"));
    }
    upload(req, res, async function (err) {
      if (err) {
        return next(errorHandler(401, "File upload error"));
      }
      
      const {memberName,achivedDetails } = req.body;
      if(!req.files.memberImage){
        return next(errorHandler(401, " Image not found"));
      }

        const memberImage = req.files.memberImage[0].filename;

     
        const newAward = await Award.create({
          memberName,
          achivedDetails,
          memberImage
        });
        if(newAward){
          return res.status(201).json({
            sts: "01",
            msg: "Award and reward Added Successfully",
          });
        }
        
      });

  } catch (error) {
    next(error)
  }
}




// view all award data

export const viewAwardDetails=async(req,res,next)=>{
  try {
    const awardData=await Award.find()
    if(awardData){
      const awardCount=awardData.length;
      res.status(200).json({
        awardData,
        awardCount,
        sts: "Award data get Success",
      });
    }else {
    next(errorHandler(401,"Awards not found"));
  }
} catch (error) {
  next(error);
}

}


// edit video details
// Function to update existing award data
export const updateAwardData = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const adminData = await Admin.findById(adminId);
    if (!adminData) {
      return next(errorHandler(401, "Admin not exist"));
    }

    upload(req, res, async function (err) {
      if (err) {
        return next(errorHandler(401, "File upload error"));
      }

      const {id} = req.params; // Extracting videoId from params
      const { memberName, achivedDetails } = req.body;
      const imageFile = req.files && req.files.memberImage && req.files.memberImage[0];
      const awardData=await Award.findById(id)
      // If a thumbnail file is provided, update the video thumbnail
      const memberImage = imageFile ? imageFile.filename : awardData.memberImage;

      const updatedAward = await Award.findByIdAndUpdate(
          id,
        {
          $set: {
            memberName,
            achivedDetails,
            memberImage,
          },
        },
        { new: true }
      );

      if (updatedAward) {
        return res.status(200).json({
          status: "success",
          message: "Award updated successfully",
          updatedAward,
        });
      } else {
        return next(errorHandler(404, "Awards not found"));
      }
    });
  } catch (error) {
    next(error);
  }
};



    // delete single Video
export const deleteSingleAward = async (req, res, next) => {
try {
  const { id } = req.params;
  const adminId = req.admin._id;
  const admin = await Admin.findById(adminId);

  if (admin) {
    const deletedAward = await Award.findByIdAndDelete(id);

    if (deletedAward) {
      res.status(200).json({
        deletedAward,
        sts: "01",
        msg: "Award deleted successfully",
      });
    } else {
      next(errorHandler(404,"Award Data not found"));
    }
  } else {
    next(errorHandler(401, "Admin not found"));
  }
} catch (error) {
  next(error);
}
};


//---------------------------------------------live news updates--------------------------------------------------------------

// add Alert
export const addNews = async (req, res, next) => {
  try {
      
      const {news,title } = req.body;
        const adminId = req.admin._id;
        const admin = await Admin.findById(adminId);

      if (!admin) {
        return next(errorHandler(401, "Admin not found"));
      }

      const newNews = await LiveNews.create({
        news,
        title
      });

if(newNews){
  return res.status(201).json({
    newNews,
    sts: "01",
    msg: "News Added Successfully",
  });
}
      
    
  } catch (error) {
    next(error);
  }
};


  //edit alert

  export const editNews = async (req, res, next) => {
    try {
      const adminId = req.admin._id;
      const { id } = req.params;
      const { news,title} = req.body;

      // Find the admin
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return next(errorHandler(401, "Admin not found"));
      }

      // Find the Alert data to edit
      let newsData = await LiveNews.findById(id);
      if (!newsData) {
        return next(errorHandler(404, "Alert data not found"));
      }

      // Update the Alert data with the new values if they are provided
      newsData.news = news || newsData.news;
      newsData.title = title || newsData.title;

      // Save the updated SEO data
      const updatedNews = await newsData.save();

      // Respond with the updated SEO data
      if(updatedNews){
        return res.status(200).json({
          updatedNews,
            sts: "01",
            msg: "News data updated successfully",
          });
      }


    } catch (error) {
      next(error);
    }
  };

    // delete single Video
    export const deleteSingleNews = async (req, res, next) => {
      try {
        const { id } = req.params;
        const adminId = req.admin._id;
        const admin = await Admin.findById(adminId);
      
        if (admin) {
          const deletedNews = await LiveNews.findByIdAndDelete(id);
      
          if (deletedNews) {
            res.status(200).json({
              deletedNews,
              sts: "01",
              msg: "News deleted successfully",
            });
          } else {
            next(errorHandler(404,"News Data not found"));
          }
        } else {
          next(errorHandler(401, "Admin not found"));
        }
      } catch (error) {
        next(error);
      }
      };
      
//view alert data

  export const viewNews=async(req,res,next)=>{
    try {
      const newsData=await LiveNews.find()
      if(newsData){
        res.status(200).json({
          newsData,
          sts: "01",
          msg: "news data get Success",
        });
      }else {
      next(errorHandler("news not found"));
    }
  } catch (error) {
    next(error);
  }

  }




//--------------------------------------------------Alert---------------------------------------------------------------------

// add Alert
export const addAlert = async (req, res, next) => {
  try {
      
      const { title, description } = req.body;
        const adminId = req.admin._id;
        const admin = await Admin.findById(adminId);

      if (!admin) {
        return next(errorHandler(401, "Admin not found"));
      }

      const alert = await Alert.create({
        title,
        description
      });

if(alert){
  return res.status(201).json({
    alert,
    sts: "01",
    msg: "Alert Added Successfully",
  });
}
      
    
  } catch (error) {
    next(error);
  }
};


  //edit alert

  export const editAlert = async (req, res, next) => {
    try {
      const adminId = req.admin._id;
      const { id } = req.params;
      const { title, description} = req.body;

      // Find the admin
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return next(errorHandler(401, "Admin not found"));
      }

      // Find the Alert data to edit
      let alertData = await Alert.findById(id);
      if (!alertData) {
        return next(errorHandler(404, "Alert data not found"));
      }

      // Update the Alert data with the new values if they are provided
      alertData.title = title || alertData.title;
      alertData.description = description || alertData.description;

      // Save the updated SEO data
      const updatedAlert = await alertData.save();

      // Respond with the updated SEO data
      if(updatedAlert){
        return res.status(200).json({
          updatedAlert,
            sts: "01",
            msg: "Alert data updated successfully",
          });
      }


    } catch (error) {
      next(error);
    }
  };

    // delete single Video
    export const deleteSingleAlert = async (req, res, next) => {
      try {
        const { id } = req.params;
        const adminId = req.admin._id;
        const admin = await Admin.findById(adminId);
      
        if (admin) {
          const deletedAlert = await Alert.findByIdAndDelete(id);
      
          if (deletedAlert) {
            res.status(200).json({
              deletedAlert,
              sts: "01",
              msg: "Alert deleted successfully",
            });
          } else {
            next(errorHandler(404,"Alert Data not found"));
          }
        } else {
          next(errorHandler(401, "Admin not found"));
        }
      } catch (error) {
        next(error);
      }
      };
      
//view alert data

  export const viewAlert=async(req,res,next)=>{
    try {
      const alertData=await Alert.find()
      if(alertData){
        res.status(200).json({
          alertData,
          sts: "01",
          msg: "alert data get Success",
        });
      }else {
      next(errorHandler("alerts not found"));
    }
  } catch (error) {
    next(error);
  }

  }




  //----------------------------Add Bank account-------------------------


   export const addUserBankAccount = async (req, res, next) => {
    try {
      const userId = req.user._id;
      const {holderName,accountNum,ifscCode,bankName} = req.body;

      const userData = await User.findById(userId);
      if (!userData) {
        return next(errorHandler(401, "User not found"));
      }

      userData.bankDetails.bankName = bankName|| userData.bankDetails.bankName;
      userData.bankDetails.holderName = holderName|| userData.bankDetails.holderName;
      userData.bankDetails.accountNum = accountNum|| userData.bankDetails.accountNum;
      userData.bankDetails.ifscCode = ifscCode|| userData.bankDetails.ifscCode;


      const updatedUser = await userData.save();

      if(updatedUser){
        return res.status(200).json({
          updatedUser,
            sts: "01",
            msg: "Bank data updated successfully",
          });
      }


    } catch (error) {
      next(error);
    }
  };