


//generate referal income for all

import Admin from "../models/adminModel.js";
import AutoPool from "../models/autopoolModel.js";
import User from "../models/userModel.js";

export const generateReferalIncome = async (
    sponser1,
    sponser2,
   updatedUser
  ) => {
        const directReferalIncome = updatedUser.packageAmount * 0.10;
      const inDirectReferalIncome =updatedUser.packageAmount * 0.05;
      if (sponser1.isAdmin==false) {
        console.log("Reached admin");
        const totalDirectRaferal = sponser1.directReferalIncome + directReferalIncome;
        sponser1.directReferalIncome = totalDirectRaferal;
        sponser1.walletAmount = sponser1.walletAmount + directReferalIncome;
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
        if(updatedSponser1.isMobileFranchise)levelIncomeGenerator(sponser1,directReferalIncome)
        
          franchiseIncomeGenerator(sponser1,sponser1.packageAmount)
        
      }
      if(sponser2&&sponser2.isAdmin==false){
        const totalInDirectRaferal = sponser2.inDirectReferalIncome + inDirectReferalIncome;
        sponser2.inDirectReferalIncome = totalInDirectRaferal;
        sponser2.walletAmount = sponser2.walletAmount + inDirectReferalIncome;
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
        if(updatedSponser2.isMobileFranchise)levelIncomeGenerator(sponser2,sponser2.packageAmount)

          franchiseIncomeGenerator(sponser2,sponser2.packageAmount)
        
      }
  
      
  
  };



  const levelIncomeGenerator=async (userData,amount)=>{
    while(amount>=10){
      const sponser=await User.findById(userData.sponser)
      if (!sponser.isMobileFranchise)break;
      const levelIncome=amount*0.25;
      const totallevelIncome = sponser.totalLevelIncome + levelIncome;
      sponser.totalLevelIncome = totallevelIncome;
      sponser.walletAmount = sponser.walletAmount + levelIncome;
        sponser.levelIncomeHistory.push({
          reportName: "Level Income ",
          name: userData.name,
          percentageCredited:"25%",
          amountCredited: levelIncome,
          status: "Approved",
        });
        const updatedSponser=await sponser.save();
        if(updatedSponser){
          franchiseIncomeGenerator(updatedSponser,levelIncome)
          userData=updatedSponser;
          amount=levelIncome;
        }
        }

  }



  const franchiseIncomeGenerator=async(userData,amount)=>{
    const districtIncome=amount*0.05;
    const zonalIncome=amount*0.08;

    const districtId=userData.districtFranchise;

    const zonalId=userData.zonalFranchise;
    const districtData=await User.findById(districtId);
    const zonalData=await User.findById(zonalId);
    districtData.totalLevelIncome = districtData.totalLevelIncome+districtIncome;
    districtData.walletAmount = districtData.walletAmount + districtIncome;
    districtData.levelIncomeHistory.push({
      reportName: "District Income",
      userID: userData.ownSponserId,
      Amount:amount,
      name: userData.name,
      percentageCredited:"5%",
      amountCredited: districtIncome,
      status: "Approved",
    });
    try {
      await districtData.save();
      console.log("District data saved successfully.");
  } catch (error) {
      console.error("Error saving District data:", error);
  }

    zonalData.totalLevelIncome = zonalData.totalLevelIncome+zonalIncome;
    zonalData.walletAmount = zonalData.walletAmount + zonalIncome;
    zonalData.levelIncomeHistory.push({
      reportName: "Zonal Income",
      userID: userData.ownSponserId,
      Amount:amount,
      name: userData.name,
      percentageCredited:"8%",
      amountCredited: zonalIncome,
      status: "Approved",
    });

    try {
      await zonalData.save();
      console.log("District data saved successfully.");
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
  console.log("Team member count:", teamMemberCount);


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
  console.log(adminData);
    const poolAmount = user.packageAmount * 0.1;
    adminData.autoPoolWallet += poolAmount;
    adminData.autoPoolHistory.push({
        reportName: "AutoPool Wallet Income",
        userID: user.ownSponsorId,
        Amount: user.packageAmount,
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
  