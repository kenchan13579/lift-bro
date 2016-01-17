'use strict';
var userService = require("../controller/service/user-service");

module.exports = function(app) {
  app.get("/", function(req, res) {
    if (req.cookies.remember && req.cookies["user_id"]) {
      res.redirect("/app");
    } else {
      res.render("index", {
        title: "Lift Bro"
      });
    }

  });
  app.get("/app/", function(req, res) {
    if (req.cookies.remember && req.cookies["user_id"]) {
      userService.checkCookies(req.cookies, function(invalid, doc) {
        if (invalid) {
          res.redirect("/");
        } else {
          return res.render("app/app", {
            "name": doc.username
          });
        }
      });
    } else {
      res.redirect("/");
    }

  });
  app.get("/app/workout/:date/", function(req , res){
    if (req.cookies.remember && req.cookies["user_id"]) {
      userService.checkCookies(req.cookies, function(invalid, doc) {
        if (invalid) {
          res.redirect("/");
        } else {
          try {
            var date = new Date( parseInt(req.params.date));
            return res.render("app/workout", {
              "date": date.toString()
            });
          } catch (e) {
            console.log(e);
            return res.error();
          }

        }
      });
    } else {
      res.redirect("/");
    }
  })
  .post("/app/workout/:date/" , function(req , res ){
    return res.end();
  });
  app.all("/api/logout", function(req, res) {
    if (req.cookies.remember && req.cookies["user_id]"]) {
      userService.deleteCookies(req.cookies);
      res.clearCookie("remember");
      res.clearCookie("user_id");
      res.end();
    } else {
      res.end("You are not logged in")
    }
  });
  app.post("/api/signup", function(req, res) {

    userService.addUser(req.body, function(err) {
      if (err) {
        res.status(400);
        res.json({
          success: false,
          messages: err
        });
      }
      res.status(200).json({
        success: true,
        messages: "Account is successfully created"
      });
    });
  });
  app.post("/api/login", function(req, res) {
    var loginForm = req.body;
    userService.validateLogin(loginForm, function(err, doc) {
      if (err) {
        // such as invalid logins
        res.status(401).json({
          success: false,
          messages: err
        });
      } else {
        // send them cookies
        userService.createCookies(loginForm, doc, function(err, cookies) {
          if (err) {
            res.status(401).json({
              success: false,
              messages: err
            });
          }
          cookies.forEach(function(val, index, arr) {
            res.cookie(val.key, val.value, {
              expires: val.expire
            });
          });
          res.json({
            success: true,
            messages: "redirecting..."
          });
        });

      }
    });
  });

  app.get("/parts/*", function(req, res) {
    var p = req.path.slice(1);
    res.render(p, {});
  });
};
