/*
    module to build an html representation of a event
    Authors: Patrick
*/

const $ = require("jquery")
const APIManager = require("../api/APIManager")
const activateEventCardButtons = require("./eventCardEventHandlers")
const userManager = require("../registration/UserManager")

const buildEventCard = (name, id, date, location, user) => {
    const output = $("#Events__output")
    const eventElement = $(`<div id="Event__card__${id}" class="Event__card"></div>`)
    eventElement.append(
        `
            <h3 class="Event__card__name">${name}</h3>
            <p class="Event__card__date">${date}</p>
            <p class="Event__card__location">${location}</p>
    `)
    const userID = userManager.currentUser();
    APIManager.getOneOfCollection("Users", user).then(eventCreator => {
        if(userID === parseInt(user)){
            eventElement.append(
            `   <p>Added by you</p>
                <div id="Event__card__${id}__buttons">
                    <button id="Edit__event__${id}">edit</button>
                </div>
            `
            )
        }else{
            eventElement.append(`<p>Added by ${eventCreator.firstName}</p>`)
        }
    })
    output.append(eventElement)
    activateEventCardButtons(id)
}


module.exports = buildEventCard