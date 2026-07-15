
import mongoose from "mongoose";
const aiLogSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    role :{
        type : String,
        default : "USER",
    },
    action:String,

    
},{timestamps : true})

aiLogSchema.index({ createdAt: -1 });
aiLogSchema.index({ userId: 1 });

const AILog =
  mongoose.models.AILog || mongoose.model("AILog", aiLogSchema);
 export default AILog;
