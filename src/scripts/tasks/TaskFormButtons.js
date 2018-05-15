/* 
    module to add event handlers to the buttons on the create task form, as well as the button to show it
    Authors: Riley Mathews
*/

const $ = require("jquery")

const activateTaskFormButtons = () => {
    $("#Tasks__button__createTask").click(() => {
        $("#Tasks__form").removeClass("hide")
    })

    $("#Tasks__button__cancel").click(() => {
        $("#Tasks__form").addClass("hide")
    })
}


module.exports = activateTaskFormButtons