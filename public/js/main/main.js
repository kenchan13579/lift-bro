"use strict"
var main = angular.module("main", ["ngCookies"]);

main
  .controller("mainCtrl", function($scope, $window, loginSignupFactory, validate, $cookies) {
    $scope.signup = {
      errMsg: {},
      status: null,
      submit: function() {
        this.errMsg = validate.signupvalidate(this.name, this.email, this.password, this.verifyPassword);
        this.status = null;
        for (var obj in this.errMsg) {
          console.log("%a", this.errMsg[obj]);
        }
        if (!this.errMsg) {
          var that = this;
          loginSignupFactory.signup({
            username: that.name,
            email: that.email,
            password: that.password
          }).then(function(res) {
            if ("object" === typeof res) {
              that.status = res.data;
            }
          });
        }

      }
    }
    $scope.signupWindow = {
      show: false,
      toggle: function() {
        this.show = !this.show;
      }
    }
    $scope.login = {
      message: null,
      status: null,
      submit: function() {
        this.status = null;
        if (this.email && this.password) {
          var that = this;
          loginSignupFactory.login({
            email: that.email,
            password: that.password,
            remember: that.remember
          }).then(function(res) {

            if (typeof res === 'object') {
              that.status = res.data;
              if (res.data.success) {
                for (var i = 0; i < res.data.cookies.length; i++) {
                  var cookie = res.data.cookies[i];
                  console.log(cookie);

                  for (var key in cookie) {
                    if (key !== 'expire') {
                      if (cookie.expire) {
                        $cookies.put(key, cookie[key].toString(), {
                          expires: new Date(cookie.expire)
                        });
                      } else {
                        $cookies.put(key, cookie[key].toString());
                      }
                    }
                  }
                }
                $window.location = "/app";
              } else {
                that.status = res.data;
              }
            }
          });
        }
      }
    };
  })
  .directive("loginModule", function() {
    return {
      templateUrl: "parts/login_module"
    }
  })
  .service("validate", function() {
    var validateName = function(name) {
      var err = [];
      if (!name) {
        err.push("Name cannot be empty")
        return err;
      }
      if (name.length < 8) {
        err.push("Too short : Username has to be 8 characters or above");
        return err;
      }
      if (!name.match(/[a-zA-Z\s]*/)) {
        err.push("Invalid characters in the name");
        return err;
      }
      return null;
    }
    var validatEmail = function(email) {
      var err = [];
      if (!email) {
        err.push("Eamil cannot be empty")
        return err;
      }
      if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
        err.push("Invalid email format");
        return err;
      }
      return null;
    }
    var validatePassword = function(pw, pw2) {
      var err = [];
      if (!pw || !pw2) {
        err.push("You have not entered the password")
        return err;
      }

      if (pw !== pw2) {
        err.push("Password is different");
        return err;
      }
      return null;
    }
    this.signupvalidate = function(name, email, pw1, pw2) {
      var nameMsg = validateName(name);
      var emailMsg = validatEmail(email);
      var psMsg = validatePassword(pw1, pw2);
      if (!nameMsg && !emailMsg && !psMsg) {
        return null;
      } else {
        return {
          name: nameMsg,
          email: emailMsg,
          pw: psMsg
        }
      }
    }

  })
  .factory("loginSignupFactory", function($http) {
    var loginSignupFactory = {};
    var url = "/api/";
    loginSignupFactory.login = function(loginInfo) {
      return $http.post(url + "login", JSON.stringify(loginInfo));
    }
    loginSignupFactory.signup = function(signupInfo) {
      return $http.post(url + "signup", JSON.stringify(signupInfo));
    }
    return loginSignupFactory;
  });
