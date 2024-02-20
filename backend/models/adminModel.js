import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
username: String,
password: String // You should use proper password hashing here
});
      
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;