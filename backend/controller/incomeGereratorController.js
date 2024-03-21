


//generate referal income for all

import User from "../models/userModel.js";

export const generateReferalIncome = async (
    sponser1,
    sponser2,
   updatedUser
  ) => {
        const directReferalIncome = updatedUser.packageAmount * 0.10;
      const inDirectReferalIncome =updatedUser.packageAmount * 0.05;
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
        if(updatedSponser1.isMobileFranchise){
          levelIncomeGenerator(sponser1,directReferalIncome)
          franchiseIncomeGenerator(sponser1,sponser1.packageAmount)
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
        if(updatedSponser2.isMobileFranchise){
          levelIncomeGenerator(sponser2,sponser2.packageAmount)
          franchiseIncomeGenerator(sponser2,sponser2.packageAmount)
        }
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


  }
  