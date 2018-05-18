/*
    module to add functionality to event cards as they are created
    Authors:Patrick
*/

const $ = require("jquery")
const editEvent = require("./editEventForm")
const deleteEvent = require("./deleteEvent")
const APIManager = require("../api/APIManager")

const activateEventCardButtons = (id) => {
    //add event listeners to buttons

    //edit Event
    $(`#Edit__event__${id}`).click(() => {
        editEvent(id)
    })
}

module.exports = activateEventCardButtons