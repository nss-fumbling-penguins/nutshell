/*
    module to build an html representation of a event
    Authors: Patrick
*/

const $ = require("jquery")
const activateEventCardButtons = require("./eventCardEventHandlers")

const buildEventCard = (name, id, date, location) => {
    const output = $("#Events__output")
    const eventElement = $(`<div id="Event__card__${id}" class="Event__card"></div>`)
    eventElement.append(
        `
            <h3 class="Event__card__name">${name}</h3>
            <p class="Event__card__date">${date}</p>
            <p class="Event__card__location">${location}</p>
            <div class="added-by">
                <p>Added by ${id}</p>
            </div>
            <div id="Event__card__${id}__buttons">
                <button id="Edit__event__${id}">edit</button>
            </div>
        `
    )
    output.append(eventElement)
    activateEventCardButtons(id)

}


module.exports = buildEventCard