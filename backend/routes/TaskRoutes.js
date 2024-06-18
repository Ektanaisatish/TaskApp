import express from "express";
import {
  addTask,
  deleteTask,
  getById,
  getByUserId,
  updateTask,
} from "../controllers/TaskController.js";
 import { restrictToLoggedinUserOnly } from "../middleware/Auth.js";
const taskRouter = express.Router();
//middle ware for protecting routes
taskRouter.post("/add",restrictToLoggedinUserOnly, addTask);                //http://localhost:5000/api/task/add
taskRouter.put("/update/:id", restrictToLoggedinUserOnly, updateTask);       //http://localhost:5000/api/task/update/65eef79b47a41f263af10e5c
taskRouter.get("/:id",restrictToLoggedinUserOnly,  getById);                 //http://localhost:5000/api/task/65eef87447a41f263af10e61
 taskRouter.delete("/:id", restrictToLoggedinUserOnly, deleteTask);          //http://localhost:5000/api/task/65eef87447a41f263af10e61
// taskRouter.delete("/:id",  deleteTask);                                   //http://localhost:5000/api/task/65eef87447a41f263af10e61

taskRouter.get("/getuser/:id",restrictToLoggedinUserOnly,  getByUserId);     //http://localhost:5000/api/task/getuser/65eed174f1a8b5d7462f6a26
export default taskRouter;
