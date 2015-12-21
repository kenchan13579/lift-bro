'use strict';
var userService = require("../controller/service/user-service");

module.exports = function ( app ) {
    app.get("/" , function ( req, res ) {
        res.render("index" , {
            title : "My daily lift"
        });
    });
    app.get("/app" , function(req, res){
      if (req.cookie) {

      }
    });
    app.post("/api/signup" , function(req,res){

        userService.addUser(req.body , function (err) {
            if (err) {
                res.status(400);
                res.type("json");
                res.json({
                  success: false,
                  messages : err
                });
            }

            res.status(200).json({
              success:true,
              messages : "Accounot was successfully created"
            });
        });
    });
    app.get("/api/signin" , function(req,res){
        var loginForm = req.body;
      userService.findUser( loginForm , function(err , doc){
        if ( err ) {
          doc.status(400).json({
            success: false,
            message:err
          });
        } else {
          userService.createCookies(res,function (err , cookie) {
            if (err) {
              console.log(err);
              res.status(400).end();
            }
            res.status(200).json({
              success:true,
              message:"redirecting...",
              cookies: cookie
            });
          });

        }
      });

        })
    });
    app.get("/parts/*" , function(req , res){
        var p = req.path.slice(1);
        res.render(p,{});
    });
};
