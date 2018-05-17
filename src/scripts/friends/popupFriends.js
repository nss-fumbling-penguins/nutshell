/* 
    module to add popper functionality to the friends list
    Authors: Riley Mathews
*/

const Popper = require("popper.js")
const $ = require("jquery")

const activatePopup = () => {
    const ref = $("#Show__Friends__List")
    const pop = $("#friends")
    const friendPopup = new Popper(ref, pop, {
        placement: "bottom",
        modifiers: {
            offset: {
                offset: "0, 14px"
            }
        },
    })
    pop.addClass("hide")
    ref.click(() => {
        friendPopup.scheduleUpdate()
        pop.toggleClass("hide")
        if (ref.text() === "Show Friends List") {
            ref.text("Hide Friends List")
        } else if (ref.text() === "Hide Friends List") {
            ref.text("Show Friends List")
        }
    })
}

module.exports = activatePopup