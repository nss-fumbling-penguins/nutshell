const APIManager = require("./api/APIManager")
const userForms = require("./registration/UserForms")
const $ = require("jquery")

//event listeners for nav buttons
$("#button-login").click(event => {
    $("#main-page").empty()
    userForms.buildLoginForm()
})

$("#button-signup").click(event => {
    $("#main-page").empty()
    userForms.buildSignUpForm()
})
