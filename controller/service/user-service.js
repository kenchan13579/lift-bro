var User             = require("../../model/user").User,
  bcrypt             = require("bcrypt-nodejs");

exports.addUser      = function(user, next) {
    newUser.findOne({username:user.username} ,function(err){
      if ( err ) {
        return next(user.username + " exists");
      }

      var newUser    = new User({
          username: user.username,
          password: bcrypt.hashSync(user.password),
          email:    user.email,
      });
      newUser.save(function (err) {
          next(err);
      });
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
