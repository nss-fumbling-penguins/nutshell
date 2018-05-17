const $ = require("jquery")
const APIManager = require("../api/APIManager");
const userManager = require("../registration/UserManager");
const buildEventCard = require("./buildEventCard")

const showEventView = () => {
    const output = $("#main-page")
    const eventView = $("<div id=\"Events\"></div>")
    eventView.append(
        `
            <div id="Events__header">
                <h3>Event List</h3>
                <button id="Events__button__createEvent">Add Event</button>
            </div>
            <div id="Events__output"></div>
        `
    )
    const userID = userManager.currentUser();
    APIManager.getFriendCollection("Events", userID)
        .then(friendItems => {
            friendItems.forEach(event => {
                    buildEventCard(event.name, event.id, event.date, event.location, event.userID)
        })
    })
    output.append(eventView)
}
module.exports = showEventView