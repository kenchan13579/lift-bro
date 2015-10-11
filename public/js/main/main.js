"use strict"
var main = angular.module("main", []);

main
    .controller("mainCtrl", function($scope, loginSignupFactory, validate) {
        $scope.signup = {
            submit: function() {
                    this.errMsg = {};
                    this.errMsg = validate.signupvalidate(this.name, this.email, this.password, this.verifyPassword);
                    for (var obj in this.errMsg) {
                        console.log("%a",this.errMsg[obj]);
                    }
                    if (!this.errMsg) {
                        loginSignupFactory.signup({
                            username: this.name,
                            email: this.email,
                            password: this.password
                        }).then(function(res) {
                            console.log("success");
                        }, function(res) {
                            console.log("%s %s %s %s",this.name ,this.email ,this.password ,this.verifyPassword)
                        })
                    }

            }
        }
        $scope.signupWindow = {
            show: false,
            toggle: function() {
                this.show = !this.show;
            }
        }

    })
    .directive("loginModule", function() {
        return {
            templateUrl: "/views/parts/login_module.html"
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
            }
            if (!name.match(/[a-zA-Z\s]*/)) {
                err.push("Invalid characters in the name");
            }
            return err;
        }
        var validatEmail = function(email) {
            var err = [];
            if (!email) {
                 err.push("Eamil cannot be empty")
                 return err;
            }
            if (!email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
                err.push("Invalid email format");
            }
            return err;
        }
        var validatePassword = function(pw, pw2) {
            var err = [];
            if ( !pw || !pw2) {
                 err.push("You have not entered the password")
                 return err;
            }

            if (pw !== pw2) {
                 err.push("Password is different");
            }
            return err;
        }
        this.signupvalidate = function(name, email, pw1, pw2) {
            var nameMsg = validateName(name);
            var emailMsg = validatEmail(email);
            var psMsg = validatePassword(pw1, pw2);
            if (!(nameMsg && emailMsg && psMsg)) {
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
            return $http.post(url + "login", loginInfo);
        }
        loginSignupFactory.signup = function(signupInfo) {
            return $http.post(url + "signup", signupInfo);
        }
        return loginSignupFactory;
    });
