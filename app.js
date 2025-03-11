var express = require('express');
var path = require('path');
var app = express();
const session = require("express-session");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var indexRouter = require('./routes/userRoutes');
var updateRouter = require('./routes/profileRoutes')
var studentRouter = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/Profile',updateRouter);
app.use('/',updateRouter);
app.use('/dashboard',studentRouter);
app.use('/students',studentRouter);
app.use('/update/:id',studentRouter);
app.use('/',studentRouter)
app.use('/',attendanceRoutes)
app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
app.use('/attendance',attendanceRoutes)
// app.use(session({
//   secret: "your_secret_key", // Change this to a strong secret
//   resave: false,
//   saveUninitialized: true,
//   // Set to true if using HTTPS
// }));

// app.use((req, res, next) => {
//   res.locals.user = req.session.user || null;
//   next();
// });
const port = 3000
app.listen(port , () => {
     
    console.log(`Server is running on http://localhost:${port}`);
  });  
module.exports = app;
