/*
    module to build an html representation of a event
    Authors: Patrick
*/

const $ = require("jquery")
const APIManager = require("../api/APIManager")
const userManager = require("../registration/UserManager")
const editEvent = require("./editEventForm");

const buildEventCard = (name, id, date, location, user, styleNextEvent) => {
    const output = $("#Events__output")
    const eventElement = $(`<div id="Event__card__${id}" class="Event__card"></div>`)
    eventElement.append(
        `   <div class="Event__card__content">
                <h3 class="Event__card__name">${name}</h3>
                <p class="Event__card__date">${date}</p>
                <p class="Event__card__location">${location}</p>
            </div>
    `)
    const userID = userManager.currentUser();
    APIManager.getOneOfCollection("Users", user).then(eventCreator => {
        if(userID === parseInt(user)){
            eventElement.append(
            `
                <div id="Event__card__${id}__buttons" class="Event__card__edit">
                    <p>Added by you</p>
                    <button id="Edit__event__${id}">edit</button>
                </div>
            `
            )
        }else{
            eventElement.append(`<div>Added by ${eventCreator.firstName}</div>`)
        }
    }).then(() =>{
        output.append(eventElement)
        if(styleNextEvent){
            $(`#Event__card__${id}`).addClass("next-event");
        }
        $(`#Edit__event__${id}`).click(() => {
            editEvent(id)
        })
    })
}


module.exports = buildEventCard