var should = require("should");
var connectDB = require("./connectDB");
describe("Testing db connection", function() {
    it("should connect", function(done) {
        connectDB(function(err, db) {
            if (err) {
                throw err;
            }

            db.should.be.ok;
            db.disconnect();
            done();
        });

    });


});
