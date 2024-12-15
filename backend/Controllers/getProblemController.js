
import { Questions } from "../Models/Question.js";
import { message } from "../utils/message.js";
import { StatusCodes as status } from "http-status-codes";

export async function getProblem(req,res){
    if(!req.params.questionId)
        return message(res,status.NOT_FOUND,"Provide question Id")
    try{
        const question = await Questions.findOne({questionId:req.params.questionId},{_id:0,usersSolved:0});
        if(!question)
            return message(res,status.NOT_FOUND,"Question not found enter proper id")
        return message(res,status.OK,question)
    }
    catch(error){
        return message(res,status.INTERNAL_SERVER_ERROR,error.message)
    }   
}

 
export async function sort(req,res) {
    const count = await Questions.countDocuments({})
    if(count ==  0)
        return message(res,status.NOT_FOUND,'No Questions found')
   
    return message(res,status.OK,res.pagenatedResults)
}

