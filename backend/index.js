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

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  time: String,
});

const Listwork = mongoose.model("List", itemSchema);

app.post("/", async (req, res) => {
  try {
    const tasklist = req.body;
    console.log("Received tasklist:", tasklist);

    const list = new Listwork(tasklist);
    await list.save();

    console.log("Task saved successfully");
    res.status(201).send("Task saved successfully"); // Send success response with status code 201
  } catch (err) {
    console.error("Error saving task:", err);
    res.status(500).send("Error saving task"); // Send error response with status code 500
  }
});


app.get("/", async (req, res) => {
  try {
    const lists = await Listwork.find();
    res.status(200).json(lists); // Send JSON response with status code 200
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).send("Error fetching tasks"); // Send error response with status code 500
  }
});



app.listen(3000, () => {
  console.log("Server started on port 3000");
});
