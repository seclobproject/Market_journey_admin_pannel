import mongoose from "mongoose";

const liveNewsSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  news: {
    type: String,
    required: true,
  },
  
},
{
    timestamps: true,
  });

const LiveNews = mongoose.model("LiveNews", liveNewsSchema);

export default LiveNews;
