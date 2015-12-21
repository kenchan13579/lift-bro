var should = require("should");
var connectDB = require("./connectDB");
var userService = require("../../controller/service/user-service")
var User = require("../../model/user").User;
var connection = null;

describe("User ", function() {

  describe("#addUser", function() {

    before(function() {
      connectDB(function(err, conn) {
        connection = conn;
      });
    });
    after(function() {
      connection.disconnect();
    });

    it("should add not existing user correctly", function(done) {
      this.timeout(5000);
      var u = {
        username: "ken",
        password: "92216752",
        email: "kenchan13579@hotmail.com"
      };
      userService.addUser(u, function(err, res) {

        if (err) {
          err.should.be.null();
        }
        User.remove({
          "email": u.email
        }, function() {
          done();
        });


      });
    });

    it("should not add duplicate user", function(done) {
      this.timeout(5000);
      var u = {
        username: "ken",
        password: "92216752",
        email: "kenchan13579@hotmail.com"
      };
      userService.addUser(u, function(err, res) {
        if (err) {
          err.should.be.null;
        }
        userService.addUser(u, function(err, res) {
          should.exist(err);
          User.remove({
            "email": u.email
          }, function() {

            done();
          });
        })
      });
    });



  });

});
