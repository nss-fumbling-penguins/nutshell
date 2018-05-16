
const $ = require("jquery")
const newEventForm = require("./newEventForm")

const activateEventFormButtons = () => {
    $("#events__button__createEvent").click(() => {
        newEventForm();
        // $("#events__form").removeClass("hide")
    })

    $("#events__button__cancel").click(() => {
        $("#events__form").addClass("hide")
    })
}


module.exports = activateEventFormButtons