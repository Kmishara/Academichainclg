const mongoose = require("mongoose");
const { unique } = require("next/dist/build/utils");

const studentSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    mail:{ type: String, required: true },
    semester:{ type: String, required: true },
    enroll:{type:String, require:true, unique:true},
    prsnlphn:{type:Number, require:true, unique:true },
    parentsphn:{type:Number, require:true, unique:true},
    marks:{type:Number, require:true},
    profilepic:{type:String },

   

})
const Student = mongoose.models.Student || mongoose.model('addStudent', studentSchema);

module.exports = Student;