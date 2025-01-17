const express = require('express');
const router = express.Router();
const {registerUser,loginUser} = require("../controllers/userControllers")
const path = require('path');
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/login', (req, res) => {
    res.render(path.join(__dirname, '../views', 'index.ejs'));
  });
  router.get('/register', (req, res) => {
    res.render(path.join(__dirname, '../views', 'index.ejs'));
  });
// router.get('/login', (req, res) => {
//     res.render('login', { title: 'AcademiChain' }); // Ensure 'login.ejs' exists in the 'views' folder
//   });
  
//   // Serve the register page
//   router.get('/register', (req, res) => {
//     res.render('register', { title: 'AcademiChain' }); // Ensure 'register.ejs' exists in the 'views' folder
//   });
module.exports = router;