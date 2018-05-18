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
    const userID = userManager.currentUser();

    APIManager.getFriendCollection("Events", userID)
        .then(friendItems => {
            //find which event is happening next
            var futureEvents = [];
            const date = new Date();
            const nowTime = date.getTime();
            futureEvents = friendItems.filter(item => Date.parse(item.date) - nowTime > 0);
            const nextEvent = futureEvents.reduce((min, event) => Date.parse(event.date) < min ? event.date : min);
            friendItems.sort((a, b) => {
                let x = Date.parse(b.date);
                let y = Date.parse(a.date);
                return x - y;
            })
            .forEach(event => {
                var styleNextEvent = false;
                if(event.id === nextEvent.id){
                    styleNextEvent = true;
                    buildEventCard(event.name, event.id, event.date, event.location, event.userID, styleNextEvent)
                    styleNextEvent = false;
                }else{
                    buildEventCard(event.name, event.id, event.date, event.location, event.userID, styleNextEvent)
                }
            })
        })
    output.append(eventView)
}
module.exports = showEventView