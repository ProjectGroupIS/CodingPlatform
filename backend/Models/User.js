import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userID:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    photo:{
        type:String
    },
    password:{
        type:String,
        required:false
    },
    googleId:{
        type:String,
        required:false
    },
    gender:{
        type:String,
        enum:['Male','Female'],
        required:false
    },
    rating:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        required:true
    },
    questionsSolved:{
        type:[String],
        // default:null
    },
    submissions:{
        type:[String]
        // default:null
    }
})



export function userValidator(user){
    const schema = Joi.object({
        name:Joi.string().min(4).max(20).required().label("User name"),
        userID:Joi.string().optional(),
        email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required().label('Email'),
        password:Joi.string().min(6).required().label('Password'),
        gender:Joi.string().label('Gender').optional().label('Gender'),
        createdAt:Joi.date().timestamp().optional()
    });
    return schema.validate(user)
}


export const User = mongoose.model('User',userSchema);