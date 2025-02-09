const express = require('express');
const router = express.Router();
const {registerUser,loginUser,getUserProfile,updateUserProfile} = require("../controllers/userControllers")
const path = require('path');
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/login', (req, res) => {
    res.render(path.join(__dirname, '../views', 'index.ejs'));
  });
  router.get('/register', (req, res) => {
    res.render(path.join(__dirname, '../views', 'index.ejs'));
  });
  router.get('/Profile',function(req,res,next){

    res.render(path.join(__dirname, '../views', 'Profile.ejs'));
   
   });
  

module.exports = router;