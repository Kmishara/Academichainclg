const mongoose = require("mongoose");
const { unique } = require("next/dist/build/utils");

const studentSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    mail:{ type: String, required: true },
    semester:{ type: String, required: true },
    enroll:{type:Number, require:true, unique:true},

})
const Student = mongoose.models.Student || mongoose.model('addStudent', studentSchema);

module.exports = Student;