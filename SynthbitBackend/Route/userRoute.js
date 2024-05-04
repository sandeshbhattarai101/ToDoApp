import express from "express"
import { getUser } from "../Controller/userController.js";
import { isAuthenticated } from "../Middleware/isAuthenticated.js";

const router = express.Router();

router.get("/", isAuthenticated, getUser)


export default router;