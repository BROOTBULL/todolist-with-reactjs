import express from "express";
import { getProjects,postProjects ,deleteProjects} from "../controllers/Projects.controller.js";
import { verifyToken } from "../utils/verifyToken.middleware.js";
import { deleteSections, getSections, postSections, putSections } from "../controllers/Sections.controller.js";
import { deleteTasks, getTasks, postTasks, putTasks } from "../controllers/tasks.controller.js";

const todoRouter=express.Router();

todoRouter.get("/projects",verifyToken,getProjects);
todoRouter.post("/projects",verifyToken,postProjects);
todoRouter.delete("/:project",verifyToken,deleteProjects);



todoRouter.get("/:projectName/sections",verifyToken,getSections);
todoRouter.post("/:project/add_Sections",verifyToken,postSections);
todoRouter.put("/:project/:section",verifyToken,putSections);
todoRouter.delete("/:project/:section",verifyToken,deleteSections);


todoRouter.get("/:project/:section",verifyToken,getTasks);
todoRouter.post("/:project/:section",verifyToken,postTasks);
todoRouter.put("/:project/:section/:id",verifyToken,putTasks);
todoRouter.delete("/:project/:section/:id",verifyToken,deleteTasks);


export default todoRouter;