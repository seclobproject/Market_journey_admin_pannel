import bcrypt from "bcryptjs";
const promoters = [
  {
    sponser: null,
    userStatus:"approved",
    name: "Promoter1",
    phone:9852416378,
    sponserName:"Admin",
    email: "promoter1@gmail.com",
    address:"Market journey promoter",
    franchise:"Mobile Franchise",
    packageType:"Franchise",

packageAmount:80000,
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    isPromoter:true,
    isMobileFranchise:true,
    ownSponserId: "MJ561054",
  },
  {
    sponser: null,
    userStatus:"approved",
    name: "Promoter2",
    phone:9822916358,
    sponserName:"Admin",
    packageType:"Franchise",
    email: "promoter2@gmail.com",
    address:"Market journey promoter",
    franchise:"Mobile Franchise",
    packageAmount:80000,
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    isPromoter:true,
    isMobileFranchise:true,
    ownSponserId: "MJ491054",
  },
  {
    sponser: null,
    userStatus:"approved",
    name: "Promoter3",
    phone:9962416398,
    sponserName:"Admin",
    packageType:"Franchise",
    email: "promoter3@gmail.com",
    address:"Market journey promoter",
    franchise:"Mobile Franchise",
    packageAmount:80000,
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    isPromoter:true,
    isMobileFranchise:true,
    ownSponserId: "MJ466554",
  },
];
export default promoters;