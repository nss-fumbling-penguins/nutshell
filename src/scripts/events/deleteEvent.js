/*
    module to delete a event completely from the database
    Authors: Patrick
*/

const $ = require("jquery")
const APIManager = require("../api/APIManager")

const deleteEvent = (id) => {
    APIManager.removeItem("Events", id)
}

module.exports = deleteEvent