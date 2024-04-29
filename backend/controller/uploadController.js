import { sendMailWithAttachment } from "../config/mailer.js";
import upload from "../config/multifileUpload.js";
import { errorHandler } from "../middleware/errorHandler.js";
import Admin from "../models/adminModel.js";
import Alert from "../models/alertModel.js";
import Award from "../models/awardModel.js";
import Demate from "../models/demateModel.js";
import District from "../models/districtModel.js";
import HomeImage from "../models/homeImageModel.js";
import homeVideo from "../models/homeVideoModel.js";
import LiveNews from "../models/liveNewsModel.js";
import User from "../models/userModel.js";
import { paginate } from "./reportController.js";

//upload Home image

export const uploadHomeImages = async (req, res, next) => {
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

      const { description } = req.body;
      if (!req.files.homeImage) {
        return next(errorHandler(401, " Image not found"));
      }

      const homeImage = req.files.homeImage[0].filename;

      const newImage = await HomeImage.create({
        description,
        homeImage,
      });
      if (newImage) {
        return res.status(201).json({
          sts: "01",
          msg: "image Added Successfully",
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

//view Home Images

export const viewHomeImages = async (req, res, next) => {
  try {
    const homeImageData = await HomeImage.find();
    if (homeImageData) {
      const ImageCount = homeImageData.length;
      res.status(200).json({
        homeImageData,
        ImageCount,
        sts: "Image data get Success",
      });
    } else {
      next(errorHandler(401, "Blogs not found"));
    }
  } catch (error) {
    next(error);
  }
};

// delete single image
export const deleteSingleImage = async (req, res, next) => {
  try {
    const { id } = req.params;
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
        next(errorHandler(404, "ImageData not found"));
      }
    } else {
      next(errorHandler(401, "Admin not found"));
    }
  } catch (error) {
    next(error);
  }
};

//upload Home videos

export const uploadHomeVideos = async (req, res, next) => {
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

      const { videoTitle, videoLink } = req.body;
      if (!req.files.videoThambnail) {
        return next(errorHandler(401, " video not found"));
      }

      const videoThambnail = req.files.videoThambnail[0].filename;

      const newVideo = await homeVideo.create({
        videoTitle,
        videoLink,
        videoThambnail,
      });
      if (newVideo) {
        return res.status(201).json({
          sts: "01",
          msg: "video Added Successfully",
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

// view all video data

export const viewHomeVideos = async (req, res, next) => {
  try {
    const homeVideoData = await homeVideo.find();
    if (homeVideoData) {
      const videoCount = homeVideoData.length;
      res.status(200).json({
        homeVideoData,
        videoCount,
        sts: "Video data get Success",
      });
    } else {
      next(errorHandler(401, "Video not found"));
    }
  } catch (error) {
    next(error);
  }
};

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

      const { id } = req.params; // Extracting videoId from params
      const { videoTitle, videoLink } = req.body;
      const thambnailFile =
        req.files && req.files.thambnail && req.files.thambnail[0];
      const videoData = await homeVideo.findById(id);
      // If a thumbnail file is provided, update the video thumbnail
      const videoThambnail = thambnailFile
        ? thambnailFile.filename
        : videoData.videoThambnail;

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
        next(errorHandler(404, "Video Data not found"));
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

export const uploadAwardDetails = async (req, res, next) => {
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

      const { memberName, achivedDetails } = req.body;
      if (!req.files.memberImage) {
        return next(errorHandler(401, " Image not found"));
      }

      const memberImage = req.files.memberImage[0].filename;

      const newAward = await Award.create({
        memberName,
        achivedDetails,
        memberImage,
      });
      if (newAward) {
        return res.status(201).json({
          sts: "01",
          msg: "Award and reward Added Successfully",
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

// view all award data

export const viewAwardDetails = async (req, res, next) => {
  try {
    const awardData = await Award.find();
    if (awardData) {
      const awardCount = awardData.length;
      res.status(200).json({
        awardData,
        awardCount,
        sts: "Award data get Success",
      });
    } else {
      next(errorHandler(401, "Awards not found"));
    }
  } catch (error) {
    next(error);
  }
};

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

      const { id } = req.params; // Extracting videoId from params
      const { memberName, achivedDetails } = req.body;
      const imageFile =
        req.files && req.files.memberImage && req.files.memberImage[0];
      const awardData = await Award.findById(id);
      // If a thumbnail file is provided, update the video thumbnail
      const memberImage = imageFile
        ? imageFile.filename
        : awardData.memberImage;

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
        next(errorHandler(404, "Award Data not found"));
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
    const { news, title } = req.body;
    const adminId = req.admin._id;
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return next(errorHandler(401, "Admin not found"));
    }

    const newNews = await LiveNews.create({
      news,
      title,
    });

    if (newNews) {
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
    const { news, title } = req.body;

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
    if (updatedNews) {
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
        next(errorHandler(404, "News Data not found"));
      }
    } else {
      next(errorHandler(401, "Admin not found"));
    }
  } catch (error) {
    next(error);
  }
};

//view alert data

export const viewNews = async (req, res, next) => {
  try {
    const newsData = await LiveNews.find().sort({ createdAt: -1 });
    if (newsData) {
      res.status(200).json({
        newsData,
        sts: "01",
        msg: "news data get Success",
      });
    } else {
      next(errorHandler("news not found"));
    }
  } catch (error) {
    next(error);
  }
};

//--------------------------------------------------Alert---------------------------------------------------------------------

// // add Alert
// export const addAlert = async (req, res, next) => {
//   try {

//       const { title, description } = req.body;
//         const adminId = req.admin._id;
//         const admin = await Admin.findById(adminId);

//       if (!admin) {
//         return next(errorHandler(401, "Admin not found"));
//       }

//       const alert = await Alert.create({
//         title,
//         description
//       });

// if(alert){
//   return res.status(201).json({
//     alert,
//     sts: "01",
//     msg: "Alert Added Successfully",
//   });
// }

//   } catch (error) {
//     next(error);
//   }
// };

export const addAlert = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const adminId = req.admin._id;
    let users;
    // Find the admin
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return next(errorHandler(401, "Admin not found"));
    }

    const newAlert = await Alert.create({
      title,
      description,
    });

    if (newAlert) {
      switch (newAlert.title) {
        case "nifty":
          users = await User.find({ nifty: true });
          break;
        case "bankNifty":
          users = await User.find({ bankNifty: true });
          break;
        case "crudeOil":
          users = await User.find({ crudeOil: true });
          break;
        default:
          return res.status(400).json({
            sts: "00",
            msg: "Invalid signal type",
          });
      }
    }

    for (const user of users) {
      if (user.userStatus === "approved") {
        user.signals.push(newAlert._id);
        try {
          await user.save();
        } catch (error) {
          console.error("Error saving user data:", error);
        }
      }
    }

    return res.status(201).json({
      newAlert,
      sts: "01",
      msg: "Alert Added Successfully",
    });
  } catch (err) {
    // Handle errors
    return next(err);
  }
};

//edit alert

export const editAlert = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const { id } = req.params;
    const { description } = req.body;

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
    alertData.description = description || alertData.description;

    // Save the updated SEO data
    const updatedAlert = await alertData.save();

    // Respond with the updated SEO data
    if (updatedAlert) {
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
        next(errorHandler(404, "Alert Data not found"));
      }
    } else {
      next(errorHandler(401, "Admin not found"));
    }
  } catch (error) {
    next(error);
  }
};

//view alert data

export const viewAlert = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10;
    const alertData = await Alert.find().sort({ createdAt: 1 });
    const paginatedSignals = await paginate(alertData, page, pageSize);
    res.status(200).json({
      signals: paginatedSignals.results,
      pagination: {
        page: paginatedSignals.page,
        pageSize: paginatedSignals.pageSize,
        totalPages: paginatedSignals.totalPages,
        totalDocs: paginatedSignals.totalDocs,
      },
      sts: "01",
      msg: "Get admin signals Success",
    });
  } catch (error) {
    next(error);
  }
};

