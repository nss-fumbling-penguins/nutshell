/* 
    module to add event listeners to the interactive elements of the friends list
    Authors: Riley Mathews
*/

const $ = require("jquery")
const showAddFriendModal = require("./showAddFriendModal")
const hideAddFriendModal = require("./hideAddFriendModal")
const clearAddFriendFormFields = require("./clearAddFriendFormField")
const addFriend = require("./addFriend")


const activateFriendsListButtons = () => {
    //handle click on the add a friend button
    $("#Friends__btn__add").click(() => {
        showAddFriendModal()
    })

    //handle click on window while modal is shown
    $(window).click((event) => {
        if (event.target.classList.contains("modal")) {
            hideAddFriendModal()
            clearAddFriendFormFields()
        }
    })

    //handle click on modal close button
    $("#Friend__modal__close").click(() => {
        hideAddFriendModal()
        clearAddFriendFormFields()
    })

    //handle click on the modal submit button
    $("#Friend__modal__btn__submit").click(() => {
        //getvalue of input field and pass it to add friend
        addFriend($("#Friend__modal__input__username").val())
        hideAddFriendModal()
        clearAddFriendFormFields()
    })

    $("#Friend__modal__input__username").keypress(function (e) {
        var key = e.which
        if (key === 13) { 
            addFriend($("#Friend__modal__input__username").val())
            hideAddFriendModal()
            clearAddFriendFormFields()
        }
    })
}

module.exports = activateFriendsListButtons