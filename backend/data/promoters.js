import bcrypt from "bcryptjs";
const promoters = [
  {
    sponser: null,
    userStatus:"approved",
    name: "Jamsheed P",
    phone:8590192424,
    sponserName:"Admin",
    email: "jamsheedcalicut33@gmail.com",
    address:"Peringadakatt (H), Kundayithode, Po.kolathara",
    franchise:"Mobile Franchise",
    packageType:"Franchise",
    packageAmount:5000,
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    isPromoter:true,
    isMobileFranchise:true,
    ownSponserId: "MJ561054",
  },
  {
    sponser: null,
    userStatus:"approved",
    name: "Abdulla",
    phone:8089530707,
    sponserName:"Admin",
    packageType:"Franchise",
    email: "marketjourneytradingcafe@gmail.com",
    address:" Marakkar  (H),Azhinjilam,Po.Azhinjilam,Pin:673632",
    franchise:"Mobile Franchise",
    packageAmount:5000,
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    isPromoter:true,
    isMobileFranchise:true,
    ownSponserId: "MJ491054",
  },
  {
    sponser: null,
    userStatus:"approved",
    name: "ABDUL AHAD",
    phone:7034447035,
    sponserName:"Admin",
    packageType:"Franchise",
    email: "abdulahadmunna707@gmail.com",
    address:"Pulikkal (H),Azhinjilam,Po.Azhinjilam,Pin:673632",
    franchise:"Mobile Franchise",
    packageAmount:5000,
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    isPromoter:true,
    isMobileFranchise:true,
    ownSponserId: "MJ466554",
  },
];
export default promoters;