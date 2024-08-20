const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors=require("cors");

const app = express();
const url =
  "mongodb+srv://arjit0228:002611Ar*@arjitgupta.qra2q.mongodb.net/Mylist?retryWrites=true&w=majority&appName=ArjitGuptas";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

async function connectToMongo() {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB server");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
connectToMongo();

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
  sections:[sectionSchema]
})

const TodoWebsite = mongoose.model("TodoTask", projectSchema);


app.post("/projects", async (req, res) => {
  try {
    const ProjectName = req.body; // {projectName:"value"}
    console.log("Received tasklist:", ProjectName);

const project =new TodoWebsite(ProjectName);
project.sections.push({sectionName:"Routiens",tasks:[]})
    await project.save(); // Save the updated TodoWebsite document

    console.log("project saved successfully");
    res.status(201).send("project saved successfully"); // Send success response with status code 201
  } catch (err) {
    console.error("Error saving task:", err);
    res.status(500).send("Error saving task"); // Send error response with status code 500
  }
});



app.get("/projects", async (req, res) => {
  try {
    const list = await TodoWebsite.find();
    res.status(200).json(list);

  } catch (err) {
    console.error("Error fetching tasks:", err); // Log the error
    res.status(500).send("Error fetching tasks"); // Send error response with status code 500
  }
});



 app.post("/", async (req, res) => {
  try {
    const tasklist = req.body; // { title: '1', description: '1' }
    console.log("Received tasklist:", tasklist);

    const list = await TodoWebsite.findOne({ projectName: "HomeWork" });

    if (!list) {
      return res.status(404).send("TodoWebsite not found"); 
    }
    const section = list.sections.find(sec => sec.sectionName === "Work"); 

    if (section) {
      section.tasks.push(tasklist);
    } else {
      return res.status(404).send("Section not found"); 
    }

    await list.save(); // Save the updated TodoWebsite document

    console.log("Task saved successfully");
    res.status(201).send("Task saved successfully"); // Send success response with status code 201
  } catch (err) {
    console.error("Error saving task:", err);
    res.status(500).send("Error saving task"); // Send error response with status code 500
  }
});

app.post("/:project", async (req, res) => {
  try {
    const projectName = req.params.project; // Extract the project name from params   important
    const sections = req.body; // Extract the sections from the request body

    const list = await TodoWebsite.findOne({ projectName: projectName });

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
});


app.get("/", async (req, res) => {
  try {
    const list = await TodoWebsite.findOne({ projectName: "HomeWork" });
    if (!list) {
      return res.status(404).send("TodoWebsite not found"); 
    }
    const section = list.sections.find(sec => sec.sectionName === "Work");
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
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  console.log("put:", req.body);
  
  try {
    const list = await TodoWebsite.findOne({ projectName: "HomeWork" });

    if (!list) {
      return res.status(404).send("TodoWebsite not found"); 
    }

    const section = list.sections.find(sec => sec.sectionName === "Work");

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
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const list = await TodoWebsite.findOne({ projectName: "HomeWork" });
    if (!list) {
      return res.status(404).send("TodoWebsite not found");
    }
    const section = list.sections.find(sec => sec.sectionName === "Work");

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
});



app.listen(3000, () => {
  console.log("Server started on port 3000");
});