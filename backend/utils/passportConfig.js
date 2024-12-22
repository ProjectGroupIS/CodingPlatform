import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../Models/User.js";
import bcrypt from 'bcrypt'
export async function initilize(){
    async function authenticateGoogle(accessToken,refreshToken,profile,done){
        const user = await User.findOne({googleId:profile._json.sub})
        if(user){
            return done(null,profile)
        }
        
        const {name,email,sub,picture}= profile._json;
        const newUser = new User({
            name:name,
            photo:picture,
            email:email,
            googleId:sub,
            userID:email.substring(0,email.lastIndexOf('@')),
            createdAt:Date.now()
        });

        await newUser.save();

        return done(null,profile)
    }
  
    async function authenticateNormal(email,password,done){
        if(!email || !password)
            return done(null,false,{message:'Enter both email and password'})
        const user = await User.findOne({email:email})
        if(!user)
            return done(null,false)
        try{
            const result = await bcrypt.compare(password,user.password)
            if(result){
                return done(null,user)
            }
            return done(null,false,{message:'wrong password'})
        }catch(error){
            return done(error)
        }
    } 

    passport.use(new GoogleStrategy({
        clientID:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRETE,
        callbackURL:process.env.CALLBACK,
        // passReqToCallback:true,
        scope:['profile','email','picture']
    },authenticateGoogle //callback func
    ));
    
    passport.use(new LocalStrategy({usernameField:'email'},authenticateNormal))

    passport.serializeUser((user,done)=>{
        return done(null,user)
    });
    passport.deserializeUser((user,done)=>{
        return done(null,user)
    });
}
   