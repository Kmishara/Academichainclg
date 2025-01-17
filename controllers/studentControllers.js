const Student = require("../models/studentModel");
exports.addstudentsUser = async (req, res) => {
    try {
        const { name, mail, semester, enroll } = req.body;

        if (!name || !mail || !semester || !enroll) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if the student with the email already exists
        const existingStudent = await Student.findOne({ mail });
        if (existingStudent) {
            return res.status(400).json({ message: "Student with this email already exists." });
        }
        const newStudent = new Student({ name, mail, semester, enroll });
        await newStudent.save();
        // const newStudent = new Student({ name, mail, semester, enroll });
        // const allStudents = await Student.find();
        // // Save the student to the database
        // await newStudent.save();
        // res.status(200).json({
        //     success: true,
        //     student: allStudents,
        //   });

        // res.redirect('/students');
     res.status(201).json({ message: "Student added successfully!" });
      // res.redirect('/dashboard?success=true');
    } catch (error) {
        console.error("Error adding student:", error.message);
        res.status(500).json({ message: "Failed to add student. Please try again later." });
    }

  };
 
exports.getTotalStudents = async (req, res) => {
    try {
        // Count the total number of students
        const totalStudents = await Student.countDocuments();
        res.status(200).json({ totalStudents });
    } catch (error) {
        console.error('Error fetching total students:', error.message);
        res.status(500).json({ message: 'Failed to fetch total students. Please try again later.' });
    }
};


