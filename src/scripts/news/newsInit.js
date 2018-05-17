/* 
   file for the news view and news creation
    Authors: (mostly Riley Mathews) Josh Barton (adapting Riley's code)
*/

const showNewsView = require("./newsView")
const ActivateArticleFormButtons = require("./articleFormButtons")
const createArticleForm = require("./newArticleForm")
const createEditArticleForm = require("./createEditNewsForm")

const initializeNews = () => {
    createEditArticleForm()
    showNewsView()
    createArticleForm()
    ActivateArticleFormButtons()
}

module.exports = initializeNews