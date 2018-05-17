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
    return friendPopup
}

module.exports = activatePopup