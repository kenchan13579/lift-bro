var userService = require("./service/user-service");

module.exports = function ( app ) {
    app.get("/" , function ( req, res ) {
        res.render("index" , {
            title : "My daily lift"
        });
    });
    app.get("/api/signup" , function(req,res){
        userService.addUser(req.body , function (err) {
            if (err) {
                res.end("ERROR!");
            }
            // success
            //res.redirect("some next page")
        })
    })
}
