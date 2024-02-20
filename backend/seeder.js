import connectDB from "./config/dbConnect.js";

import admin from "./data/admin.js";
import Admin from "./models/adminModel.js";

await connectDB();

const importData = async () => {
  try {
    await Admin.deleteMany();

    const createdAdmin = await Admin.insertMany(admin);
    console.log("Data cleared");
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
