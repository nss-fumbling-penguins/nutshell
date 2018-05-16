/* 
    module to add a friend
    Authors: Riley Mathews
*/

const $ = require("jquery")
const APIManager = require("../api/APIManager")
const UserManager = require("../registration/UserManager")
const buildFriendCard = require("./createFriendElement")

const addFriend = (usernameToAdd) => {
    APIManager.getAllOfCollection("Users")
        .then(response => {
            const friendToAdd = response.find(user => user.username === usernameToAdd)
            const friendId = friendToAdd.id
            //get current user
            const currentUserId = UserManager.currentUser()
            friendCard = buildFriendCard(friendToAdd.id, friendToAdd.firstName, friendToAdd.lastName, friendToAdd.username)
            $("#friends").append(friendCard)
            relationship = 
            {
                "userID": currentUserId,
                "followID": friendId
            }
            APIManager.createItem("Relationships", relationship)
        })
}

module.exports = addFriend