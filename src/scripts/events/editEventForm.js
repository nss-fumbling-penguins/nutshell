/*
    module to create modal form for editing a event
    Authors: Patrick
*/

const $ = require("jquery")
const APIManager = require("../api/APIManager")
const createEventObject = require("./createEventObject")
const UserManager = require("../registration/UserManager")

const hideModal = () => {
    $("#editEvent__modal").removeClass("show-modal")
}


// file to eventually hold create Event form as modal popup
const editEvent = (id) => {


    //handle events that should close modal
    $("#editEvent__modal").addClass("show-modal")
    $(window).click(event => {
        if (event.target.classList.contains("modal")) {
            hideModal()
        }
    })
    $("#editEvent__close").click(hideModal)

    //handle submit button click
    $("#editEvent__button__submit").click(() => {
        //declare an initial variable that will be used to check if the event was actually changed
        let eventChanged = false

        //get the values of the edit event form fields
        let newName = $("#editEvent__input__name").val()
        let newDate = $("#editEvent__input__date").val()
        let newLocation = $("#editEvent__input__location").val()


        //check to see if a value was present in the new name field
        //if true mark that the event was changed and edit the corresponding card
        if (newName !== "") {
            eventChanged = true
            $(`#Event__card__${id} > .Event__card__name`).text(newName)
        } else {
            newName = $(`#Event__card__${id} > .Event__card__name`).text()
        }
        //do the same as above for date value
        if (newDate !== "") {
            eventChanged = true
            $(`#Event__card__${id} > .Event__card__date`).text(`Date: ${newDate}`)
        } else {
            newDate = $(`#Event__card__${id} > .Event__card__date`).text()
        }
        if (newLocation !== "") {
            eventChanged = true
            $(`#Event__card__${id} > .Event__card__location`).text(`Location: ${newLocation}`)
        } else {
            newLocation = $(`#Event__card__${id} > .Event__card__location`).text()
        }

        //finally check to see if the event was changed at all
        //if true, create a new event object and use api manager to update the corresponding object in database
        if (eventChanged === true) {
            currentUserID = UserManager.currentUser()
            newEvent = createEventObject(currentUserID, newName, newDate, newLocation)
            APIManager.updateItem("Events", id, newEvent)
        }
        hideModal()
    })
}

module.exports = editEvent