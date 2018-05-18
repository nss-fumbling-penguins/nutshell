const userManager = require("../registration/UserManager");
const APIManager = require("../api/APIManager");
const buildEventCard = require("./buildEventCard");

const loadEvents = () =>{
    const userID = userManager.currentUser();
    APIManager.getFriendCollection("Events", userID)
        .then(friendItems => {
            //find which event is happening next
            var futureEvents = [];
            const date = new Date();
            const nowTime = date.getTime();
            futureEvents = friendItems.filter(item => Date.parse(item.date) - nowTime > 0);
            const nextEvent = futureEvents.reduce(function(prev, curr) {
                return Date.parse(prev.date) < Date.parse(curr.date) ? prev : curr;
            });
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
                }
                else{
                    buildEventCard(event.name, event.id, event.date, event.location, event.userID, styleNextEvent)
                }
            })
        })
}

module.exports = loadEvents;