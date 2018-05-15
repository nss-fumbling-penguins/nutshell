/* 
    module to add event handlers to the buttons on the create task form, as well as the button to show it
    Authors: Riley Mathews
*/

const $ = require("jquery")
const buildTaskCard = require("./buildTaskCard")

const activateTaskFormButtons = () => {
    $("#Tasks__button__createTask").click(() => {
        $("#Tasks__form").removeClass("hide")
    })

    $("#Tasks__button__submit").click(() => {
        $("#Tasks__form").addClass("hide")
        //call function to send task to api
        $("#Tasks__input__title").val("")
        
    })

    $("#Tasks__button__cancel").click(() => {
        $("#Tasks__form").addClass("hide")
        $("#Tasks__input__title").val("")
    })
}


module.exports = activateTaskFormButtons