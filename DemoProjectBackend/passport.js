import passport from "passport"
 import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from "./Model/usermodel.js";
import jwt from "jsonwebtoken"
 dotenv.config()

const GOOGLE_CALLBACK_URL = "http://localhost:3000/api/auth/google/callback";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLECLIENTID,
    clientSecret: process.env.GOOGLESECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
    // scope: ["email", "profile"]
  },
 async (req, accessToken, refreshToken, profile, cb) => {
  // console.log(profile);

  try {
    
      const user = await User.findOne({email: profile.emails[0].value})
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.SECRETKEY);
        req.res.cookie("token", token)
      }
      if(!user){
       const user = new User({    
       username : `${profile.displayName}`,
       email : `${profile.emails[0].value}`,
       img : `${profile.photos[0].value}`,
       googleId : `${profile.id}`,})

       await user.save();

      const token = jwt.sign({ id: user._id }, process.env.SECRETKEY);
       req.res.cookie("token", token)
       return cb(null, user)
      }
      return cb(null, user)

    
  } catch (error) {
   return cb(error, null)
  }

  }
));


passport.serializeUser((user, cb)=>{
  return cb(null, user)
})


passport.deserializeUser( (user, cb)=>{

 return cb(null, user)
  
})