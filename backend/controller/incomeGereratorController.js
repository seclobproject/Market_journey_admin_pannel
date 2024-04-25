


//generate referal income for all

import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";

export const generateReferalIncome = async (
    sponser1,
    sponser2Id,
   updatedUser
  ) => {
    console.log("----(1)-------enter to this function---------------------------");
    console.log("(2)sponser1---",sponser1.name);
    console.log("(4)New user----",updatedUser.name);
      const directReferalIncome = updatedUser.packageAmount * 0.10;
      const inDirectReferalIncome =updatedUser.packageAmount * 0.05;
      if (sponser1.isAdmin==false) {
        sponser1.directReferalIncome +=directReferalIncome;
        sponser1.walletAmount += directReferalIncome;
        sponser1.directReferalHistory.push({
          reportName: "DirectIncome for Franchise",
          userID: updatedUser.ownSponserId,
          franchise:updatedUser.franchise,
          name: updatedUser.name,
          percentageCredited:"10%",
          amountCredited: directReferalIncome,
          status: "Approved",
        });
        const updatedSponser1=await sponser1.save()
        console.log(`(5)sponser1 ${sponser1.name} direct referal=== ${directReferalIncome}`);
        if(updatedSponser1.isMobileFranchise){
          await franchiseIncomeGenerator(updatedSponser1,updatedUser.packageAmount,updatedUser.name,0.05,0.08)
          await levelIncomeGenerator(updatedSponser1,directReferalIncome)
          await franchiseIncomeGenerator(updatedSponser1,directReferalIncome,updatedUser.name,0.05,0.08)
        }
        
      }
    console.log("----(1)-------enter to sponser 2 referal---------------------------");
      const sponser2=await User.findById(sponser2Id)
    if(sponser2 && sponser2.isAdmin==false){
        console.log("before adding in direct:",sponser2.walletAmount);
        sponser2.inDirectReferalIncome +=inDirectReferalIncome;
        console.log("in direct:",inDirectReferalIncome);
        console.log("total in direct:",sponser2.inDirectReferalIncome);

        sponser2.walletAmount += inDirectReferalIncome;
      console.log("before adding in direct:",sponser2.walletAmount);

        sponser2.inDirectReferalHistory.push({
          reportName: "inDirectIncome for Franchise",
          userID: updatedUser.ownSponserId,
          franchise:updatedUser.franchise,
          name: updatedUser.name,
          percentageCredited:"5%",
          amountCredited: inDirectReferalIncome,
          status: "Approved",
        });

        const updatedSponser2=await sponser2.save()
      console.log("updated adding in direct:",sponser2.walletAmount);

        console.log(`sponser2 ${sponser2.name} direct referal=== ${directReferalIncome}`);

        if(updatedSponser2.isMobileFranchise){
          await levelIncomeGenerator(updatedSponser2,inDirectReferalIncome)
          await franchiseIncomeGenerator(updatedSponser2,inDirectReferalIncome,updatedUser.name,0.05,0.08)
        }
      }
  
      
  
  };



  export const levelIncomeGenerator=async (userData,amount)=>{
  console.log("-----------------------------------------------------------------------------------------------------------");

  console.log(`enter to level income function---${userData.name}--Amount is-----${amount}-----------------`);
  while(amount>=10){
    console.log("enter while loop--------------------------------------");
    const sponser=await User.findById(userData.sponser)
      if (!sponser||sponser.isDistrictFranchise||sponser.isZonalFranchise){
        break;
      };
      const levelIncome=amount*0.25;
      console.log("before total level income:",sponser.totalLevelIncome);

      console.log("level income:",levelIncome);
      console.log("Before adding:",sponser.walletAmount);
      sponser.totalLevelIncome += levelIncome;
      sponser.walletAmount += levelIncome;
      console.log("after total level income:",sponser.totalLevelIncome);

      console.log("after adding:",sponser.walletAmount);

        sponser.levelIncomeHistory.push({
          reportName: "Level Income ",
          name: userData.name,
          percentageCredited:"25%",
          Amount:amount,
          amountCredited: levelIncome,
          status: "Approved",
        });

        const updatedSponser=await sponser.save();
        console.log("updated wallet:",updatedSponser.walletAmount);
        console.log("updated total level income:",sponser.totalLevelIncome);

        console.log(`${updatedSponser.name} has credited level income ${levelIncome}`);
        if(updatedSponser){
         await franchiseIncomeGenerator(updatedSponser,levelIncome,"",0.05,0.08)
          userData=updatedSponser;
          amount=levelIncome;
        }
        }

  }



  export const franchiseIncomeGenerator=async(userData,amount,name,distPercentage,zonalPercentage)=>{
  console.log("-----------------------------------------------------------------------------------------------------------------");

  console.log("Reached in Franchise Income generator");
  console.log(`Reached user ${userData.name} amd Amount ${amount}`);
  console.log(distPercentage,zonalPercentage);

    const districtIncome=amount*distPercentage ;
    const zonalIncome=amount*zonalPercentage ;
    const distpers=distPercentage*100
    const zonalpers=zonalPercentage*100
    const districtId=userData.districtFranchise;
    const zonalId=userData.zonalFranchise;

    const districtData=await User.findById(districtId);
    const zonalData=await User.findById(zonalId);

    districtData.totalLevelIncome +=districtIncome;
    districtData.walletAmount+= districtIncome;
    districtData.levelIncomeHistory.push({
      reportName: "District Income",
      newMember:name,
      userID: userData.ownSponserId,
      Amount:amount,
      name: userData.name,
      percentageCredited:distpers,
      amountCredited: districtIncome,
      status: "Approved",
    });
    try {
      await districtData.save();
      console.log(`District franchise income credited to ${districtData.name} amount is ${districtIncome}`);
  } catch (error) {
      console.error("Error saving District data:", error);
  }

    zonalData.totalLevelIncome +=zonalIncome;
    zonalData.walletAmount += zonalIncome;
    zonalData.levelIncomeHistory.push({
      reportName: "Zonal Income",
      newMember:name,
      userID: userData.ownSponserId,
      Amount:amount,
      name: userData.name,
      percentageCredited:zonalpers,
      amountCredited: zonalIncome,
      status: "Approved",
    });

    try {
      await zonalData.save();
      console.log(`Zonal franchise income credited to ${zonalData.name} amount is ${zonalIncome}`);

  } catch (error) {
      console.error("Error saving District data:", error);
  }


  }
  



  //--------------------------------------------AutoPool functions--------------------------------------------------------------------





