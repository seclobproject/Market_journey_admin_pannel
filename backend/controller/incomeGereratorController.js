


//generate referal income for all

export const generateReferalIncome = async (
    sponser1,
    sponser2,
   updatedUser
  ) => {
      if(updatedUser.isDistrictFranchise||updatedUser.isZonalFranchise){
        const directReferalIncome = updatedUser.packageAmount * 0.10;
      const inDirectReferalIncome =updatedUser.packageAmount * 0.05;
  
      if (sponser1) {
        const totalDirectRaferal = sponser1.directReferalIncome + directReferalIncome;
        sponser1.directReferalIncome = totalDirectRaferal;
        sponser1.walletAmount = sponser1.walletAmount + totalDirectRaferal;
        sponser1.directReferalHistory.push({
          reportName: "DirectIncome for Franchise",
          userID: updatedUser.ownSponserId,
          franchise:updatedUser.franchise,
          name: updatedUser.name,
          percentageCredited:"10%",
          amountCredited: directReferalIncome,
          status: "Approved",
        });
        levelIncomeGenerator(sponser1,directReferalIncome)
      }
      if(sponser2){
        const totalInDirectRaferal = sponser2.inDirectReferalIncome + inDirectReferalIncome;
        sponser2.inDirectReferalIncome = totalInDirectRaferal;
        sponser2.walletAmount = sponser2.walletAmount + totalInDirectRaferal;
        sponser2.inDirectReferalHistory.push({
          reportName: "inDirectIncome for Franchise",
          userID: updatedUser.ownSponserId,
          franchise:updatedUser.franchise,
          name: updatedUser.name,
          percentageCredited:"5%",
          amountCredited: inDirectReferalIncome,
          status: "Approved",
        });
  
      }
  
      }
      const directReferalIncome = updatedUser.packageAmount * 0.20;
      const inDirectReferalIncome =updatedUser.packageAmount * 0.05;
      if (sponser1) {
        const totalDirectRaferal = sponser1.directReferalIncome + directReferalIncome;
        sponser1.directReferalIncome = totalDirectRaferal;
        sponser1.walletAmount = sponser1.walletAmount + totalDirectRaferal;
      }
      if(sponser2){
        const totalInDirectRaferal = sponser2.inDirectReferalIncome + inDirectReferalIncome;
        sponser1.inDirectReferalIncome = totalInDirectRaferal;
        sponser2.walletAmount = sponser2.walletAmount + totalInDirectRaferal;
      }
        sponserData.directReferalHistory.push({
          reportName: "DirectIncome",
          userID: userData.ownSponserId,
          name: userData.username,
          amountCredited: referalIncome,
          transactionCode: transactionCode,
          status: "Approved",
        });
        const updatedSponser = await sponserData.save();
        if (updatedSponser) {
          return totalRaferal;
        }
      
  
  };



  const levelIncomeGenerator=(userData,amount)=>{
    while(amount>=10){
      console.log(userData);
    }

  }