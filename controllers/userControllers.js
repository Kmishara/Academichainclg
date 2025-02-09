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
    const { password, username } = req.body;
    const usser = await User.findOne({username});
  if (!usser) {
    return res.status(400).json({ message: "invalid useraname" });
  }
    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, usser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    } 
  res.render('dashboard', { user: usser});
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

