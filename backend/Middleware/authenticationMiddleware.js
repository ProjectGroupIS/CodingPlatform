import { message } from "../utils/message.js";
import { StatusCodes as status } from "http-status-codes";

export function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
   return message(res,status.UNAUTHORIZED,"Login to perform this action")
}

export async function alreadyLoggedIn(req,res,next){
    if(!req.isAuthenticated())
        return next()

    return message(res,status.CONFLICT,'already logged in')
}