// Function to fetch alerts based on user preferences
export const getAlertsForUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    let page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10;
    const userData = await User.findById(userId).populate({
      path: "signals",
      options: {
        sort: { createdAt: 1 }, // Sort by createdAt in descending order
      },
    });

    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }

    const userStatus = userData.userStatus;
    const signals = userData.signals;
    const paginatedSignals = await paginate(signals, page, pageSize);
    res.status(200).json({
      signals: paginatedSignals.results,
      userStatus,
      pagination: {
        page: paginatedSignals.page,
        pageSize: paginatedSignals.pageSize,
        totalPages: paginatedSignals.totalPages,
        totalDocs: paginatedSignals.totalDocs,
      },
      sts: "01",
      msg: "Get users signals Success",
    });
  } catch (err) {
    console.error("Error fetching alerts for user:", err);
    return next(err);
  }
};

//----------------------------Add Bank account-------------------------

export const addUserBankAccount = async (req, res, next) => {
  try {
    const id = req.query.id || req.user._id;
    const { holderName, accountNum, ifscCode, bankName } = req.body;

    const userData = await User.findById(id);
    if (!userData) {
      return next(errorHandler(401, "User not found"));
    }
    userData.bankDetails.bankName = bankName || userData.bankDetails.bankName;
    userData.bankDetails.holderName =
      holderName || userData.bankDetails.holderName;
    userData.bankDetails.accountNum =
      accountNum || userData.bankDetails.accountNum;
    userData.bankDetails.ifscCode = ifscCode || userData.bankDetails.ifscCode;

    const updatedUser = await userData.save();

    if (updatedUser) {
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

//----------------------------Add and Edit Nominee details-------------------------

export const addNomineeDetails = async (req, res, next) => {
  try {
    const id = req.query.id || req.user._id;
    // const {id}=req.query||userId
    const {
      name,
      phone,
      address,
      bankName,
      accountNum,
      ifscCode,
      aadhaarNum,
      pancardNum,
    } = req.body;
    const userData = await User.findById(id);
    if (!userData) {
      return next(errorHandler(401, "User not found"));
    }
    userData.nomineeDetails.bankName =
      bankName || userData.nomineeDetails.bankName;
    userData.nomineeDetails.name = name || userData.nomineeDetails.name;
    userData.nomineeDetails.accountNum =
      accountNum || userData.nomineeDetails.accountNum;
    userData.nomineeDetails.ifscCode =
      ifscCode || userData.nomineeDetails.ifscCode;
    userData.nomineeDetails.phone = phone || userData.nomineeDetails.phone;
    userData.nomineeDetails.address =
      address || userData.nomineeDetails.address;
    userData.nomineeDetails.aadhaarNum =
      aadhaarNum || userData.nomineeDetails.aadhaarNum;
    userData.nomineeDetails.pancardNum =
      pancardNum || userData.nomineeDetails.pancardNum;

    const updatedUser = await userData.save();

    if (updatedUser) {
      return res.status(200).json({
        updatedUser,
        sts: "01",
        msg: "nominee data updated successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

//---------------------------------------------add and edit demate account-----------------------------------------

export const addDemateAccount = async (req, res, next) => {
  try {
    const id = req.query.id || req.user._id;
    const {
      name,
      phone,
      address,
      email,
      demateUserName,
      state,
      district,
      zonal,
      panchayath,
    } = req.body;

    const userData = await User.findById(id);
    let demateUser = await Demate.findById(id);

    if (demateUser) {
      // If the demate account exists, update its details
      demateUser.name = name || demateUser.name;
      demateUser.phone = phone || demateUser.phone;
      demateUser.address = address || demateUser.address;
      demateUser.email = email || demateUser.email;
      demateUser.state = state || demateUser.state;
      demateUser.district = district || demateUser.district;
      demateUser.zonal = zonal || demateUser.zonal;
      demateUser.panchayath = panchayath || demateUser.panchayath;
      demateUser.demateUserName = demateUserName || demateUser.demateUserName;
      demateUser = await demateUser.save();
    } else {
      // If the demate account doesn't exist, create a new one
      demateUser = await Demate.create({
        sponserName: userData.name,
        sponser: id,
        name,
        phone,
        address,
        email,
        state,
        district,
        zonal,
        panchayath,
        demateUserName,
        status: "pending",
      });
    }

    if (demateUser) {
      return res.status(200).json({
        demateUser,
        sts: "01",
        msg: "demate accoun data updated successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

//pdf upload function

export const uploadPdf = async (req, res, next) => {
  try {
    // const adminId = req.admin._id;
    const { id } = req.params;
    const adminData = await Admin.find();

    if (!adminData) {
      return next(errorHandler(401, "Admin not exist"));
    }
    const userData = await User.findById(id);
    if (!userData) {
      return next(errorHandler(401, "User not exist"));
    }

    upload(req, res, async function (err) {
      if (err) {
        return next(errorHandler(401, "File upload error"));
      }

      if (!req.files.pdfFile) {
        return next(errorHandler(401, "PDF file not found"));
      }

      const pdfFileName = req.files.pdfFile[0].filename;
      userData.invoicePdf = pdfFileName;

      const newPdf = userData.save();
      // Send email with PDF attachment
      if (newPdf) {
        const recipientEmail = userData.email; // Use the recipient's email address
        const pdfFilePath = `http://localhost:6003/uploads/${pdfFileName}`; // Adjust path to PDF

        const emailSent = await sendMailWithAttachment(
          userData,
          recipientEmail,
          pdfFilePath
        );

        return res.status(201).json({
          sts: "01",
          msg: "PDF Added Successfully",
          emailSent: emailSent
            ? "Email Sent Successfully"
            : "Email Sending Failed",
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
