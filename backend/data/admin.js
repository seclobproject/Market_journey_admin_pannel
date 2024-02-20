import bcrypt from "bcryptjs";


const admin = {
    username: 'admin@gmail.com',
    password: bcrypt.hashSync("admin123", 10),
};

export default admin;
