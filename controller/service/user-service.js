var User = require("../../model/user").User;

exports.addUser = function(user, next) {
    var newUser = new User({
        username: user.username,
        password: user.password,
        email: user.email,
    });
    newUser.save(function (err) {
        next(err);
    });
};

exports.showAllUsers = function (callback) {
    User.find(function(err , users){
        if ( err) {
            return callback(err);
        }
        callback(null , users);
    });
}
