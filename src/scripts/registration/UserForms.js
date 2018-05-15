/*
User Forms Module
Author: Joshua Barton
This module builds forms in the main view for log in and signup
*/

const $ = require("jquery")
const userManager = require("./UserManager")
const APIManager = require("../api/APIManager")

const userForms = Object.create({}, {
    buildSignUpForm: {
        value: () => {
            $("#main-page").append(
                `<section id="signup-form>
                    <h2>Create a new Account:</h2>
                    <label>First Name:</label>
                    <input type="text" id="first-name">
                    <label>Last Name:</label>
                    <input type="text" id="last-name">
                    <label>Email:</label>
                    <input type="text" id="email">
                    <label>Choose a user name:</label>
                    <input type="text" id="username">
                    <label>Choose a Password:</label>
                    <input type="text" id="password">
                    <input type="button" id="submit-button" value="Sign Up!">
                </section>`
            )
            $("#submit-button").click(event => {
                APIManager.getAllOfCollection("Users").then(users => {
                    users.forEach(user => {
                        if (user.username === $("#username").val()) {
                            $("#signup-form").append("<p class='alert'>User name already taken, please choose another</p>")
                        } else {
                            userManager.createNewUser($("#first-name").val(), $("#last-name").val(), $("#username").val(), $("#password").val(), $("#email").val())
                            APIManager.getAllOfCollection("Users").then(users => {
                                const id = users.find(user => user.username === $("#username")).id
                                userManager.logInUser(id)
                            })
                        }
                    })
                })
            })
        }
    }, 
    buildLoginForm: {
        value: () => {
            $("#main-page").append(
                `<section id="login-form>
                    <h2>Sign in:</h2>
                    <label>Username:</label>
                    <input type="text" id="username">
                    <label>Password:</label>
                    <input type="text" id="password">
                    <input type="button" id="submit-button" value="Sign In">
                </section>`
            )
            $("#submit-button").click(event => {
                 const username =  $("#username").val()
                 const password = $("#password").val()
                 if ( userManager.authenticated($(username, password)) ) {
                    APIManager.getAllOfCollection("Users").then(users => {
                        const id = users.find(user => user.username === $("#username")).id
                        userManager.logInUser(id)
                        })  
                 } else {
                        alert("Username and/or password incorrect.  Please try again")
                    }
            })
        }
    }
})

module.exports = userForms