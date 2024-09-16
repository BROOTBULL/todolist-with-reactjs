import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    time: String,
  });
  
  const sectionSchema=new mongoose.Schema({
    sectionName:String,
    tasks:[taskSchema]
  })
  
  const projectSchema=new mongoose.Schema({
    projectName:String,
    sections:[sectionSchema],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  })
  
  export const TodoProjects = mongoose.model("TodoTask", projectSchema);