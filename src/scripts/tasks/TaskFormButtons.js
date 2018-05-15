/* 
    module to add event handlers to the buttons on the create task form, as well as the button to show it
    Authors: Riley Mathews
*/

const $ = require("jquery")
const createTaskObject = require("./createTaskObject")
const buildTaskCard = require("./buildTaskCard")
const UserManager = require("../registration/UserManager")
const APIManager = require("../api/APIManager")

const activateTaskFormButtons = () => {
    $("#Tasks__button__createTask").click(() => {
        $("#Tasks__form").removeClass("hide")
    })

    $("#Tasks__button__submit").click(() => {
        $("#Tasks__form").addClass("hide")
        //get current user
        userID = UserManager.currentUser()
        //create task object
        task = createTaskObject(userID, $("#Tasks__input__title").val(), $("#Tasks__input__date").val())
        //call function to send task to api
        APIManager.createItem("Tasks", task)
            .then(response => {
                console.log(response)
                title = response.name
                id = response.id
                dueDate = response.dueDate
                //take the response and append a new card to the dom based on the new task item
                $("#Tasks__output").append(buildTaskCard(title, id, dueDate))
            })
        
        $("#Tasks__input__title").val("")
    })

    $("#Tasks__button__cancel").click(() => {
        $("#Tasks__form").addClass("hide")
        $("#Tasks__input__title").val("")
    })
}


module.exports = activateTaskFormButtons