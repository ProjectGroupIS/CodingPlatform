import e from "express";
import passport from "passport";
import { register,logout } from "../Controllers/authController.js";
import {ensureAuthenticated, alreadyLoggedIn} from "../Middleware/authenticationMiddleware.js"

const authRouter = e.Router()
// for google auth
authRouter.get('/',(req,res)=>res.send('<a href="/auth/google">Google</a>'))
authRouter.get('/google',passport.authenticate('google',{scope:['email','profile']}));

authRouter.get('/getData',passport.authenticate('google',
    {
        successRedirect:'/problems',
        failureRedirect:'/failure'
    }
));

authRouter.get('/success',(req,res)=>res.send("success"))
authRouter.get('/failure',(req,res)=>res.send("fail"))


authRouter.post('/login',alreadyLoggedIn,(req,res,done)=>{
    passport.authenticate('local',{
        successRedirect:'/'
    })(req,res,done)
});


authRouter.post('/register',register)
authRouter.get('/logout',ensureAuthenticated,logout)


export {authRouter}