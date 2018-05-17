// /* 
//     module to handle click event on popup
//     Authors: Riley Mathews
// */

// const $ = require("jquery")
// const popup = require("./popupFriends")


// const activatePopup = () => {
//     const friendPopup = popup()
//     const ref = $("#Show__Friends__List")
//     const pop = $("#friends")
//     pop.addClass("hide")
//     $("#Show__Friends__List").click(() => {
//         friendPopup.scheduleUpdate()
//         pop.toggleClass("hide")
//         if (ref.text() === "Show Friends List") {
//             ref.text("Hide Friends List")
//         } else if (ref.text() === "Hide Friends List") {
//             ref.text("Show Friends List")
//         }
//     })
// }

// module.exports = activatePopup