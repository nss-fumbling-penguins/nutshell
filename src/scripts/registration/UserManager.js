/*
User Manager Module
Author: Joshua Barton
This module creates users, logs in and out, gets current user.
*/
const $ =require("jquery")
const APIManager = require("../api/APIManager")


const userManager = Object.create({}, {
    createNewUser: {
        value: (first, last, username, pass, email) => {
            APIManager.createItem("Users", {
                "firstName": `${first}`,
                "lastName": `${last}`,
                "username": `${username}`,
                "password": `${pass}`, 
                "email": `${email}`}).then(newUser => {
                const id = newUser.id
                userManager.logInUser(id)
            })
        }
    },
    authenticated: {
        value: (username, pass) => {
            APIManager.getAllOfCollection("Users").then(users => {  const user = users.find(user => user.username === username)
                if (!user) {
                    return false
                } else if (user.password === pass) {
                    return true
                } else {
                    return false
                }
            })
        }
    }, 
    logInUser: {
        value: (id) => {
            APIManager.getOneOfCollection("Users", id).then(user => {
            sessionStorage.setItem("user", JSON.stringify(user.id))
            })
            /*function to build dashboard view */}
    }, 
    logOutUser: {
        value: () => {sessionStorage.removeItem("user")}
        /*function to build the signout view*/
    }, 
    currentUser: {
        value: () => {JSON.parse(sessionStorage.getItem("user"))}
    }
})

module.exports = userManager
