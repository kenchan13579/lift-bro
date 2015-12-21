var User = require("../../model/user").User,
  bcrypt = require("bcrypt-nodejs"),
  cookieParser = require("cookie-parser").
  encode = require("./helpers/encode");

exports.addUser = function(user, next) {
  User.findOne({
    email: user.email
  }, function(err, res) {
    if (err) {
      return next(err);
    }

    if (!res) {

      var newUser = new User({
        username: user.username,
        password: bcrypt.hashSync(user.password),
        email: user.email,
      });

      newUser.save(function(err) {
        return next(err);
      });
    } else {
      return next(res.email + " exists");
    }

  });
};

exports.findUser = function(user , cb) {
  User.findOne({
    username : user.username,
    password: bcrypt.compareSync(user.password),
  } , function (err , res) {
      if ( err ) {
        return cb(err);
      }
      if (res) {
        return cb(null , res);
      } else {
        return cb("Invalid login");
      }
  });
}

exports.showAllUsers = function(callback) {
  User.find(function(err, users) {
    if (err) {
      return callback(err);
    }
    callback(null, users);
  });
}

exports.createCookies = function(user,done){
  var hashed = encode(user);
  var date = new Date();
  var expire = date.setDate(date.getDate()+7);
  User.findOne({"_id":user.id},function(err,doc){
    if (err) {
      return done(err);
    }
    doc.hashKey = doc.hashKey || [];
    doc.hashkey.push({
      hash: hashed,
      expire : expire
    });
    doc.save(function(err){
      done(err , hashed);
    });
  });
}
