import express from "express";
import { getProjects,postProjects ,deleteProjects} from "../controllers/todo.controller.js";

const todoRouter=express.Router();

todoRouter.get("/:userId/projects",getProjects);
todoRouter.post("/:userId/projects",postProjects);
todoRouter.delete("/:userId/:project",deleteProjects);



// todoRouter.get("/:projectName",getSections);
// todoRouter.post("/:projectName",getSections);

export default todoRouter;