/* 
    module to add event handlers to the buttons on the create task form, as well as the button to show it
    Authors: Riley Mathews
*/

const $ = require("jquery")
const createTaskObject = require("./createTaskObject")
const buildTaskCard = require("./buildTaskCard")
const UserManager = require("../registration/UserManager")
const APIManager = require("../api/APIManager")

//functions to hold common functionality across buttons
//show the task modal
const showModal = () => {
    $("#Task__modal").addClass("show-modal")
}

//hide the task modal
const hideModal = () => {
    $("#Task__modal").removeClass("show-modal")
}

//clear the form fields of the task modal
const clearFormFields = () => {
    $("#Tasks__input__title").val("")
    $("#Tasks__input__date").val("")
}

//main function of module, activate event handlers for buttons
const activateTaskFormButtons = () => {
    //handles click on the create new task button
    $("#Tasks__button__createTask").click(() => {
        showModal()
    })

    //handles click on the modal x button
    $("#Task__modal__close").click(hideModal)

    //handles click on task submit button
    $("#Tasks__button__submit").click(() => {
        
        //get current user
        userID = UserManager.currentUser()
        //create task object
        task = createTaskObject(userID, $("#Tasks__input__title").val(), $("#Tasks__input__date").val())
        //call function to send task to api
        APIManager.createItem("Tasks", task)
            .then(response => {
                title = response.name
                id = response.id
                dueDate = response.dueDate
                //take the response and append a new card to the dom based on the new task item
                buildTaskCard(title, id, dueDate)
            })
        
        clearFormFields()
        hideModal()
    })

    //handles click on the cancel task creation button
    $("#Task__modal__close").click(() => {
        hideModal()
        clearFormFields()
    })

    //handles click on the window and closes modal if shown
    $(window).click((event) => {
        if (event.target.classList.contains("modal")) {
            hideModal()
        }
    })
}


module.exports = activateTaskFormButtons