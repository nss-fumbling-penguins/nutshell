/* 
    module to handle adding functionality to the buttons generated on the task cards
    Authors: Riley Mathews
*/

const $ = require("jquery")

const activateTaskCardButtons = () => {
    $(".Task__card").click(() => {
        console.log("card clicked")
    })
    console.log("cards activated")
}

module.exports = activateTaskCardButtons