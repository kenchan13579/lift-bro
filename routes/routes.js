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
                res.type(".txt")
                res.end(err);
            }

            res.status(200).end();
        });
    });
    app.get("/api/signin" , function(req,res){
        var loginForm = req.body;
        userService.find(req.body, function ( err){
            if ( err ) {
                res.end(err);
            }

        })
    });
    app.get("/parts/*" , function(req , res){
        var p = req.path.slice(1);
        res.render(p,{});
    });
};
