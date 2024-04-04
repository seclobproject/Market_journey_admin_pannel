import mongoose from "mongoose";

const demateSchema = new mongoose.Schema({
    sponser:{
        type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      },
      sponserName:{
        type: String,
      },
  name: {
    type: String,
    required: true,
  },   
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  demateUserName: {
    type: String,
    required: true,
  },
  status: {
    type: String
  },
  
  

},  {
    timestamps: true,
  });

const Demate = mongoose.model("Demate", demateSchema);

export default Demate;
