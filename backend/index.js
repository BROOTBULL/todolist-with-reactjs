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
    const tasklist=req.body;
    const list = new Listwork(tasklist);
    await list.save();
    console.log("Task saved successfully");
  } catch (err) {
    console.error("Error saving task:", err);
  }
});

app.get("/data", async (req, res) => {
  try {
    const lists = await Listwork.find();
    res.json(lists);
  } catch (err) {
    console.error("Error saving task:", err);
  }
});


app.listen(3000, () => {
  console.log("Server started on port 3000");
});
