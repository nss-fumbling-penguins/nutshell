/* 
    module to add popper functionality to the friends list
    Authors: Riley Mathews
*/

const Popper = require("popper.js")

const activatePopup = () => {
    const ref = document.querySelector("#Show__Friends__List")
    const pop = document.querySelector("#friends")
    new Popper(ref, pop, {
        modifiers: {
            preventOverflow: { enabled: false }
        }
    })
}

module.exports = activatePopup