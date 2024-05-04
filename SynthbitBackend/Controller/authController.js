import express from "express"
import bcrypt from "bcryptjs"
import User from "../Model/usermodel.js"
import jwt from "jsonwebtoken"
import passport from "passport"

export const signup = async(req, res)=>{
const hash = bcrypt.hashSync(req.body.password, 8)
const newUser = new User({...req.body, password: hash})
await newUser.save();
res.status(200).json({
    message: "User Created Successfully"
})

}


export const login = async(req, res)=>{
    if(!req.body){
        res.send("Please provide the credentials")
    }

    const user = await User.find({email: req.body.email})
    //  return console.log(user[0]._id);

    if(!user){
        res.send("User not found")
    }

    const isCorrect = bcrypt.compareSync(req.body.password, user[0].password)

    if(isCorrect){
        
            const token = jwt.sign({id : user[0]._id}, process.env.SECRETKEY)
        
            res.cookie("token", token).status(200).json({
                message: "Login Successfull"  
            })
    }else{
        res.status(400).json("Wrong Credentials")

    }
}


export const logout = async(req, res)=>{
    res.clearCookie("token");
    res.status(200).json({
        message : "User logged out successfully"
    })
}

// export const authGoogle =()=>{
//     passport.authenticate('google', { scope: ['email', 'profile'] })
// }

// export const authGoogleCallback =()=>{
//      passport.authenticate('google', { 
//         successRedirect: "http://localhost:5173/dashboard",
//         failureRedirect: 'http://localhost:5173/login'

//     })
// }