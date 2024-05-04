import express from "express"
import { addTask, deleteTask, editStatus, getTasks, updateTask } from "../Controller/taskController.js";
import {isAuthenticated}  from "../Middleware/isAuthenticated.js";

const router = express.Router();

router.get("/",isAuthenticated, getTasks)

router.post("/add",isAuthenticated, addTask)

router.put("/edit/:id", isAuthenticated, updateTask)

router.put("/edit/:id", isAuthenticated, editStatus)

router.delete("/delete/:id", isAuthenticated, deleteTask)


export default router;