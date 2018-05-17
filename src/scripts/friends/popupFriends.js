/* 
    module to add popper functionality to the friends list
    Authors: Riley Mathews
*/

require("popper.js")

const activatePopup = () => {
    const popper = document.querySelector("#Show__Friends__List")
    const popup = document.querySelector("#friends")
    new Popper(popper, popup, {})
}

module.exports = activatePopup