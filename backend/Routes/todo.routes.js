import express from "express";
import { getProjects,postProjects } from "../controllers/todo.controller.js";

const todoRouter=express.Router();

todoRouter.get("/:userId/projects",getProjects);
todoRouter.post("/:userId/projects",postProjects);
// todoRouter.delete("/:project",getProjects);



// todoRouter.get("/:projectName",getSections);
// todoRouter.post("/:projectName",getSections);

export default todoRouter;