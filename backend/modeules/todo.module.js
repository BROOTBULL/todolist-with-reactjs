import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    priority:Number,
    dueDate:{
        type:String,
        default:Date.now
    },
  },{timestamps:true}
);
  
  const sectionSchema=new mongoose.Schema({
    sectionName:String,
    tasks:[taskSchema]
  },{timestamps:true}
)
  
  const projectSchema=new mongoose.Schema({
    projectName:String,
    sections:[sectionSchema],
    time:{
      type:Date,
      default:Date.now
  },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },{timestamps:true}
)
  
  export const TodoProjects = mongoose.model("TodoTask", projectSchema);