/* 
    module to delete an article completely from the database
    Authors: Riley Mathews, Josh Barton (adapting Riley's code for this module)
*/

const $ = require("jquery")
const APIManager = require("../api/APIManager")

const deleteArticle = (id) => {
    APIManager.removeItem("Articles", id)
}

module.exports = deleteArticle