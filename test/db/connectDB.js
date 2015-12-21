var config = require("../../config");
var mongoose = require("mongoose");




module.exports = function (callback) {
    mongoose.connect(config.mongodbURL);
    var db = mongoose.connection;
    db.on("error" , function (err){
        callback(err);
    });
    db.open("open" , function (){
        callback(null,mongoose);
    });

}
