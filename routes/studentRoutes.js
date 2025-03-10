const express = require('express');
const router = express.Router();
const {addstudentsUser,getTotalStudents,} = require("../controllers/studentControllers");

const Student = require("../models/studentModel");
const upload = require("../utilis/multer");
const path = require('path');
router.get('/dashboard', async(req, res) => {
  
  res.render(path.join(__dirname, '../views', 'dashboard.ejs')); });
 


router.get('/dashboard', async(req, res) => {
    //res.render(path.join(__dirname, '../views', 'dashboard.ejs')); 
     try {
      const students = await Student.find(); // Fetch students from the database
      res.render(path.join(__dirname, '../views', 'dashboard.ejs',{students})); 
      
  } catch (error) {
      console.error('Error fetching students:', error.message);
      res.status(500).send('Failed to load dashboard.');
  }
  });
router.post('/add',upload.single("profilepic"), addstudentsUser);

router.get('/add', (req, res) => {
   res.render(path.join(__dirname, '../views', 'dashboard.ejs'));
  // res.send('GET request to /add successful')
  });
  
  router.get('/feed', function(req,res,next){
    Student.find()
    .then(function (allusers) {
    res.render("allusers", { allusers });
  }) 
  });
  router.get('/search', async (req, res) => {
    try {  
        const { enroll } = req.query;
        console.log('Query Parameters:', req.query);  // Log the entire query object
        console.log('Enroll:', enroll);  // Log just the enroll parameter

        if (!enroll) {
            return res.status(400).json({ message: 'Enrollment number is required' });
        }

        const student = await Student.findOne({ enroll }); // Find the student in the database
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student); // Send the student details as JSON
    } catch (error) {
        console.error('Error searching for student:', error.message);
        res.status(500).json({ message: 'Failed to search for student' });
    }
});


router.get('/total-students', async (req, res) => {
  try {
      const totalStudents = await Student.countDocuments(); // Count all student documents
      res.status(200).json({ total: totalStudents });
  } catch (error) {
      console.error('Error fetching total students:', error.message);
      res.status(500).json({ message: 'Failed to fetch total students' });
  }
});
router.get('/filter', (req, res) => {
  res.render('filter', { student: null, error: null });
});
router.post('/filter', async (req, res) => {
  try {
    const { enroll } = req.body;
    const student = await Student.findOne({ enroll });

    if (!student) {
      return res.render('filter', { student: null, error: 'Student not found' });
    }

    const isWeak = student.marks < 5;
    const isAvg = student.marks >= 5 && student.marks < 8;
    res.render('filter', { student, isWeak, isAvg, error: null });
  } catch (err) {
    res.render('filter', { student: null, error: 'An error occurred' });
  }
});

  // router.get('/students', async (req, res) => {
  //   try {
  //     const students = await Student.find();
  //     res.render('students', { students });
  //   } catch (error) {
  //     console.error('Error fetching students:', error.message);
  //     res.status(500).send('Failed to load students.');
  //   }
  // });
module.exports = router;