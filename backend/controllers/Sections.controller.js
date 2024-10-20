import { TodoProjects } from "../modeules/todo.module.js";


export const getSections=async(req,res)=>{
    try {
        const userId=req.userId;
        const projectName = req.params.projectName; // Extract the project name from params   important

        const project =await TodoProjects.findOne({projectName:projectName,owner:userId});
        
    
        if (!project) {
          return res.status(404).send("Project not found");
        }
        
        res.status(200).json(project.sections);
    
      } catch (err) {
        console.error("Error updating tasks:", err); // Log the error
        res.status(500).send("Error updating tasks"); // Send error response with status code 500
      }
}

export const postSections=async (req,res)=>{
    try {
        const userId=req.userId;
        const projectName = req.params.project; // Extract the project name from params   important
        const sections = req.body; // Extract the sections from the request body
    
        const list = await TodoProjects.findOne({ projectName:projectName,owner:userId });
    
        if (!list) {
          return res.status(404).send("Project not found");
        }
    
        list.sections.push(sections);
    
        await list.save();
    
        res.status(200).json(list);
    
      } catch (err) {
        console.error("Error updating tasks:", err); // Log the error
        res.status(500).send("Error updating tasks"); // Send error response with status code 500
      }
}

export const putSections=async(req,res)=>{
      const userId=req.userId;
      const EditsectionName=req.body.sectionName;
      const projectName =req.params.project;
      const sectionName =req.params.section;
      console.log("put:", req.body.sectionName);
      
      try {
        const list = await TodoProjects.findOne({ projectName:projectName,owner:userId });
    
        if (!list) {
          return res.status(404).send("TodoProjects not found"); 
        }
    
        const section = list.sections.find(sec => sec.sectionName === sectionName);
    
        if (!section) {
          return res.status(404).send("Section not found"); 
        }
    
        section.sectionName = EditsectionName;
        await list.save();
    
        res.send(section.sectionName);
      } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send('Internal Server Error');
      }
}

export const deleteSections=async(req,res)=>{
      const userId=req.userId;
      const projectName =req.params.project;
      const sectionName =req.params.section;
    
      try {
        const list = await TodoProjects.findOne({ projectName:projectName,owner:userId });
        if (!list) {
          return res.status(404).send("TodoProjects not found");
        }
        const section = list.sections.find(sec => sec.sectionName === sectionName);
    
        if (!section) {
          return res.status(404).send("Section not found");
        }
        section.deleteOne(); 
        await list.save();
    
        res.send({ message: 'Task deleted successfully' });
      } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send('Internal Server Error');
      }
}