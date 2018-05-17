/*
    module to add edit Event form to the page
    Authors: Patrick
*/
const $ = require("jquery")

const createEditEventForm = (id) => {
    //this prepopulates fields
    let eventNameToEdit = $(`#Event__card__${id} > .Event__card__content > .Event__card__name`).text();
    let eventDateToEdit = $(`#Event__card__${id} > .Event__card__content > .Event__card__date`).text();
    let eventLocationToEdit = $(`#Event__card__${id} > .Event__card__content > .Event__card__location`).text();
    const output = $("#main-page")
    output.append(
        `
            <div class="modal" id="editEvent__modal">
                <div class="modal-content">
                    <span class="close-button" id="editEvent__close">&times;</span>
                    <h1>Edit an Event</h1>
                    <p>If fields are left blank, those values will not be changed</p>
                    <input type="text" id="editEvent__input__name" value="${eventNameToEdit}">
                    <input type="date" id="editEvent__input__date" value=${eventDateToEdit}>
                    <input type="text" id="editEvent__input__location" value=${eventLocationToEdit}>
                    <button id="editEvent__button__submit">Submit</button>
                </div>
            </div>
        `
    )
}

module.exports = createEditEventForm