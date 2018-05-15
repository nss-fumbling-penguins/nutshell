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
            $("#main-page").empty()
            $("#main-page").append(
                `<section id="signup-form">
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
                    <input type="password" id="password">
                    <input type="button" id="submit-button" value="Sign Up!">
                </section>`
            )
            $("#submit-button").click(event => {
                const username = $("#username").val()
                $.ajax(`http://localhost:8088/Users?username=${username}`).then(user => {     
                        if (user.length === 0) {
                            userManager.createNewUser(
                                $("#first-name").val(), 
                                $("#last-name").val(), 
                                username, 
                                $("#password").val(), 
                                $("#email").val()
                            )
                    } else
                        $("#signup-form").append("<p class='alert'>User name already taken, please choose another</p>") 
                    })
                })
        }
    },
    buildLoginForm: {
        value: () => {
            $("#main-page").empty()
            $("#main-page").append(
                `<section id="login-form">
                    <h2>Sign in:</h2>
                    <label>Username:</label>
                    <input type="text" id="username">
                    <label>Password:</label>
                    <input type="password" id="password">
                    <input type="button" id="submit-button" value="Sign In">
                </section>`
            )
            $("#submit-button").click(event => {
                const username =  $("#username").val()
                const password = $("#password").val()
                userManager.authenticate(username, password)                  
            })
        }
    }
})

module.exports = userForms