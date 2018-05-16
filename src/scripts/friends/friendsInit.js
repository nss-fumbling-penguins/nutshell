/* 
    module to be an entry point into friends module
    Authors: Riley Mathews
*/

const showFriendsList = require("./showFriendsList")
const createAddFriendForm = require("./addFriendForm")

const initializeFriendsList = () => {
    showFriendsList()
    createAddFriendForm()
}

module.exports = initializeFriendsList