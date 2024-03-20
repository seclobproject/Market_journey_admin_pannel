


//generate referal income for all

import User from "../models/userModel.js";

export const generateReferalIncome = async (
    sponser1,
    sponser2,
   updatedUser
  ) => {
        const directReferalIncome = updatedUser.packageAmount * 0.10;
      const inDirectReferalIncome =updatedUser.packageAmount * 0.05;
      const districtIncome = updatedUser.packageAmount * 0.8;
      if (sponser1) {
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
        if(updatedSponser1){
          levelIncomeGenerator(sponser1,directReferalIncome)
          franchiseIncomeGenerator(sponser1,districtIncome,inDirectReferalIncome)
        }
      }
      if(sponser2){
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
        if(updatedSponser2)levelIncomeGenerator(sponser2,inDirectReferalIncome)
  
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
          userData=updatedSponser;
          amount=levelIncome;
        }
        }

  }



  const franchiseIncomeGenerator=async(userData,districtIncome,zonalIncome)=>{
    const districtId=userData.districtFranchise;
    const zonalId=userData.zonalFranchise;

    const districtData=await User.findById(districtId);
    const zonalData=await User.findById(zonalId);

    districtData.directReferalHistory.push({
      reportName: "DirectIncome for Franchise",
      userID: updatedUser.ownSponserId,
      franchise:updatedUser.franchise,
      name: updatedUser.name,
      percentageCredited:"10%",
      amountCredited: directReferalIncome,
      status: "Approved",
    });



  }
  