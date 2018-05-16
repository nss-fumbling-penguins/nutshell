/* 
    module to show friends list on the dom
    Authors: Riley Mathews
*/

const $ = require("jquery")
const APIManager = require("../api/APIManager")
const UserManager = require("../registration/UserManager")
const removeFriend = require("./removeFriend")
const activateFriendsListButtons = require("./friendsListEventHandlers")

const showFriendsList = () => {
    const output = $("#main-page")
    const friendsList = $("<div id=\"friends\"><h2>Friends:</h2><button id=\"Friends__btn__add\">Add Friend</button></div>")

    //get friends
    //get database
    APIManager.getAllDatabase()
        .then(response => {

            //get relationships collection
            const relationships = response.Relationships
            //get users collection
            const users = response.Users
            //get current user
            const currentUser = UserManager.currentUser()

            //filter array by current user id
            const friendIntersections = relationships.filter(relationship => parseInt(relationship.userID) === currentUser)
            const friendIds = friendIntersections.map(intersection => parseInt(intersection.followID))
            //iterate through users and find users by friends id
            const friends = users.filter(user => friendIds.includes(user.id))

            //take friends collection and make an element for each of them
            friends.forEach(friend => {
                //create card parent div
                const friendCard = $(`<div id="Friend__${friend.id}"></div>`)
                //append static content
                friendCard.append(
                    `
                        <h3>${friend.firstName} ${friend.lastName}</h3>
                        <p>User Name: ${friend.username}</p>
                        <button class="Friend__remove" id="Friend__btn__remove__${friend.id}">Remove</button>
                    `
                )
                //handle click event on button button element
                friendCard.click((event) => {
                    if (event.target.classList.value === "Friend__remove") {
                        removeFriend(friend.firstName, friend.id)
                    }
                })
                //append button to friend card
                // friendCard.append(removeFriendButton)
                //append card to parent list
                friendsList.append(friendCard)
            })
            //append parent list to main page
            output.append(friendsList)
            activateFriendsListButtons()
        })

    //run function for each friend returned
}

module.exports = showFriendsList