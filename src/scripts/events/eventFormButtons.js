
/*
    module to add event handlers to the buttons on the create Event form, as well as the button to show it
    Authors: Patrick
*/
const $ = require("jquery")
const createEventObject = require("./createEventObject")
const buildEventCard = require("./buildEventCard")
const UserManager = require("../registration/UserManager")
const APIManager = require("../api/APIManager")
const showEventView = require("./eventView")
const loadEvents = require("./loadEvents")

//functions to hold common functionality across buttons
//show the Event modal
const showModal = () => {
    $("#Event__modal").addClass("show-modal")
}

//hide the Event modal
const hideModal = () => {
    $("#Event__modal").removeClass("show-modal")
}

//clear the form fields of the Event modal
const clearFormFields = () => {
    $("#Events__input__name").val("")
    $("#Events__input__date").val("")
    $("#Events__input__location").val("")
}

//main function of module, activate event handlers for buttons
const activateEventFormButtons = () => {
    //handles click on the modal x button
    $("#Event__modal__close").click(hideModal)

    //handles click on Event submit button
    $("#Events__button__submit").click(() => {
        //get current user
        const userID = UserManager.currentUser()
        //create Event object
        const event = createEventObject(userID, $("#Events__input__name").val(), $("#Events__input__date").val(), $("#Events__input__location").val())
        //call function to send Event to api
        APIManager.createItem("Events", event)
        clearFormFields()
        hideModal()
        $("#Events__output").empty();
        loadEvents();
    })
    //handles click on the cancel Event creation button
    $("#Event__modal__close").click(() => {
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


module.exports = activateEventFormButtons