/* 
    module to create the news view in the users dashboard
    Authors: (mostly Riley Mathews) Josh Barton (adapting Riley's code)
*/

const $ = require("jquery")
const APIManager = require("../api/APIManager")
const UserManager = require("../registration/UserManager")
const buildArticleCard = require("./buildArticleCard")

const showNewsView = () => {
    //get reference to main div
    const output = $("#main-page")
    //create parent task div
    const newsView = $("<div id=\"News\"></div>")

    //append main elements
    newsView.append(
        `
            <div id="News__header">
                <h3>Articles</h3>
                <button id="Articles__button__createArticle">Add Article</button>
            </div>
            <div id="Articles__output"></div>
        `
    )
    const userID = UserManager.currentUser()

    APIManager.getFriendCollection("Articles", userID)
        .then(response => {
            response.sort((a, b) => {return b.timeStamp - a.timeStamp}).forEach(article => {
                    buildArticleCard(article.title, article.summary, article.url, article.id, article.userID)
                })
        })

    //append parent div to output
    output.append(newsView)
}

module.exports = showNewsView