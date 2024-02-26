import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:String,
username: String,
password: String,
childLevel1: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
childLevel2: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

});
      
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;