const $ = require("jquery")
const APIManager = require("../api/APIManager");
const userManager = require("../registration/UserManager");

const showEventView = () => {
    const output = $("#main-page")
    const eventView = $("<div id=\"events\"></div>")
    eventView.append(
        `
            <div id="events__header">
                <h3>Event List</h3>
                <button id="events__button__createEvent">Add Event</button>
            </div>
            <div id="events__output"></div>
        `
    )
    sessionStorage.setItem("user", JSON.stringify(4));
    const user = userManager.currentUser();
    APIManager.getFriendCollection("Events", user)
        .then(friendItems => {
            friendItems.forEach(event => {
                $("#events__output").append(`
                    <div id=event__${event.id}>
                        <h3>${event.name}</h3>
                        <h3>${event.date}</h3>
                        <h3>${event.location}</h3>
                    </div>
                    <div class="added-by">
                        <p>Added by ${event.userID}</p>
                    </div>

                `)
            })
        })
    output.append(eventView)
}
module.exports = showEventView