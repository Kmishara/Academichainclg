const path = require('path');
const Student = require('../models/studentModel');
const Attendance = require('../models/attendanceModel');
// exports.addattendace = async(req,res) =>{
//    // res.render(path.join(__dirname, '../views', 'attendance.ejs'));
      
//     Student.find()
//     .then(function (attendance) {
//     res.render("attendance", { attendance });
//     })
  
    

// }
// exports.markAttendance = async (req, res) => {
//     const { date, course, status } = req.body;

//     // Ensure all required fields are provided
//     if (!date || !course || !status) {
//         return res.status(400).json({ success: false, error: 'Missing required fields' });
//     }

//     try {
//         // Map over `status` to find enrolled students and their attendance status
//         const studentsAttendance = await Promise.all(
//             Object.entries(status).map(async ([enroll, { status }]) => {
//                 // Find the student in the Enroll collection
//                 const enrollno = await Student.findOne({ enroll });

//                 if (!enrollno) {
//                     throw new Error(`Student with enrollId ${enroll} not found`);
//                 }

//                 return {
//                     enrollno: enroll._id, // Reference the student's ObjectId
//                     status: status === 'Present' ? 'Present' : 'Absent',
//                 };
//             })
//         );

//         // Save the attendance record
//         const newAttendance = new Attendance({
//             date: new Date(date),
//             course,
//             students: studentsAttendance,
//         });

//         await newAttendance.save();

//         res.json({ success: true, message: 'Attendance submitted successfully' });
//     } catch (err) {
//         console.error('Error:', err.message);
//         res.status(500).json({ success: false, error: err.message });
//     }
// };

exports.markAttendance = async (req, res) => {
    const { date, course,  status} = req.body;

    // Ensure all required fields are provided
    if (!date || !course || !status) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    console.log('Received attendance:',date,status,);  // Debugging line
    const studentsAttendance = Object.entries(status).map(([enroll, {status }]) => ({
        
        enroll: enroll._id, // Assuming enroll is the studentId, change as necessary
        status: status === 'Present' ? 'Present' : 'Absent',
    }));

    try {
        // Create a new Attendance document
        const newAttendance = new Attendance({


            
            date: new Date(date),  // Ensure date is parsed correctly
            course,
            students: studentsAttendance,
        });
      
        await newAttendance.save();
       
        res.json({ success: true, message: 'Attendance submitted successfully' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, error: 'Error marking attendance' });
    }
};

exports.showAttendance = async (req, res) => {
    try {
        // Fetch all attendance records
        const attendanceRecords = await Attendance.find().sort({ date: -1 });
       
        res.render('showAttendance', { attendanceRecords });
    } catch (err) {
        console.error('Error fetching attendance:', err);
        res.status(500).send('Error fetching attendance data');
    }
};





