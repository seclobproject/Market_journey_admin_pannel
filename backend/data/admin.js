import bcrypt from "bcryptjs";


const admin = {
    name:"Admin",
    username: 'admin@gmail.com',
    password: bcrypt.hashSync("admin123", 10),
    isAdmin:true
};

export default admin;
