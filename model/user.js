var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type:String, require:"Username is required"},
    password: {type:String, require:"Password is required"},
    email: {type:String , require:"Email is required"},
    created: {type: Date, default: Date.now}

});

var User = moogoose.model("user" , userSchema);

module.exports = {
    User : User;
};
