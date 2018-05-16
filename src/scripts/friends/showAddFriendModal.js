/* 
    module to handle showing the add friend modal
*/

const $ = require("jquery")

const showAddFriendModal = () => {
    $("#Friend__modal").addClass("show-modal")
    $("#Friend__modal__input__username").focus()
}

module.exports = showAddFriendModal