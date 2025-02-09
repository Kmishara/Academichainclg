var mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:2710/dbtask');
//mongoose.connect("mongodb://127.0.0.1:27017/ejsprac");
mongoose.connect("mongodb+srv://Sweta_42:sweta_118@cluster0.nx1xk.mongodb.net/academicChain");
 var userSchema = mongoose.Schema({
    username:{ type: String, required: true },
    email:{ type: String, required: true },
    password:{ type: String, required: true },

  
});
module.exports = mongoose.model("student", userSchema);


