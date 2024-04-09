import { errorHandler } from "../middleware/errorHandler.js";
import Admin from "../models/adminModel.js";
import Demate from "../models/demateModel.js";
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
      const userData = await User.findById(userId).populate("walletWithdrawHistory").sort({createdAt:1});
  
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




//view pending demate accounts

export const getPendingDematesPaginated = async (req, res, next) => {
    try {
        const userId = req.admin._id;
        const adminData = await Admin.findById(userId);
        
        if (!adminData) {
            return next(errorHandler(401, "Admin Login Failed"));
        }
        
        let page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided

        const userData = await Demate.find({ status: "pending" })
            
        const paginatedPendingDemats = await paginate(userData, page, pageSize);

        res.status(200).json({
            pendingDemats: paginatedPendingDemats.results,
                pagination: {
                    page: paginatedPendingDemats.page,
                    pageSize: paginatedPendingDemats.pageSize,
                    totalPages: paginatedPendingDemats.totalPages,
                    totalDocs: paginatedPendingDemats.totalDocs
                },
                sts: "01",
                msg: "Get Pending Demat accounts report Success",
        });
    } catch (error) {
        next(error);
    }
};

//view approved demate accounts

export const getApprovedDematesPaginated = async (req, res, next) => {
    try {
        const userId = req.admin._id;
        const adminData = await Admin.findById(userId);
        
        if (!adminData) {
            return next(errorHandler(401, "Admin Login Failed"));
        }
        
        let page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided
        const userData = await Demate.find({ status: "approved" })
        const paginatedApproveDemats = await paginate(userData, page, pageSize);

        res.status(200).json({
            approveDemats: paginatedApproveDemats.results,
                pagination: {
                    page: paginatedApproveDemats.page,
                    pageSize: paginatedApproveDemats.pageSize,
                    totalPages: paginatedApproveDemats.totalPages,
                    totalDocs: paginatedApproveDemats.totalDocs
                },
                sts: "01",
                msg: "Get apporved Demat accounts report Success",
        });
    } catch (error) {
        next(error);
    }
};



  // view autopool credit history


  export const autoPoolHistory = async (req, res, next) => {

    const userId = req.admin._id;
    let page=parseInt(req.query.page)||1;
    const pageSize=parseInt(req.query.pageSize)||10;
    try {
    const adminData = await Admin.findById(userId).populate({
        path: "autoPoolHistory",
        options: {
            sort: { createdAt: 1 } // Sort by createdAt in descending order
        }
    });
      if (!adminData) {
        return next(errorHandler(401, "Admin Login Failed"));
      }
      const poolHistory = adminData.autoPoolHistory;
      const paginatedPoolHistory = await paginate(poolHistory, page, pageSize);
      res.status(200).json({
          levelIncome: paginatedPoolHistory.results,
          pagination: {
              page: paginatedPoolHistory.page,
              pageSize: paginatedPoolHistory.pageSize,
              totalPages: paginatedPoolHistory.totalPages,
              totalDocs: paginatedPoolHistory.totalDocs
          },
          sts: "01",
          msg: "Get auto pool wallet income credit report users Success",
      });
     
    } catch (error) {
      next(error);
    }
  };


  // Paginated version of demat accounts
export const userDemateAccounts = async (req, res, next) => {
    const userId = req.user._id;
    let page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided

    try {
        const userData = await User.findById(userId).populate({
            path: "demateAccounts",
            options: {
                sort: { createdAt: 1 } // Sort by createdAt in descending order
            }
        });

        
        if (userData) {
            const userStatus = userData.userStatus;
            const userDemateAccounts = userData.demateAccounts;
            const paginateduserDemateAccounts = await paginate(userDemateAccounts, page, pageSize);
            res.status(200).json({
                demateAccounts: paginateduserDemateAccounts.results,
                userStatus,
                pagination: {
                    page: paginateduserDemateAccounts.page,
                    pageSize: paginateduserDemateAccounts.pageSize,
                    totalPages: paginateduserDemateAccounts.totalPages,
                    totalDocs: paginateduserDemateAccounts.totalDocs
                },
                sts: "01",
                msg: "Get Demate Account report users Success",
            });
        } else {
            return next(errorHandler(401, "User Login Failed"));
        }
    } catch (error) {
        next(error);
    }
};

