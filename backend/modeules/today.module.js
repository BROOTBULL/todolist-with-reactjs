import mongoose from "mongoose"

const todaySchema=new mongoose.Schema({
    title:String,
    description:String,
    project:String,
    section:String,
    priority:Number,
    dueDate:{
        type:String,
        default:Date.now
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

})
export const TodayTaskList = mongoose.model("TodayTask", todaySchema);
