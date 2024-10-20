import { TodoProjects } from "../modeules/todo.module.js";



export const getTasks=async(req,res)=>{
    const userId=req.userId;
    const projectName=req.params.project;
    const sectionName=req.params.section;


  try {
    const list = await TodoProjects.findOne({ projectName:projectName,owner:userId });
    if (!list) {
      return res.status(404).send("TodoProjects not found"); 
    }
    const section = list.sections.find(sec => sec.sectionName === sectionName);
    const tasks=section.tasks;

    if (section) {
      res.status(200).json(tasks);
    } else {
      return res.status(404).send("Section not found"); // Handle case where section is not found
    }
  } catch (err) {
    console.error("Error fetching tasks:", err); // Log the error
    res.status(500).send("Error fetching tasks"); // Send error response with status code 500
  }
}

export const postTasks=async(req,res)=>{
    const userId=req.userId;
    const projectName=req.params.project;
    const sectionName=req.params.section;


    try {

        const tasklist = req.body; // { title: '1', description: '1' }
        console.log("Received tasklist:", tasklist);

        const list = await TodoProjects.findOne({ projectName:projectName,owner:userId });

        if (!list) {
        return res.status(404).send("TodoProjects not found"); 
        }
        const section = list.sections.find(sec => sec.sectionName === sectionName); 

        if (section) {
        section.tasks.push(tasklist);
        } else {
        return res.status(404).send("Section not found"); 
        }

        await list.save(); // Save the updated TodoProjects document

        console.log("Task saved successfully");
        res.status(201).send("Task saved successfully"); // Send success response with status code 201
    } catch (err) {
        console.error("Error saving task:", err);
        res.status(500).send("Error saving task"); // Send error response with status code 500
    }
}

export const putTasks=async(req,res)=>{
    const userId=req.userId;
    const id = req.params.id;
    const projectName =req.params.project;
    const sectionName =req.params.section;
    console.log("put:", req.body);
    
    try {
        const list = await TodoProjects.findOne({ projectName:projectName,owner:userId });

        if (!list) {
        return res.status(404).send("TodoProjects not found"); 
        }

        const section = list.sections.find(sec => sec.sectionName === sectionName);

        if (!section) {
        return res.status(404).send("Section not found"); 
        }

        const taskIndex = section.tasks.findIndex(task => task._id.toString() === id);

        if (taskIndex === -1) {
        return res.status(404).send('Task not found');
        }

        section.tasks[taskIndex] = { ...section.tasks[taskIndex]._doc, ...req.body };
        await list.save();

        res.send(section.tasks[taskIndex]);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send('Internal Server Error');
    }
}

export const deleteTasks=async(req,res)=>{
    const userId=req.userId;
    const id = req.params.id;
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
        const task = section.tasks.id(id);

        if (!task) {
        return res.status(404).send('Task not found');
        }
        task.deleteOne(); 
        await list.save();

        res.send({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send('Internal Server Error');
    }
}