// Paginated View Pools
export const viewPoolUsers = async (req, res, next) => {
    try {
        const userId = req.admin._id;
        const { page = 1, pageSize = 10, pool } = req.query;
        let userData;

        if (['poolA', 'poolB', 'poolC', 'poolD', 'poolE'].includes(pool)) {
            userData = await Admin.findById(userId).populate({
                path: pool,
                options: { sort: { createdAt: 1 } }
            });

            if (userData) {
                const poolUsers = userData[pool];
                const userStatus = userData.userStatus;
                const paginatedPoolUsers = await paginate(poolUsers, parseInt(page), parseInt(pageSize));

                return res.status(200).json({
                    poolUsers: paginatedPoolUsers.results,
                    userStatus,
                    pagination: {
                        page: paginatedPoolUsers.page,
                        pageSize: paginatedPoolUsers.pageSize,
                        totalPages: paginatedPoolUsers.totalPages,
                        totalDocs: paginatedPoolUsers.totalDocs
                    },
                    sts: "01",
                    msg: "Get Auto pool users report Success",
                });
            }
        }

        return next(errorHandler(401, "User Login Failed"));
    } catch (error) {
        console.log(error);
        next(error);
    }
};



  // user autopool credit history
  export const userAutoPoolIncomeHistory = async (req, res, next) => {
    const userId = req.user._id;
    let page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided

    try {
        const userData = await User.findById(userId).populate({
            path: "autoPoolIncomeHistory",
            options: {
                sort: { createdAt: 1 } // Sort by createdAt in descending order
            }
        });
        if (userData) {
            const userStatus = userData.userStatus;
            const userCreditHistory = userData.autoPoolIncomeHistory;
            const paginateduserCreditHistory = await paginate(userCreditHistory, page, pageSize);
            res.status(200).json({
                autoPoolCreditHistory: paginateduserCreditHistory.results,
                userStatus,
                pagination: {
                    page: paginateduserCreditHistory.page,
                    pageSize: paginateduserCreditHistory.pageSize,
                    totalPages: paginateduserCreditHistory.totalPages,
                    totalDocs: paginateduserCreditHistory.totalDocs
                },
                sts: "01",
                msg: "Get Autopool amount credit report users Success",
            });
        } else {
            return next(errorHandler(401, "User Login Failed"));
        }
    } catch (error) {
        next(error);
    }
};


//get autopool count and distributed amount

// Function to get autopool count and distributed amount
export const getAutoPoolCountAmount = async (req, res, next) => {
    try {
        // Extract user ID from request
        const userId = req.user._id;

        // Fetch user data
        const userData = await User.findById(userId);
        if (!userData) {
            throw errorHandler(401, "User Login Failed");
        }

        // Fetch admin data
        const admin = await Admin.findOne();
        if (!admin) {
            throw errorHandler(401, "Autopool data can't be fetched");
        }

        // Extract auto pool distribution history
        const { autoPoolDistributionHistory } = admin;

        // Ensure auto pool distribution history is available
        if (!autoPoolDistributionHistory || !autoPoolDistributionHistory.length) {
            throw errorHandler(404, "Auto pool distribution history not found");
        }

        // Get the latest distribution entry
        const latestDistribution = autoPoolDistributionHistory[autoPoolDistributionHistory.length - 1];

        // Extract required data from the latest distribution entry
        const {
            distributedAmount,
            amountpoolA,
            amountpoolB,
            amountpoolC,
            amountpoolD,
            amountpoolE,
            countInPoolA,
            countInPoolB,
            countInPoolC,
            countInPoolD,
            countInPoolE
        } = latestDistribution;

        // Prepare pool data
        const pool = [
            { amount: amountpoolA, count: countInPoolA },
            { amount: amountpoolB, count: countInPoolB },
            { amount: amountpoolC, count: countInPoolC },
            { amount: amountpoolD, count: countInPoolD },
            { amount: amountpoolE, count: countInPoolE }
        ];

        // Send response
        res.status(200).json({
            pool,
            distributedAmount,
            sts: "01",
            msg: "Get Autopool amounts and AutoPool Counts Success",
        });
    } catch (error) {
        // Pass error to error handling middleware
        next(error);
    }
};

