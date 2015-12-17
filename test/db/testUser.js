var should = require("should");
var connectDB = require("./connectDB");
var userService = require("../../controller/service/user-service")
describe("User ", function() {
    it("should return err when duplicate is added", function(done) {
        connectDB(function(err, mongoose) {
            if (err) {
                err.should.be.false;
            }
            addSpecificUser(function(err) {
                if (err) {
                    err.should.be.false;
                }
                mongoose.disconnect();
                done();
            });


        });
    });
});


function addSpecificUser(callback) {
    userService.addUser({
        username: "ken",
        password: "92216752",
        email: "kenchan13579@hotmail.com"
    }, callback);
}
