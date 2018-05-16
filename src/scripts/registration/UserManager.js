/*
User Manager Module
Author: Joshua Barton
This module creates users, logs in and out, gets current user.
*/
const $ = require("jquery")
const APIManager = require("../api/APIManager")




const userManager = Object.create({}, {
    createNewUser: {
        value: (first, last, username, pass, email) => {
            APIManager.createItem("Users", {
                "firstName": `${first}`,
                "lastName": `${last}`,
                "username": `${username}`,
                "password": `${pass}`,
                "email": `${email}`
            })
                .then(newUser => {
                    const id = newUser.id
                    userManager.logInUser(id)
                })
        }
    },
    authenticate: {
        value: (username, pass) => {
            APIManager.getAllOfCollection("Users").then(users => {
                const user = users.find(user => user.username === username)
                if (!user) {
                    alert("Username does not match our records, try again")
                } else if (user.password === pass) {
                    userManager.logInUser(user.id)
                } else {
                    alert("Incorrect Password, please try again.")
                }
            })
        }
    },
    logInUser: {
        value: (id) => {
            sessionStorage.setItem("user", id)
            const viewManager = require("../viewManager/viewManager")
            viewManager.buildDashboard(id)
        }
    },
    logOutUser: {
        value: () => {
            sessionStorage.removeItem("user")
            const viewManager = require("../viewManager/viewManager")
            viewManager.buildSignedOut()
        }

    }, 
    currentUser: {

        value: () => {return JSON.parse(sessionStorage.getItem("user"))}

    }
})

module.exports = userManager
