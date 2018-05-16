/* 
    module to remove a friend
    Authors: Riley Mathews
*/

const $ = require("jquery")
APIManager = require("../api/APIManager")
UserManager = require("../registration/UserManager")

const removeFriend = (name, id) => {
    //confirmation
    if (confirm(`Remove ${name}? :(`)) {
        //remove card from dom
        $(`#Friend__${id}`).remove()
        //get relationships
        APIManager.getAllOfCollection("Relationships")
            .then(response => {
                //get current user id
                const currentUserId = UserManager.currentUser()
                //find the intersection relationship object
                const relationship = response.find(intersection => parseInt(intersection.userID) === parseInt(currentUserId) && parseInt(intersection.followID) === parseInt(id))
                //get the id of the intersection object
                const relationshipID = relationship.id
                //delete that object
                APIManager.removeItem("Relationships", relationshipID)
            })
    }
}

module.exports = removeFriend