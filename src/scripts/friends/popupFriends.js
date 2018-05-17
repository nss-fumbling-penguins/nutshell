/* 
    module to add popper functionality to the friends list
    Authors: Riley Mathews
*/

const Popper = require("popper.js")
const $ = require("jquery")

const activatePopup = () => {
    const ref = $("#Show__Friends__List")
    const pop = $("#friends")
    new Popper(ref, pop, {})
    pop.addClass("hide")
    ref.click(() => {
        pop.toggleClass("hide")
        if (ref.text() === "Show Friends List") {
            ref.text("Hide Friends List")
        } else if (ref.text() === "Hide Friends List") {
            ref.text("Show Friends List")
        }
    })
}

module.exports = activatePopup