// export const setAutoPool = async (
//     sponser1,user
//   ) => {
//     if(sponser1.autoPoolStatus==="noPool"){
//         if(sponser1.isDistrictFranchise){
//           AutoPool.poolB.push(sponser1._id);
//            const updatedAutopool =await AutoPool.save();
//            if(updatedAutopool){
//             sponser1.autoPoolStatus="poolB"
//             await sponser1.save();
//             return;
//            }

//         }else if(sponser1.isZonalFranchise){
//           AutoPool.poolA.push(sponser1._id);
//           const updatedAutopool =await AutoPool.save();
//           if(updatedAutopool){
//            sponser1.autoPoolStatus="poolA"
//            await sponser1.save();
//            return;
//           }

//         }else{
        //   if (user.packageAmount >= 5000) {
        //     const poolAmount = user.packageAmount * 0.1;
        //     Admin.autoPoolWallet += poolAmount;
        //     Admin.autoPoolHistory.push({
        //         reportName: "AutoPool Wallet Income",
        //         userID: user.ownSponsorId,
        //         Amount: user.packageAmount,
        //         name: user.name,
        //         percentageCredited: "10%",
        //         amountCredited: poolAmount,
        //         status: "Approved",
        //     });
        
        //     try {
        //         await Admin.save();
        //         console.log("Admin data saved successfully.");
        //     } catch (error) {
        //         console.error("Error saving Admin data:", error);
        //     }
        // }
