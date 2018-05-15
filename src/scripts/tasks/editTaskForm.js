/* 
    module to create modal form for editing a task
    Authors: Riley Mathews
*/

const $ = require("jquery")
const APIManager = require("../api/APIManager")
const createTaskObject = require("./createTaskObject")
const UserManager = require("../registration/UserManager")

const hideModal = () => {
    $("#editTask__modal").removeClass("show-modal")
}


// file to eventually hold create task form as modal popup
const editTask = (id) => {

    console.log("editing", id)

    //handle events that should close modal
    $("#editTask__modal").addClass("show-modal")
    $(window).click(event => {
        if (event.target.classList.contains("modal")) {
            hideModal()
        }
    })
    $("#editTask__close").click(hideModal)

    //handle submit button click
    $("#editTask__button__submit").click(() => {
        //declare an initial variable that will be used to check if the task was actually changed
        let taskChanged = false

        //get the values of the edit task form fields
        let newTitle = $("#editTask__input__title").val()
        let newDate = $("#editTask__input__date").val()

        //check to see if a value was present in the new title field
        //if true mark that the task was changed and edit the corresponding card
        if (newTitle !== "") {
            taskChanged = true
            $(`#Task__card__${id} > .Task__card__title`).text(newTitle)
        } else {
            newTitle = $(`#Task__card__${id} > .Task__card__title`).text()
        }
        //do the same as above for date value
        if (newDate !== "") {
            taskChanged = true
            $(`#Task__card__${id} > .Task__card__date`).text(`Due: ${newDate}`)
        } else {
            newDate = $(`#Task__card__${id} > .Task__card__date`).text()
        }

        //finally check to see if the task was changed at all
        //if true, create a new task object and use api manager to update the corresponding object in database
        if (taskChanged === true) {
            currentUserID = UserManager.currentUser()
            newTask = createTaskObject(currentUserID, newTitle, newDate)
            APIManager.updateItem("Tasks", id, newTask)
        }
        hideModal()
    })
}

module.exports = editTask