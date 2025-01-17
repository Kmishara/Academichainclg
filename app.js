var express = require('express');
var path = require('path');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var indexRouter = require('./routes/userRoutes');
var studentRouter = require("./routes/studentRoutes");
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dashboard',studentRouter);
app.use('/students',studentRouter)
app.use('/',studentRouter)
app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
const port = 3000
app.listen(port , () => {
     
    console.log(`Server is running on http://localhost:${port}`);
  });  
module.exports = app;
