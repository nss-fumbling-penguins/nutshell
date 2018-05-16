/*
View Manager Module
Author: Josh Barton
This module builds the three views of the app: welcome, dashboard, and signed-out
*/
const $ = require("jquery")
const APIManager = require("../api/APIManager")
const userForms = require("../registration/UserForms")
const friendsList = require("../friends/friendsInit")
const buildChat = require("../chat/buildChat")
const UserManager = require("../registration/UserManager")


const viewManager = Object.create({}, {
    buildLandingPage: {
        value: () => {
            $("#wrapper").empty()
            console.log(UserManager.currentUser())
            if (UserManager.currentUser() === null) {
                $("#wrapper").append(
                    `<nav>
                    <h1>Nutshell</h1>
                    <input type="button" class="button-login" value="Login">
                    <input type="button" class="button-signup" value="Signup"> 
                    </nav>
                    <article id="main-page">
                    <p>Nutshell is a great way to keep track of your entire life.  Anything you can't track in Nutshell must not be that important.  Sign up today!</p>
                    <input type="button" class="button-signup" value="Signup">
                    </article>`
                )
                $(".button-login").click(event => {
                    $("#main-page").empty()
                    userForms.buildLoginForm()
                })
                $(".button-signup").click(event => {
                    $("#main-page").empty()
                    userForms.buildSignUpForm()
                })
            } else {
                viewManager.buildDashboard(UserManager.currentUser())
            }
        }
    }, 
    buildDashboard: {
		value: (id) => {
			APIManager.getOneOfCollection("Users", id).then(user => {
				$("#wrapper").empty()
                $("#wrapper").append(
					`<nav>
                    <h1>Nutshell</h1>
                    <input type="button" id="button-logout" value="Logout">
                    <span id="current-user">${user.firstName}</span>
                    </nav>
                    <article id="main-page"></article>`
                )
                $("#button-logout").click(event => {
					$("#main-page").empty()
                    const userManager = require("../registration/UserManager")
                    userManager.logOutUser()
                    viewManager.buildSignedOut()
                })
                // function to build tasks section
				const initializeTasks = require("../tasks/TasksInit")
				initializeTasks()
				// function to build chat section
				buildChat.buildChat()
                //function to build events
                // function to build news
                friendsList()
            })

        }
    }, 
    buildSignedOut: {
        value: () => {
            $("#wrapper").empty()
            $("#wrapper").append(
                `<nav>
                <h1>Nutshell</h1>
                <input type="button" class="button-login" value="Login">
                <input type="button" class="button-signup" value="Signup"> 
                </nav>
                <article id="main-page">
                <p>You are now logged out.</p>
                <input type="button" class="button-login" value="Login">
                </article>`
            )
            $(".button-login").click(event => {
                $("#main-page").empty()
                userForms.buildLoginForm()
            })
            
            $(".button-signup").click(event => {
                $("#main-page").empty()
                userForms.buildSignUpForm()
            })
        }
    }
})

module.exports = viewManager