//           const directMembersCount=sponser1.childLevel1.length;
//           const teamMemberCount = await countTeamMembers(sponser1._id);
//           console.log("Team member count:", teamMemberCount);
//           if(directMembersCount===5){
//             AutoPool.poolA.push(sponser1._id);
//           const updatedAutopool =await AutoPool.save();
//           if(updatedAutopool){
//            sponser1.autoPoolStatus="poolA"
//            await sponser1.save();
//            return;
//           }
//           }else if(teamMemberCount===30){
//             AutoPool.poolA.push(sponser1._id);
//           const updatedAutopool =await AutoPool.save();
//           if(updatedAutopool){
//            sponser1.autoPoolStatus="poolA"
//            await sponser1.save();
//            return;
//           }
//           }
//         }
        
//     }
//     if(sponser1.autoPoolStatus==="poolA"){
//       if(sponser1.isDistrictFranchise){
//         AutoPool.poolB.push(sponser1._id);
//          const updatedAutopool =await AutoPool.save();
//          if(updatedAutopool){
//           sponser1.autoPoolStatus="poolB"
//           await sponser1.save();
//           return;
//          }

//       }else{
//         const directMembersCount=sponser1.childLevel1.length;
//         const teamMemberCount = await countTeamMembers(sponser1._id);
//         console.log("Team member count:", teamMemberCount);
//         if (directMembersCount === 10) {
//           try {
//             // Update poolB by pushing sponser1._id
//             AutoPool.poolB.push(sponser1._id);
        
//             // Update poolA by pulling sponser1._id
//             AutoPool.poolA.pull(sponser1._id);
        
//             // Save the updated AutoPool document
//             const updatedAutoPool = await AutoPool.save();
        
//             if (updatedAutoPool) {
//               // Update sponser1's autoPoolStatus to "poolB"
//               sponser1.autoPoolStatus = "poolB";
//               await sponser1.save();
//               return;
//             }
//           } catch (error) {
//             console.error("Error:", error);
//             // Handle error appropriately
//           }
//         }
//         else if(teamMemberCount===30){
//           AutoPool.poolB.push(sponser1._id);
//           AutoPool.poolA.pull(sponser1._id);
//         const updatedAutopool =await AutoPool.save();
//         if(updatedAutopool){
//          sponser1.autoPoolStatus="poolB"
//          await sponser1.save();
//          return;
//         }
//         }
//       }
      
//   }
//   if(sponser1.autoPoolStatus==="poolB"){
//       const directMembersCount=sponser1.childLevel1.length;
//       const teamMemberCount = await countTeamMembers(sponser1._id);
//       console.log("Team member count:", teamMemberCount);
//       if (directMembersCount === 15) {
//         try {
//           // Update poolB by pushing sponser1._id
//           AutoPool.poolC.push(sponser1._id);
      
//           // Update poolA by pulling sponser1._id
//           AutoPool.poolB.pull(sponser1._id);
      
//           // Save the updated AutoPool document
//           const updatedAutoPool = await AutoPool.save();
      
//           if (updatedAutoPool) {
//             // Update sponser1's autoPoolStatus to "poolB"
//             sponser1.autoPoolStatus = "poolC";
//             await sponser1.save();
//             return;
//           }
//         } catch (error) {
//           console.error("Error:", error);
//           // Handle error appropriately
//         }
//       }
//       else if(teamMemberCount===120){
//         AutoPool.poolC.push(sponser1._id);
//         AutoPool.poolB.pull(sponser1._id);
//       const updatedAutopool =await AutoPool.save();
//       if(updatedAutopool){
//        sponser1.autoPoolStatus="poolC"
//        await sponser1.save();
//        return;
//       }
//       }
    
    
// }


// if(sponser1.autoPoolStatus==="poolC"){
//   const directMembersCount=sponser1.childLevel1.length;
//   const teamMemberCount = await countTeamMembers(sponser1._id);
//   console.log("Team member count:", teamMemberCount);
//   if (directMembersCount === 20) {
//     try {
//       // Update poolB by pushing sponser1._id
//       AutoPool.poolD.push(sponser1._id);
  
