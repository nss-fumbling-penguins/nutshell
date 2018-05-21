const $ = require("jquery")
const APIManager = require("../api/APIManager");
const userManager = require("../registration/UserManager");
const buildEventCard = require("./buildEventCard")

const showEventView = () => {
    const output = $("#main-page")
    const eventView = $("<div id=\"Events\" class='component'></div>")
    eventView.append(
        `
            <div id="Events__header" class="component__header">
                <h3 class="component__header__title">Event List</h3>
                <button id="Events__button__createEvent" class="component__header__button">Add Event</button>
            </div>
            <div id="Events__output" class="component__output"></div>
        `
    )
    output.append(eventView)
    $("#Events__button__createEvent").click(() => {
        $("#Event__modal").addClass("show-modal")
    })
}

module.exports = showEventView