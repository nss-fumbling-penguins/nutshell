
const showEventView = require("./eventView")
const activateEventFormButtons = require("./eventFormButtons")
const createEventForm = require("./newEventForm")
const createEditEventForm = require("./createEditEventForm")
const loadEvents = require("./loadEvents");


const initializeEvents = () => {
    showEventView()
    loadEvents();
    createEventForm()
}

module.exports = initializeEvents