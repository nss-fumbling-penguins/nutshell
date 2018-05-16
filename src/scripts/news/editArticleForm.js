/*
Edit Article Form -creates a form to edit a previously saved article
Author: (Mostly Riley - but I adapted his code) Josh Barton
*/


const $ = require("jquery")
const APIManager = require("../api/APIManager")
const createNewsObject = require("./createNewsObject")
const UserManager = require("../registration/UserManager")

const hideModal = () => {
    $("#editArticle__modal").removeClass("show-modal")
}


// file to eventually hold create news form as modal popup
const editArticle = (id) => {


    //handle events that should close modal
    $("#editArticle__modal").addClass("show-modal")
    $(window).click(event => {
        if (event.target.classList.contains("modal")) {
            hideModal()
        }
    })
    $("#editArticle__close").click(hideModal)

    //handle submit button click
    $("#editArticle__button__submit").click(() => {
        //declare an initial variable that will be used to check if the article was actually changed
        let articleChanged = false

        //get the values of the edit article form fields
        let newTitle = $("#editArticle__input__title").val()
        let newSummary = $("#editArticle__input__summary").val()
        let newURL = $("#editArticle__input__URL").val()

        //check to see if a value was present in the new title field
        //if true mark that the task was changed and edit the corresponding card
        if (newTitle !== "") {
            articleChanged = true
            $(`#Article__card__${id} > .Article__card__title`).text(newTitle)
        } else {
            newTitle = $(`#Article__card__${id} > .Article__card__title`).text()
        }
        //do the same as above for summary value
        if (newSummary !== "") {
            articleChanged = true
            $(`#Article__card__${id} > .Article__card__summary`).text(`Due: ${newSummary}`)
        } else {
            newSummary = $(`#Article__card__${id} > .Article__card__summary`).text()
        }
        //do the same as above for URL value
        if (newURL !== "") {
            articleChanged = true
            $(`#Article__card__${id} > .Article__card__URL`).text(`Due: ${newURL}`)
        } else {
            newURL = $(`#Article__card__${id} > .Article__card__URL`).text()
        }

        //finally check to see if the article was changed at all
        //if true, create a new article object and use api manager to update the corresponding object in database
        if (articleChanged === true) {
            currentUserID = UserManager.currentUser()
            newArticle = createNewsObject(currentUserID, newTitle, newSummary, newURL)
            APIManager.updateItem("Articles", id, newArticle)
        }
        hideModal()
    })
}

module.exports = editArticle