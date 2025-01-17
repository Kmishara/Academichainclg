// const User = require("../models/userModel");
// const bcrypt = require('bcrypt')
// exports.registerUser = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     // Check if the email is already registered
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return renderError(res, "Email already exists", username);
//     }
//     // Create and save a new user with hashed password
//     const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds for salt
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });
//     const savedUser = await newUser.save();
//   } catch (error) {
//     console.error("Registration error:", error);
//     return renderError(
//       res,
//       "Registration failed. Please try again later.",
//       req.body.username,
     
//     );
//   }
// };

// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }
//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }
//   } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const User = require("../models/userModels");
const bcrypt = require("bcrypt");

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
        res.redirect('./login')
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Registration failed. Please try again later." });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Successful login
  // res.status(200).json({ message: "Login successful" });
   res.render('dashboard');
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
