/* 
    module to add event listeners to the interactive elements of the friends list
    Authors: Riley Mathews
*/

const $ = require("jquery")


const activateFriendsListButtons = () => {
    $("#Friends__btn__add").click(() => {
        console.log("adding friend!")
    })
}

module.exports = activateFriendsListButtons