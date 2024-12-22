import { User } from "../Models/User";
import { message } from "../utils/message";
import { StatusCodes as status } from "http-status-codes";


export async function getUser(req,res){
    const userID = req.params.userID;
    const requiredUser = await User.find({userID:userID});
    if(requiredUser)
        return message(res,status.OK,requiredUser)
    return message(res,status.NOT_FOUND,`User with id ${userID} dose not exist`)
}
