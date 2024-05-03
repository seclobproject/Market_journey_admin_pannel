import bcrypt from "bcryptjs";


const admin = {
    name:"Admin",
    username: 'admin@gmail.com',
    address:"1st floor ,Hibon plaza,Mavoor road, Calicut,673004",
    password: bcrypt.hashSync("admin123", 10),
    isAdmin:true
};

export default admin;
