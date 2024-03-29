import { errorHandler } from "../middleware/errorHandler.js";
import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";






//------------------Paginated Function-------------------------------------------------------------------------------
const paginate = async (model, page = 1, pageSize = 10) => {
    try {
        const totalDocs = model.length;
        const totalPages = Math.ceil(totalDocs / pageSize);

        const offset = pageSize * (page - 1);

        const results = model.slice(offset, offset + pageSize);
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

// Paginated version of directReferalIncomeReport
export const directIncomeReportPaginated = async (req, res, next) => {
    const userId = req.user._id;
    let page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided

    try {
        const userData = await User.findById(userId).populate({
            path: "directReferalHistory",
            options: {
                sort: { createdAt: 1 } // Sort by createdAt in descending order
            }
        });

        if (userData) {
            const userStatus = userData.userStatus;
            const directReferalHistory = userData.directReferalHistory;
            const paginatedReferalHistory = await paginate(directReferalHistory, page, pageSize);
            res.status(200).json({
                directIncome: paginatedReferalHistory.results,
                userStatus,
                pagination: {
                    page: paginatedReferalHistory.page,
                    pageSize: paginatedReferalHistory.pageSize,
                    totalPages: paginatedReferalHistory.totalPages,
                    totalDocs: paginatedReferalHistory.totalDocs
                },
                sts: "01",
                msg: "Get direct income report users Success",
            });
        } else {
            return next(errorHandler(401, "User Login Failed"));
        }
    } catch (error) {
        next(error);
    }
};


// Paginated version of inDirectReferalIncomeReport
export const inDirectIncomeReportPaginated = async (req, res, next) => {
    const userId = req.user._id;
    let page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided

    try {
        const userData = await User.findById(userId).populate({
            path: "inDirectReferalHistory",
            options: {
                sort: { createdAt: 1 } // Sort by createdAt in descending order
            }
        });

        if (userData) {
            const userStatus = userData.userStatus;
            const inDirectReferalHistory = userData.inDirectReferalHistory;
            const paginatedReferalHistory = await paginate(inDirectReferalHistory, page, pageSize);
            res.status(200).json({
                inDirectIncome: paginatedReferalHistory.results,
                userStatus,
                pagination: {
                    page: paginatedReferalHistory.page,
                    pageSize: paginatedReferalHistory.pageSize,
                    totalPages: paginatedReferalHistory.totalPages,
                    totalDocs: paginatedReferalHistory.totalDocs
                },
                sts: "01",
                msg: "Get direct income report users Success",
            });
        } else {
            return next(errorHandler(401, "User Login Failed"));
        }
    } catch (error) {
        next(error);
    }
};



// Paginated version of levelIncomeReport
export const levelIncomeReportPaginated = async (req, res, next) => {
    const userId = req.user._id;
    let page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided

    try {
        const userData = await User.findById(userId).populate({
            path: "levelIncomeHistory",
            options: {
                sort: { createdAt: 1 } // Sort by createdAt in descending order
            }
        });

        if (userData) {
            const userStatus = userData.userStatus;
            const levelIncomeHistory = userData.levelIncomeHistory;
            const paginatedReferalHistory = await paginate(levelIncomeHistory, page, pageSize);
            res.status(200).json({
                levelIncome: paginatedReferalHistory.results,
                userStatus,
                pagination: {
                    page: paginatedReferalHistory.page,
                    pageSize: paginatedReferalHistory.pageSize,
                    totalPages: paginatedReferalHistory.totalPages,
                    totalDocs: paginatedReferalHistory.totalDocs
                },
                sts: "01",
                msg: "Get direct income report users Success",
            });
        } else {
            return next(errorHandler(401, "User Login Failed"));
        }
    } catch (error) {
        next(error);
    }
};


//user reports

//Wallet withdraw report

export const walletWithdrawReportUser = async (req, res, next) => {
    const userId = req.user._id;
    try {
      // Fetch user data with populated walletWithdrawHistory
      const userData = await User.findById(userId).populate("walletWithdrawHistory");
  
      if (!userData) {
        return next(errorHandler(401, "User login failed."));
      }
  
      const walletWithdrawHistory = userData.walletWithdrawHistory || [];
      const userStatus = userData.userStatus;
      let response = {
        walletWithdrawHistory,
        walletAmount: userData.walletAmount,
        userStatus,
        sts: "01",
        msg: "Get wallet withdrawal report users success",
      };
  
      // If the withdrawal status is pending, add the pending withdrawal to the response
      if (userData.walletWithdrawStatus === "pending") {
        const pendingWithdrawal = {
          name: userData.name,
          reportName: "walletWithdrawReport",
          ownID: userData.ownSponserId,
          franchise: userData.franchise,
          requestedAmount: userData.walletWithdrawAmount,
          TDS: "10%",
          releasedAmount: userData.tdsAmount,
          status: "Pending",
          createdAt: userData.createdAt,
        };
        response.walletWithdrawHistory.unshift(pendingWithdrawal);
      }
  
      // Send response
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };



  //admin reports

  //all withdraW HISTORY

//   export const totalWalletWithdrawHistory = async (req, res, next) => {
//     const userId = req.admin._id;
//     const adminData = await Admin.findById(userId);
  
//     try {
//       if (adminData) {
//         const aggregateQuery = [
//           {
//             $unwind: "$walletWithdrawHistory",
//           },
//           {
//             $sort: {
//               "walletWithdrawHistory.createdAt": 1,
//             },
//           },
//           {
//             $project: {
//               _id: 0,
//               name: "$walletWithdrawHistory.name",
//               requestedAmount: "$walletWithdrawHistory.requestedAmount",
//               status: "$walletWithdrawHistory.status",
//               franchise: "$walletWithdrawHistory.franchise",
//               TDS: "$walletWithdrawHistory.TDS",
//               releasedAmount:"$walletWithdrawHistory.releasedAmount",
//               newWalletAmount: "$walletWithdrawHistory.newWalletAmount",
//               createdAt: "$walletWithdrawHistory.createdAt",
//             },
//           },
//         ];
  
//         const result = await User.aggregate(aggregateQuery);
  
//         if (result) {
//           res
//             .status(200)
//             .json({
//               allAddFundHistory: result,
//               msg: "Successfully get users fund history!",
//             });
//         }
//       } else {
//         return next(errorHandler(401, "Admin Login Failed"));
//       }
//     } catch (error) {
//       next(error);
//     }
//   };

const paginateAggregate = async (model, aggregateQuery, page = 1, pageSize = 10) => {
    try {
        const countAggregateQuery = [...aggregateQuery, { $count: "totalDocs" }];
        const totalDocsCountResult = await model.aggregate(countAggregateQuery);

        const totalDocs = totalDocsCountResult.length > 0 ? totalDocsCountResult[0].totalDocs : 0;
        const totalPages = Math.ceil(totalDocs / pageSize);

        const offset = pageSize * (page - 1);

        const paginatedQuery = [...aggregateQuery, { $skip: offset }, { $limit: pageSize }];
        const results = await model.aggregate(paginatedQuery);

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

// Paginated version of totalWalletWithdrawHistory
export const totalWalletWithdrawHistory = async (req, res, next) => {
    const userId = req.admin._id;
    let page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided

    try {
        const adminData = await Admin.findById(userId);
        if (adminData) {
            const aggregateQuery = [
                {
                    $unwind: "$walletWithdrawHistory",
                },
                {
                    $sort: {
                        "walletWithdrawHistory.createdAt": -1,
                    },
                },
                {
                    $project: {
                        name: "$walletWithdrawHistory.name",
                        requestedAmount: "$walletWithdrawHistory.requestedAmount",
                        status: "$walletWithdrawHistory.status",
                        franchise: "$walletWithdrawHistory.franchise",
                        TDS: "$walletWithdrawHistory.TDS",
                        releasedAmount: "$walletWithdrawHistory.releasedAmount",
                        newWalletAmount: "$walletWithdrawHistory.newWalletAmount",
                        createdAt: "$walletWithdrawHistory.createdAt",
                    },
                },
            ];

            const paginatedResult = await paginateAggregate(User, aggregateQuery, page, pageSize);

            res.status(200).json({
                allAddFundHistory: paginatedResult.results,
                pagination: {
                    page: paginatedResult.page,
                    pageSize: paginatedResult.pageSize,
                    totalPages: paginatedResult.totalPages,
                    totalDocs: paginatedResult.totalDocs
                },
                msg: "Successfully get users fund history!",
            });
        } else {
            return next(errorHandler(401, "Admin Login Failed"));
        }
    } catch (error) {
        next(error);
    }
};
