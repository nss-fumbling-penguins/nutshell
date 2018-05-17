/* 
    module to clear the fields in the add friend field
*/
const $ = require("jquery")

const clearAddFriendFormFields = () => {
    $("#Friend__modal__input__username").val("")
}

module.exports = clearAddFriendFormFields