/* 
    module to handle showing the add friend modal
*/

const $ = require("jquery")

const showAddFriendModal = (friendToAdd) => {
    if (typeof friendToAdd !== null) {
        $("#Friend__modal__input__username").val(friendToAdd)
    }
    $("#Friend__modal").addClass("show-modal")
    $("#Friend__modal__input__username").focus()
}

module.exports = showAddFriendModal