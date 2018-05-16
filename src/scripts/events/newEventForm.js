
/*
    module to create modal form for adding a new event
    Authors: Patrick Murphy
*/

const $ = require("jquery")


// file to eventually hold create event form as modal popup
const createEventForm = () => {
    const output = $("#main-page")
    output.append(
        `
        <div class="modal" id="Event__modal">
            <div class="modal-content">
                <span class="close-button" id="Event__modal__close">&times;</span>
                <h1>Create a new event.</h1>
                <input type="text" id="Events__input__name" placeholder="name">
                <input type="date" id="Events__input__date" placeholder="MM/DD/YYYY">
                <input type="text" id="Events__input__location" placeholder="location">
                <button id="Events__button__submit">Submit</button>
            </div>
        </div>
        `
    )
}


module.exports = createEventForm

