var   bcrypt = require("bcrypt-nodejs");

module.exports =  function(originalObj) {
  var timestamp = Date.now();
  var toBeHashed = JSON.stringify(originalObj) + timestamp;
  return bcrypt.hashSync(toBeHashed);
}
