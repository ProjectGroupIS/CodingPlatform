
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionId:{
        type:String,
        required:true,
        unique:true
    },
    questionName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    inputFormat:{
        type:[String],
        require:true
    },
    outputFormat:{
        type:[String],
        require:true
    },
    constrains:{
        type:[String],
        require:true
    },
    difficulty:{
        type:Number,
        required:true
    },
    usersSolved:{
        type:[String]
    },
    tags:{
        type:[String]
    }
});


export const Questions = mongoose.model('Questions',questionSchema);