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

const TodoList = mongoose.model("TodoTask", projectSchema);


 app.post("/", async (req, res) => {
  try {
    const tasklist = req.body; // { title: '1', description: '1' }
    console.log("Received tasklist:", tasklist);

    const list = await TodoList.findOne({ projectName: "HomeWork" });

    if (!list) {
      return res.status(404).send("TodoList not found"); 
    }
    const section = list.sections.find(sec => sec.sectionName === "Work"); 

    if (section) {
      section.tasks.push(tasklist);
    } else {
      return res.status(404).send("Section not found"); 
    }

    await list.save(); // Save the updated TodoList document

    console.log("Task saved successfully");
    res.status(201).send("Task saved successfully"); // Send success response with status code 201
  } catch (err) {
    console.error("Error saving task:", err);
    res.status(500).send("Error saving task"); // Send error response with status code 500
  }
});





app.get("/", async (req, res) => {
  try {
    const list = await TodoList.findOne({ projectName: "HomeWork" });
    if (!list) {
      return res.status(404).send("TodoList not found"); 
    }
    const section = list.sections.find(sec => sec.sectionName === "Work");
const tasks=section.tasks;
    console.log(tasks); 

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
  try {
    const { id } = req.params;
    const updatedTask = await Listwork.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedTask) {
      return res.status(404).send('Task not found');
    }

    res.send(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Listwork.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).send('Task not found');
    }

    res.send({ message: 'Task deleted successfully', deletedCount: result.deletedCount });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).send('Internal Server Error');
  }
});



app.listen(3000, () => {
  console.log("Server started on port 3000");
});