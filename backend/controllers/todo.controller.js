import { TodoProjects } from "../modeules/todo.module.js";
import { User } from "../modeules/user.module.js";


export const getProjects= async(req,res)=>{
    try {
        const userId=req.params.userId;

        if(userId)
        {
            const projectNamelist= await TodoProjects.find({owner:userId})

         if(projectNamelist)
         {   res.status(200).json(projectNamelist);}
        }
      } catch (err) {
        console.error("Error fetching tasks:", err); // Log the error
        res.status(500).send("Error fetching tasks"); // Send error response with status code 500
      }
}

export const postProjects= async(req,res)=>{
  
    try {
        
        const userId=req.params.userId;
        const {projectName}=req.body;
        const user=await User.findOne({_id:userId});
        console.log("user===>",user);
        

        if(user)
        {

        const projects =new TodoProjects({projectName:projectName,owner:userId});
        projects.sections.push({sectionName:"Routiens",tasks:[{title:"Task tittle",description:"Task descriptions ..."}]})
        await projects.save();

        user.data.push(projects);
        user.save();
        console.log("user===>",user);

        res.status(201).send("project saved successfully"); // Send success response with status code 201

        }
      } catch (err) {
        console.error("Error saving task:", err);
        res.status(500).send("Error saving task"); // Send error response with status code 500
      }

}