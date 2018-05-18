const $ = require("jquery");
const showModal = () => {
    $("#Event__modal").addClass("show-modal")
}

const activateEventHeaderButton = () => {
    $("#Events__button__createEvent").click(() => {
        showModal()
    })
}

module.exports = activateEventHeaderButton;