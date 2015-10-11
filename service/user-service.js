var User = require("../model/user").User;

exports.addUser = function(user, next) {
    var newUser = new User({
        username: user.username,
        password: user.password,
        email: user.email
    });
    newUser.save(function ( err) {
        next(err);
    })
}