//       // Update poolA by pulling sponser1._id
//       AutoPool.poolC.pull(sponser1._id);
  
//       // Save the updated AutoPool document
//       const updatedAutoPool = await AutoPool.save();
  
//       if (updatedAutoPool) {
//         // Update sponser1's autoPoolStatus to "poolB"
//         sponser1.autoPoolStatus = "poolD";
//         await sponser1.save();
//         return;
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       // Handle error appropriately
//     }
//   }
//   else if(teamMemberCount===240){
//     AutoPool.poolD.push(sponser1._id);
//     AutoPool.poolC.pull(sponser1._id);
//   const updatedAutopool =await AutoPool.save();
//   if(updatedAutopool){
//    sponser1.autoPoolStatus="poolD"
//    await sponser1.save();
//    return;
//   }
//   }


// }

// if(sponser1.autoPoolStatus==="poolD"){
//   const directMembersCount=sponser1.childLevel1.length;
//   const teamMemberCount = await countTeamMembers(sponser1._id);
//   console.log("Team member count:", teamMemberCount);
//   if (directMembersCount === 25) {
//     try {
//       // Update poolB by pushing sponser1._id
//       AutoPool.poolE.push(sponser1._id);
  
//       // Update poolA by pulling sponser1._id
//       AutoPool.poolD.pull(sponser1._id);
  
//       // Save the updated AutoPool document
//       const updatedAutoPool = await AutoPool.save();
  
//       if (updatedAutoPool) {
//         // Update sponser1's autoPoolStatus to "poolB"
//         sponser1.autoPoolStatus = "poolE";
//         await sponser1.save();
//         return;
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       // Handle error appropriately
//     }
//   }
//   else if(teamMemberCount===240){
//     AutoPool.poolE.push(sponser1._id);
//     AutoPool.poolD.pull(sponser1._id);
//   const updatedAutopool =await AutoPool.save();
//   if(updatedAutopool){
//    sponser1.autoPoolStatus="poolE"
//    await sponser1.save();
//    return;
//   }
//   }


// }

//   }

