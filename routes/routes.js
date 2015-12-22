'use strict';
var userService = require("../controller/service/user-service");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index", {
      title: "My daily lift"
    });
  });
  app.get("/app", function(req, res) {
    if (req.cookies) {
      userService.checkCookies(req.cookies,function(invalid , doc){
        if (invalid){
          res.redirect("back");
        } else {
          res.render("app/app" , {
            "name" : doc.username
          });
        }
      });
    } else {
      res.redirect("back");
    }

  });
  app.all("/api/logout" , function (req,res){
    // delete token from db
  });
  app.post("/api/signup", function(req, res) {

    userService.addUser(req.body, function(err) {
      if (err) {
        res.status(400);
        res.type("json");
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
        res.json({
          success: false,
          messages: err
        });
      } else {
        // send them cookies
        userService.createCookies(loginForm,doc, function(err, cookies) {
          if (err) {
            res.json({
              success: false,
              messages: err
            });
          }
          res.status(200).json({
            success: true,
            messages: "redirecting...",
            cookies: cookies
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
