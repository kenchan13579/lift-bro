var User = require("../../model/user").User,
  bcrypt = require("bcrypt-nodejs"),
  crypto = require("crypto"),
  encode = require("../helpers/encode");

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

exports.validateLogin = function(user, cb) {
  User.findOne({
    email: user.email,
  }, function(err, doc) {
    if (err) {
      return cb(err.messages);
    }
    // matched record found
    if (bcrypt.compareSync(user.password, doc.password)) {
      return cb(null, doc);
    } else {
      // fail
      return cb("Wrong password");
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

exports.createCookies = function(loginInfo, doc, done) {
  var expire;
  var hashed = encode.encrypt(doc.email + Date.now());
  var date = new Date();
  // if remember is checked, set expire to long time after
  if (loginInfo.remember) {
    expire = date.setDate(date.getFullYear() + 10);
  } else {
    // otherwise , set it one day
    expire = date.setDate(date.getDate() + 1);
  }
  User.findOne({
    "_id": doc.id
  }, function(err, doc) {
    if (err) {
      return done(err);
    }
    doc.hashKey = doc.hashKey || [];
    doc.hashKey.push({
      hashed: hashed,
      expire: expire,
    });
    // clientCookies will be set in the client
    var clientCookies = [{
      "remember": hashed,
      expire: expire
    }, {
      "user_id": encode.encrypt(doc.id),
      expire: loginInfo.remember ? expire : null
    }];
    doc.save(function(err) {
      done(err, clientCookies);
    });
  });
};
/*
  Check if the cookies are valid,return true|false
*/
exports.checkCookies = function(cookies, invalid) {
  var userID = encode.decrypt(cookies["user_id"]);
  User.findOne({
    "_id": userID
  }, function(err, doc) {

    if (err || !doc) return invalid(true);
    var current = new Date().getTime();
    //check all existing tokens
    for (var i = 0 ; i < doc.hashKey.length ;i++){
      var val = doc.hashKey[i];
      if (val.expire && val.expire < current) {
        doc.hashKey.splice(index, 1);
        i--;
      } else if (val.hashed === cookies.remember) {
        //valid cookies!
        return invalid(false, doc);
      }
    }
    invalid(true);
  });
}

exports.deleteCookies = function(cookies) {
  var userID = encode.decrypt(cookies["user_id"]);
  User.findOne({
    "_id": userID
  }, function(err, doc) {
    if (!doc || err) return;
    var current = new Date().getTime();
    //check all existing tokens
    doc.hashKey.forEach(function(val, index, arr) {
      // delete expired ones
      if (val.expire && val.expire < current) {
        arr.splice(index, 1);
      } else if (val.hashed === cookies.remember) {
        arr.splice(index, 1);
      }
    });
  });
}
