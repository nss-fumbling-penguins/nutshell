
const showEventView = require("./eventView")
const activateEventFormButtons = require("./eventFormButtons")
const createEventForm = require("./newEventForm")
const createEditEventForm = require("./createEditEventForm")

const initializeEvents = () => {
    showEventView()
    createEventForm()
    activateEventFormButtons()
}

module.exports = initializeEvents