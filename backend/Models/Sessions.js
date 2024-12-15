import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    expires:{
        type:Date,
        required:true
    },
    userId:{
        type:String,
        unique:true
    },
    session:{
        type:Object,
        required:true,
    }
})

export const Sessions = mongoose.model('Sessions',sessionSchema) 