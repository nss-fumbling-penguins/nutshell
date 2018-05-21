/* 
    module to add a friend
    Authors: Riley Mathews
*/

const $ = require("jquery")
const APIManager = require("../api/APIManager")
const UserManager = require("../registration/UserManager")
const buildFriendCard = require("./createFriendElement")

const addFriend = (usernameToAdd) => {
    let duplicateFriend = false
    APIManager.getAllOfCollection("Users")
        .then(response => {
            const friendToAdd = response.find(user => user.username === usernameToAdd)
            if (friendToAdd !== undefined) {
                const friendId = friendToAdd.id
                //get current user
                const currentUserId = UserManager.currentUser()
                //get friends of current user
                APIManager.getAllOfCollection("relationships")
                    .then(response => {
                        //loop through responses and see if relationship already exists
                        response.forEach(relationship => {
                            // if so throw an alert and set duplicate frind condition to true
                            if (friendId === parseInt(relationship.followID) && currentUserId === parseInt(relationship.userID)) {
                                alert("You are already friends!")
                                duplicateFriend = true
                            }
                        })
                        // check to see if a duplicate friend was found
                        if (duplicateFriend === false) {
                            // if duplicate friend was false, run code to add friend and print new card to dom
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
                        } //end of duplicate friend if statement
                    }) //end of get relationships ajax request
            } else {
                //if the user was not found in the users database
                alert("Couldn't find that user, they must not be cool enough for nutshell ;)")
            }
        })
}

module.exports = addFriend
