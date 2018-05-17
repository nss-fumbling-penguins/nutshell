/* 
    module to add a friend
    Authors: Riley Mathews
*/

const $ = require("jquery")
const APIManager = require("../api/APIManager")
const UserManager = require("../registration/UserManager")
const buildFriendCard = require("./createFriendElement")
const friendPopup = require("./popupFriends")

const addFriend = (usernameToAdd) => {
    popup = friendPopup()
    APIManager.getAllOfCollection("Users")
        .then(response => {
            const friendToAdd = response.find(user => user.username === usernameToAdd)
            const friendId = friendToAdd.id
            //get current user
            const currentUserId = UserManager.currentUser()
            if (currentUserId === friendId) {
                alert("you can't add yourself as a friend")
            } else {
                friendCard = buildFriendCard(friendToAdd.id, friendToAdd.firstName, friendToAdd.lastName, friendToAdd.username)
                $("#Friend__output").append(friendCard)
                relationship = 
                {
                    "userID": currentUserId,
                    "followID": friendId
                }
                APIManager.createItem("Relationships", relationship)
            }
            popup.scheduleUpdate()
        })
}

module.exports = addFriend
