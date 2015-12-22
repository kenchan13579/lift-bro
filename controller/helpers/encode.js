var   bcrypt = require("bcrypt-nodejs"),
      crypto = require("crypto");
var key = 'MySecretKey12345';
var iv = '1234567890123456';


exports.encodeToken =  function(originalObj) {
  var timestamp = Date.now();
  var toBeHashed = JSON.stringify(originalObj) + timestamp;
  return bcrypt.hashSync(toBeHashed);
};

exports.encrypt = function(input) {
  if (typeof input == 'object'){
    input = JSON.stringify(input);
  }
  var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  var encrypted = cipher.update(input, 'utf8', 'binary');
  encrypted += cipher.final('binary');
  hexVal = new Buffer(encrypted, 'binary');
 return hexVal.toString('hex');

};

exports.decrypt = function(input){
  if (typeof input == 'object'){
    input = JSON.stringify(input);
  }
  var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  var decrypted = decipher.update(input, 'hex', 'binary');
  decrypted += decipher.final('binary');
  return decrypted;
};
