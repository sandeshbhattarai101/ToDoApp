import express from "express"
import { login, logout, signup } from "../Controller/authController.js";
const router = express.Router();
import passport from "passport"
import { isAuthenticated } from "../Middleware/isAuthenticated.js";
import User from "../Model/usermodel.js";




router.post("/signup", signup)

router.post("/login", login)

router.get("/logout", logout)

router.get("/login/success",isAuthenticated, async(req, res)=> {
    // console.log(req)
    if(req.user) {
        const user = await User.findById(req.user.id)
        res.status(200).json({
            message: "login successfull",
            user: user,
        })
    }
} )
router.get("/login/failed", (req, res)=> {
    //req.user is returned from passport callback function
        res.status(401).json({
            message: "login failed",
        })
} )

router.get('/google',  passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', { 
    successRedirect: "http://localhost:5173/login",
    failureRedirect: 'http://localhost:5173/login/failed'

}));




export default router;