// import User from "../models/userModel";





// export const addUser = async (req, res, next) => {
//     try {
//         const sponserAdmin=req.admin._id;
//       const sponser = req.user._id;


//       const userStatus = "pending";
  
//       const sponserData = await User.findById(sponser);
//       const sponserName = sponserData.username;
//       const ownSponserId = generateRandomString();
  
//       const { username, email, phone, address, transactionPassword, password } =
//         req.body;
  
//       // const packageChosen = findPackage(packageAmount);
//       // const packageData = await Package.findOne({ name: packageChosen });
//       const hashedPassword = bcryptjs.hashSync(password, 10);
//       const hashedTxnPassword = bcryptjs.hashSync(transactionPassword, 10);
  
//       const existingUser = await User.findOne({ email });
//       const existingUserByPhone = await User.findOne({ phone });
  
//       if (existingUser || existingUserByPhone) {
//         return next(errorHandler(401, "User Already Exist"));
//       }
  
//       const user = await User.create({
//         sponser,
//         sponserName,
//         username,
//         email,
//         phone,
//         address,
//         transactionPassword: hashedTxnPassword,
//         password: hashedPassword,
//         ownSponserId,
//         userStatus,
//       });
//       if (user) {
//         await sendMail(
//           user.email,
//           // packageChosen,
//           // packageAmount,
//           user.username,
//           user.ownSponserId,
//           transactionPassword,
//           password
//         );
  
//         res.status(200).json({
//           _id: user._id,
//           sponser: user.sponser,
//           sponserName: user.sponserName,
//           name: user.username,
//           email: user.email,
//           phone: user.phone,
//           address: user.address,
  
//           ownSponserId: user.ownSponserId,
//           earning: user.earning,
//           userStatus: user.userStatus,
//         });
//       } else {
//         return next(errorHandler(400, "Registration failed. Please try again!"));
//       }
//     } catch (error) {
//       next(error);
//     }
//   };