import mongoose from "mongoose";


const submissionSchema = new mongoose.Schema({
    questionId:{
        type:String,
        required:true
    },
    submittedBy:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    submittedAt:{
        type:Date,
        required:true
    }
});

export const Submissions = mongoose.model('submissions', submissionSchema); 