/* 
    module to create a friend element in html
    Authors: Riley Mathews
*/

const $ = require("jquery")
const removeFriend = require("./removeFriend")

const buildFriendCard = (id, firstName, lastName, userName) => {
    //create card parent div
    const friendCard = $(`<div id="Friend__${id}" class="Friend__card"></div>`)
    //append static content
    friendCard.append(
        `
            <h3>${firstName} ${lastName}</h3>
            <p>User Name: ${userName}</p>
            <button class="Friend__remove" id="Friend__btn__remove__${id}">Remove</button>
        `
    )
    //handle click event on button button element
    friendCard.click((event) => {
        if (event.target.classList.value === "Friend__remove") {
            removeFriend(firstName, id)
        }
    })
    //append button to friend card
    // friendCard.append(removeFriendButton)
    return friendCard
}

module.exports = buildFriendCard