import connectDB from "./config/dbConnect.js";

import admin from "./data/admin.js";
import promoters from "./data/promoters.js";
import Admin from "./models/adminModel.js";
import User from "./models/userModel.js";

await connectDB();

const importData = async () => {
  try {
    await Admin.deleteMany();
    await User.deleteMany();

    const createdAdmin = await Admin.insertMany(admin);
    const createdPromoters = await User.insertMany(promoters);

    console.log("Data cleared and Imported");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-id") {
  destroyData();
} else {
  importData();
}
