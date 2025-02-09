const express = require('express')
const router = express.Router();
const {addattendace,markAttendance,showAttendance} = require('../controllers/attendanceControllers');
const path = require('path');
const Student = require('../models/studentModel');

 //router.get('/attendance',markAttendance);
 router.get('/attendance', async (req, res) => {
    try {
        // Fetch all enrolled students from the Enroll collection
        const students = await Student.find();

        // List of courses (you can fetch this dynamically from your database or define statically)
        // const courses = ['Math 101', 'Physics 101', 'Chemistry 101'];

        // Render the EJS template with data
        res.render('attendance', { students});
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error loading attendance page');
    }
});
router.post('/attendance', markAttendance);
router.get('/show-attendance', showAttendance);
module.exports = router;