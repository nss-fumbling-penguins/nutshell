/* 
    module to delete a task completely from the database
    Authors: Riley Mathews
*/

const $ = require("jquery")
const APIManager = require("../api/APIManager")

const deleteTask = (id) => {
    APIManager.removeItem("Tasks", id)
}

module.exports = deleteTask