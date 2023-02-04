const mongoose = require('mongoose')

const student = new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    class:{
        type:String,
        trim:true
    },
    roll:{
        type:Number,
        required:true
    }
});
const Student = mongoose.model('Student',student)
module.exports = Student;
