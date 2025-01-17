var mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:2710/dbtask');
mongoose.connect("mongodb://127.0.0.1:27017/ejsprac");

 var userSchema = mongoose.Schema({
    username:{ type: String, required: true },
    email:{ type: String, required: true },
    password:{ type: String, required: true }
  
});
module.exports = mongoose.model("student", userSchema);


