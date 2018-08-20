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
                    <div>
                    <div>
                    <label>First Name:</label>
                    <input type="text" id="first-name">
                    </div>
                    <div>
                    <label>Last Name:</label>
                    <input type="text" id="last-name">
                    </div>
                    <div>
                    <label>Email:</label>
                    <input type="text" id="email">
                    </div>
                    <div>
                    <label>Choose a user name:</label>
                    <input type="text" id="username">
                    </div>
                    <div>
                    <label>Choose a Password:</label>
                    <input type="password" id="password">
                    </div>
                    </div>
                    <input type="button" id="submit-button" value="Sign Up!">
                </section>`
            )
            $("#submit-button").click(event => {
                const username = $("#username").val()
                $.ajax(`https://rm-nutshell-api.herokuapp.com/Users?username=${username}`).then(user => {     
                        if (user.length === 0) {
                            userManager.createNewUser(
                                $("#first-name").val(), 
                                $("#last-name").val(), 
                                username, 
                                $("#password").val(), 
                                $("#email").val()
                            )
                    } else
                        alert("User name already taken, please choose another")
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
                    <div>
                    <div>
                    <label>Username:</label>
                    <input type="text" id="username">
                    </div>
                    <div>
                    <label>Password:</label>
                    <input type="password" id="password">
                    </div>
                    </div>
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