/* 
    module to add a friend
    Authors: Riley Mathews
*/

APIManager = require("../api/APIManager")
UserManager = require("../registration/UserManager")

const addFriend = (usernameToAdd) => {
    APIManager.getAllOfCollection("Users")
        .then(response => {
            const friendToAdd = response.find(user => user.username === usernameToAdd)
            const friendId = friendToAdd.id
            //get current user
            const currentUserId = UserManager.currentUser()
            relationship = 
            {
                "userID": currentUserId,
                "followID": friendId
            }
            APIManager.createItem("Relationships", relationship)
        })
}

module.exports = addFriend
