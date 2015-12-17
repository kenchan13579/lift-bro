var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type:String, required:"Username is required" },
    password: {type:String, required:"Password is required"},
    email: {type:String , require:"Email is required" ,unique:true},
    created: {type: Date, default: Date.now}

});

var User = mongoose.model("kenkens" , userSchema);

exports.User = User;
