var MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/myLift", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
  var collection = db.collection("Users");

});
var signupProcess = function (req,res){
    var data = req.body;

}

module.exports = {
    signupProcess : signupProcess
}
