/* 
    module to handle hiding the add friend modal
*/

const $ = require("jquery")

const hideAddFriendModal = () => {
    $("#Friend__modal").removeClass("show-modal")
}

module.exports = hideAddFriendModal