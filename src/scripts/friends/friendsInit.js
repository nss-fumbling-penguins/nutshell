/* 
    module to be an entry point into friends module
    Authors: Riley Mathews
*/

const showFriendsList = require("./showFriendsList")
const createAddFriendForm = require("./addFriendForm")
// const activatePopup = require("./popupFriends")
// const activatePopupHandlers = require("./popupEventHandler")

const initializeFriendsList = () => {
    showFriendsList()
    createAddFriendForm()
    // activatePopup()
    // activatePopupHandlers()
}

module.exports = initializeFriendsList