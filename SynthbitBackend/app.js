import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import passport from "passport";

import authRoute from "./Route/authRoute.js";
import taskRoute from "./Route/taskRoute.js";
import userRoute from "./Route/userRoute.js";
import "../SynthbitBackend/passport.js"

const app = express();

// CORS configuration
const corsOptions = {
  // origin: "http://localhost:5173",
   origin: ["https://to-do-app-mu-liart.vercel.app"],
   methods: ["POST","GET", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));

dotenv.config();


const connect = async () => {
  try {
    await mongoose.connect(process.env.MongoDB);
    console.log("Database connected successfully");
  } catch (error) {
    throw error;
  }
};



// Cookie parser middleware
app.use(cookieParser());

// Body parser middleware
app.use(express.json());

//for google SSO with passportjs we also need express-session

app.use(session({
  name: 'connect', // Set the name of the session
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}))

app.use(passport.initialize())
app.use(passport.session())

// To check in vercel

app.get("/", (req,res)=>{
  res.json("Hello!! This is ToDoApp Server")
})

// Routes
app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute); // Corrected: Use taskRoute for /api/task
app.use("/api/user", userRoute); 

const PORT = process.env.PORT || 3000; // Use environment variable for port or default to 3000
app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
