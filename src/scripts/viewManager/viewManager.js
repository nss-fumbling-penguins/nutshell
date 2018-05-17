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
const initializeNews = require("../news/newsInit")
const UserManager = require("../registration/UserManager")


const viewManager = Object.create({}, {
    buildLandingPage: {
        value: () => {
            $("#wrapper").empty()
            if (UserManager.currentUser() === null) {
                $("#wrapper").append(
                    `<nav>
<<<<<<< HEAD
                    <h1>Nutshell</h1>
                    <input type="button" class="button-login" value="Login">
                    <input type="button" class="button-signup" value="Signup">
=======
                    <h1 id="brand">Nutshell</h1>
                    <ul>
                    <li><input type="button" class="button-login" value="Login"></li>
                    <li><input type="button" class="button-signup" value="Signup"></li>
                    </ul>
>>>>>>> master
                    </nav>
                    <article id="main-page" class="landing">
                    <p id="welcome-message">Nutshell is a great way to keep track of your entire life.  Anything you can't track in Nutshell must not be that important.  Sign up today!</p>
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
                    <h1 id="brand">Nutshell</h1>
                    <ul>
                    <li><input type="button" id="button-logout" value="Logout"></li>
                    <li><span id="current-user">${user.firstName.charAt().toUpperCase()}</span></l>
                    </ul>
                    </nav>
                    <article id="main-page" class="dashboard"></article>`
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
                //function to build events section
                const initializeEvents = require("../events/initEvents")

				// function to build chat section
				buildChat.buildChat()
                //function to build events

                // function to build news
                initializeNews()
                initializeEvents()
                //function to list friends
                friendsList()
            })

        }
    },
    buildSignedOut: {
        value: () => {
            $("#wrapper").empty()
            $("#wrapper").append(
                `<nav>
<<<<<<< HEAD
                <h1>Nutshell</h1>
                <input type="button" class="button-login" value="Login">
                <input type="button" class="button-signup" value="Signup">
=======
                <h1 id="brand">Nutshell</h1>
                <ul>
                <li><input type="button" class="button-login" value="Login"></li>
                <li><input type="button" class="button-signup" value="Signup"></li>
                </ul>
>>>>>>> master
                </nav>
                <article id="main-page" class="logged-out">
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