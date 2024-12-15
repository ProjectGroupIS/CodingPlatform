import { User } from "../Models/User.js";
import { userValidator } from "../Models/User.js";
import bcrypt from 'bcrypt'
import { message } from "../utils/message.js";
import { StatusCodes as status } from "http-status-codes";

export async function register(req,res){
    String.prototype.reduceWhiteSpace = function() {
        return this.replace(/\s+/g, ' ');
    };

    const user = req.body;
   
    const {error} = userValidator(user);
    if(error)
        return message(res,status.BAD_REQUEST,error.message)

    const isPresent = await User.findOne({email:user.email});
    if(isPresent)
        return message(res,status.CONFLICT,'User with email already exists');
    
    user.userID=  user.email.substring(0,user.email.lastIndexOf('@'))
    user.createdAt = Date.now()
    user.name = user.name.reduceWhiteSpace()
    const newUser = new User({
        name:user.name,
        userID:user.userID,
        email:user.email,
        password:await bcrypt.hash(user.password,10),
        createdAt:user.createdAt
    })
    if(user.gender){
        newUser.gender=user.gender;
    }
    await newUser.save()
    return message(res,status.CREATED,`user ${user.name} registered successfully`)
}

export function logout(req,res){
    req.session.destroy()
    res.redirect('/')
}
