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
    //delete event
    $(`#Delete__event__${id}`).click(() => {
        deleteTask(id)
        $(`#Event__card__${id}`).remove()
    })

    //edit Event
    $(`#Edit__event__${id}`).click(() => {
        editEvent(id)
    })

    //complete event
    $(`#Complete__event__${id}`).click(() => {
        $(`#Event__card__${id}__buttons`).empty()
        $(`#Event__card__${id}__buttons`).append("<p class=\"complete\">complete</p>")
        APIManager.getOneOfCollection("Events", id)
            .then(response => {
                response.completed = true
                APIManager.updateItem("Events", id, response)
            })
    })
}

module.exports = activateEventCardButtons