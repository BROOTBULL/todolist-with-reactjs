import { TodoProjects } from "../modeules/todo.module.js";
import { User } from "../modeules/user.module.js";


export const getProjects= async(req,res)=>{
    try { 
        const userId=req.userId;
        
        if(userId)
        {
            const projectNamelist= await TodoProjects.find({owner:userId})

         if(projectNamelist)
         {   res.status(200).json(projectNamelist);}
        }
      } catch (err) {
        console.error("Error fetching Projects:", err); // Log the error
        res.status(500).send("Error fetching Projects"); // Send error response with status code 500
      }
}

export const postProjects= async(req,res)=>{
  
    try {
        
        const userId=req.userId;
        const {projectName}=req.body;
        const user=await User.findOne({_id:userId});
        

        if(user)
        {

        const projects =new TodoProjects({projectName:projectName,owner:userId});
        projects.sections.push({sectionName:"Routiens",tasks:[{title:"Task title",description:"Task descriptions ..."}]})
        await projects.save();

        user.data.push(projects);
        user.save();

        res.status(201).send("project saved successfully"); // Send success response with status code 201

        }
      } catch (err) {
        console.error("Error saving task:", err);
        res.status(500).send("Error saving task"); // Send error response with status code 500
      }

}

export const deleteProjects=async (req,res)=>{
  const userId=req.userId;
  const projectName =req.params.project;

  try {
      await TodoProjects.deleteOne({owner:userId,projectName:projectName});
      res.send("successfully");
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).send('Internal Server Error');
  }

}