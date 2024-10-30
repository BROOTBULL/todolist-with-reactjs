import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    data:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"TodoProjects"
    }],
    dataToday:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"TodayTaskList"
    }]

},{timestamps:true});

export const User=mongoose.model("User",userSchema);