export const setAutoPool = async (sponser1,user) => {
  const adminData=await Admin.findOne();
  const { autoPoolStatus, childLevel1,childLevel2, _id } = sponser1;
  const { isDistrictFranchise, isZonalFranchise } = user;
  const directMembersCount = childLevel1.length;
  const teamMemberCount=childLevel2.length;
  // const teamMemberCount = await countTeamMembers(_id);
  // console.log("Team member count:", teamMemberCount);


  const updateAutoPool = async (newPool) => {
    try {
      await adminData.save();
      sponser1.autoPoolStatus = newPool;
      await sponser1.save();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (autoPoolStatus === "noPool") {
    if (isDistrictFranchise) {
      adminData.poolB.push(_id);
      await updateAutoPool("poolB");
    } else if (isZonalFranchise || directMembersCount === 5 || teamMemberCount === 30) {
      adminData.poolA.push(_id);
      await updateAutoPool("poolA");
    }
  } else if (autoPoolStatus === "poolA") {
    if (isDistrictFranchise || directMembersCount === 10 || teamMemberCount === 60) {
      adminData.poolB.push(_id);
      adminData.poolA.pull(_id);
      await updateAutoPool("poolB");
    }
  } else if (autoPoolStatus === "poolB") {
    if (directMembersCount === 15 || teamMemberCount === 120) {
      adminData.poolC.push(_id);
      adminData.poolB.pull(_id);
      await updateAutoPool("poolC");
    }
  } else if (autoPoolStatus === "poolC") {
    if (directMembersCount === 20 || teamMemberCount === 240) {
      adminData.poolD.push(_id);
      adminData.poolC.pull(_id);
      await updateAutoPool("poolD");
    }
  } else if (autoPoolStatus === "poolD") {
    if (directMembersCount === 25 || teamMemberCount === 240) {
      adminData.poolE.push(_id);
      adminData.poolD.pull(_id);
      await updateAutoPool("poolE");
    }
  }
};


export const addToAutoPoolWallet=async(user)=>{
  const adminData=await Admin.findOne();
    const poolAmount = user.packageAmount * 0.1;
    adminData.autoPoolWallet += poolAmount;
    adminData.autoPoolHistory.push({
        reportName: "AutoPool Wallet Income",
        userID: user.ownSponsorId,
        Amount: user.packageAmount,
        franchise:user.franchise,
        franchiseName:user.franchiseName,
        name: user.name,
        percentageCredited: "10%",
        amountCredited: poolAmount,
        status: "Approved",
    });
  
    try {
        await adminData.save();
        console.log("Admin data saved successfully.");
    } catch (error) {
        console.error("Error saving Admin data:", error);
    }
  
}




  // count of team members--function


  export const countTeamMembers = async (userId) => {
    try {
      // Find the user by userId
      const user = await User.findById(userId);
  
      // If user is not found or doesn't have any children, return 0
      if (!user || (!user.childLevel1 && !user.childLevel2)) {
        return 0;
      }
  
      // Initialize count to include the direct children
      let count = (user.childLevel1 ? user.childLevel1.length : 0) + (user.childLevel2 ? user.childLevel2.length : 0);
  
      // Recursively count team members for each child
      if (user.childLevel1) {
        for (const childId of user.childLevel1) {
          count += await countTeamMembers(childId);
        }
      }
      if (user.childLevel2) {
        for (const childId of user.childLevel2) {
          count += await countTeamMembers(childId);
        }
      }
  
      return count;
    } catch (error) {
      console.error("Error counting team members:", error);
      throw error;
    }
  };
  


  //promoters income generator

  export const generatePromotersIncome = async (amount,userData,promoterPercentage) => {
    const promoterIncome = amount * promoterPercentage;
    console.log(promoterPercentage);
    let promoterData;
    let percentage="2.5 %";
    if(promoterPercentage===0.04){
      percentage="4%"
       promoterData = await User.find({ isPromoter: true }).limit(2);
    }else{
      promoterData = await User.find({ isPromoter: true })
    }
    // Find all promoters

    // Loop through each promoter and update data
    for (const promoter of promoterData) {
        promoter.totalLevelIncome += promoterIncome;
        promoter.walletAmount += promoterIncome;
        promoter.levelIncomeHistory.push({
            reportName: "Promoter Income",
            userID: userData.ownSponserId,
            name: userData.name,
            percentageCredited:percentage,
            amountCredited: promoterIncome,
            status: "Approved",
        });

        try {
            await promoter.save();
            console.log("Promoter data saved successfully.");
        } catch (error) {
            console.error("Error saving Promoter data:", error);
        }
    }
}

//add and autoPoolPercentage

export const addPoolPercentage=async(req,res,next)=>{
  try {
    const adminId = req.admin._id;

    const adminData = await Admin.findById(adminId);
    if(!adminData){
      return next(errorHandler(401, "Admin not found"));
    }
    const {
      autoPoolPercentageA,
      autoPoolPercentageB,
      autoPoolPercentageC,
      autoPoolPercentageD,
      autoPoolPercentageE
    } = req.body;

    adminData.autoPoolPercentageA = autoPoolPercentageA || adminData.autoPoolPercentageA;
    adminData.autoPoolPercentageB = autoPoolPercentageB || adminData.autoPoolPercentageB;
    adminData.autoPoolPercentageC = autoPoolPercentageC || adminData.autoPoolPercentageC;
    adminData.autoPoolPercentageD = autoPoolPercentageD || adminData.autoPoolPercentageD;
    adminData.autoPoolPercentageE = autoPoolPercentageE || adminData.autoPoolPercentageE;



    const updatedAdminData = await adminData.save();

    if(updatedAdminData){
      return res.status(200).json({
        updatedAdminData,
          sts: "01",
          msg: "Percentage data updated successfully",
        });
    }

    
  } catch (error) {
    next(error)
  }
}






// distribute autopool wallet


export const distributeAutoPoolWallet = async (req,res,next) => {
  try {
  const adminId = req.admin._id;

    const adminData = await Admin.findById(adminId);
    if(!adminData){
      return next(errorHandler(401, "Admin not found"));
    }
    const autoPoolWalletAmount = adminData.autoPoolWallet;
    const {
      autoPoolPercentageA,
      autoPoolPercentageB,
      autoPoolPercentageC,
      autoPoolPercentageD,
      autoPoolPercentageE
    } = adminData; // Get percentages for each pool
    console.log(autoPoolPercentageA,
      autoPoolPercentageB,
      autoPoolPercentageC,
      autoPoolPercentageD,
      autoPoolPercentageE);
    // Calculate amounts for each pool
    const amountPoolA = (autoPoolWalletAmount * autoPoolPercentageA) / 100;
    const amountPoolB = (autoPoolWalletAmount * autoPoolPercentageB) / 100;
    const amountPoolC = (autoPoolWalletAmount * autoPoolPercentageC) / 100;
    const amountPoolD = (autoPoolWalletAmount * autoPoolPercentageD) / 100;
    const amountPoolE = (autoPoolWalletAmount * autoPoolPercentageE) / 100;
console.log(amountPoolA,
  amountPoolB,
  amountPoolC,
  amountPoolD,
  amountPoolE);
    // Distribute amounts to users in each pool
    const poolACount=await distributeToPool(adminData.poolA, amountPoolA,autoPoolPercentageA);
    const poolBCount=await distributeToPool(adminData.poolB, amountPoolB,autoPoolPercentageB);
    const poolCCount=await distributeToPool(adminData.poolC, amountPoolC,autoPoolPercentageC);
    const poolDCount=await distributeToPool(adminData.poolD, amountPoolD,autoPoolPercentageD);
    const poolECount=await distributeToPool(adminData.poolE, amountPoolE,autoPoolPercentageE);
console.log(poolACount,poolBCount,poolCCount,poolDCount,poolECount);
    // Reset autoPoolWallet amount after distribution
    adminData.autoPoolDistributionHistory.push({
      reportName: "autoPoolDistributionHistory",
      distributedAmount:autoPoolWalletAmount,
      amountpoolA: amountPoolA,
      countInPoolA:poolACount,
      amountpoolB: amountPoolB,
      countInPoolB:poolBCount,
      amountpoolC: amountPoolC,
      countInPoolC:poolCCount,
      amountpoolD: amountPoolD,
      countInPoolD:poolDCount,
      amountpoolE: amountPoolE,
      countInPoolE:poolECount,
      status: "Approved",
    })
    adminData.totalPaidPoolAmount+=autoPoolWalletAmount
    adminData.autoPoolWallet = 0;
    const updatedAdmin=await adminData.save();
    if(updatedAdmin){
      res.status(200).json({
        updatedAdmin,
          sts: "01",
          msg: "AutoPool Distribution successfully",
        });
    }
    console.log("Auto pool wallet distributed successfully.");
  } catch (error) {
    next(error)
  }
};

const distributeToPool = async (poolUsers, amount,percentage) => {
  console.log("Reached calculation");
  const numUsers = poolUsers.length>0?poolUsers.length:0;
  const amountPerUser = amount / (numUsers+1);
  for (const userId of poolUsers) {
    try {
      const user = await User.findById(userId);
      if (user) {
        console.log(user.name);
        // Update user's wallet amount
        user.walletAmount += amountPerUser;
        user.totalAutoPoolIncome+=amountPerUser;
        // Add transaction to user's history
        user.autoPoolIncomeHistory.push({
          reportName: "Auto Pool Distribution",
          Amount:amount,
          designation:user.autoPoolStatus,
          percentageCredited:percentage,
          amountCredited: amountPerUser,
          status: "Approved",
        });
        await user.save();
      }
    } catch (error) {
      console.error("Error distributing to pool users:", error);
    }
  }
  return numUsers
};
