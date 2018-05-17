/* 
    module to show friends list on the dom
    Authors: Riley Mathews
*/

const $ = require("jquery")
const APIManager = require("../api/APIManager")
const UserManager = require("../registration/UserManager")
const removeFriend = require("./removeFriend")
const activateFriendsListButtons = require("./friendsListEventHandlers")
const buildFriendCard = require("./createFriendElement")

const showFriendsList = () => {
    const output = $("#main-page")
    const friendsList = $("<div id=\"friends\"><h3>Friends</h3><button id=\"Friends__btn__add\">Add Friend</button></div>")
    const friendOutput = $("<div id=\"Friend__output\"></div>")
    friendsList.append(friendOutput)
    output.append(friendsList)
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
                friendCard = buildFriendCard(friend.id, friend.firstName, friend.lastName, friend.username)
                //append card to parent list
                friendOutput.append(friendCard)
            })
            //append parent list to main page
            
            activateFriendsListButtons()
        })

    //run function for each friend returned
}

module.exports = showFriendsList