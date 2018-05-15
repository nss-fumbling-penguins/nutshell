/* 
    module to add event handlers to the buttons on the create task form, as well as the button to show it
    Authors: Riley Mathews
*/

const $ = require("jquery")
const createTaskObject = require("./createTaskObject")
const buildTaskCard = require("./buildTaskCard")
const UserManager = require("../registration/UserManager")

const activateTaskFormButtons = () => {
    $("#Tasks__button__createTask").click(() => {
        $("#Tasks__form").removeClass("hide")
    })

    $("#Tasks__button__submit").click(() => {
        $("#Tasks__form").addClass("hide")
        //get current user
        userID = UserManager.currentUser()
        //call function to send task to api
        task = createTaskObject(userID, $("#Tasks__input__title").val(), $("#Tasks__input__date").val())
        console.log(task)
        
        $("#Tasks__input__title").val("")
    })

    $("#Tasks__button__cancel").click(() => {
        $("#Tasks__form").addClass("hide")
        $("#Tasks__input__title").val("")
    })
}


module.exports = activateTaskFormButtons