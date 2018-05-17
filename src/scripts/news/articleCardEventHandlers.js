/*  
    module to add functionality to article cards as they are created
    Authors: Riley Mathews, Josh Barton (adapting Riley's code for this module)
*/

const $ = require("jquery")
const editArticle = require("./editArticleForm")
const deleteArticle = require("./deleteArticle")
const APIManager = require("../api/APIManager")

const activateArticleCardButtons = (id) => {
    //add event listeners to buttons
    //delete article
    $(`#Delete__Article__${id}`).click(() => {
        deleteArticle(id)
        $(`#Article__card__${id}`).remove()
    })

    //edit article
    $(`#Edit__Article__${id}`).click(() => {
        editArticle(id)
    })

}

module.exports = activateArticleCardButtons