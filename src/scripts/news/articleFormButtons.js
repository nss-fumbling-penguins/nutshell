/* 
    module to add event handlers to the buttons on the create article form, as well as the button to show it
    Authors: ( mostly Riley Mathews) Josh Barton (adapting Riley's code)
*/

const $ = require("jquery")
const createNewsObject = require("./createNewsObject")
const buildArticleCard = require("./buildArticleCard")
const APIManager = require("../api/APIManager")

//functions to hold common functionality across buttons
//show the news modal
const showModal = () => {
    $("#Article__modal").addClass("show-modal")
}

//hide the task modal
const hideModal = () => {
    $("#Article__modal").removeClass("show-modal")
}

//clear the form fields of the news modal
const clearFormFields = () => {
    $("#Articles__input__title").val("")
    $("#Articles__input__summary").val("")
    $("#Articles__input__url").val("")
}

//main function of module, activate event handlers for buttons
const activateArticleFormButtons = () => {
    //handles click on the create new article button
    $("#Articles__button__createArticle").click(() => {
        showModal()
    })

    //handles click on the modal x button
    $("#Article__modal__close").click(hideModal)

    //handles click on article submit button
    $("#Articles__button__submit").click(() => {
        //get current user
        const UserManager = require("../registration/UserManager")
        const currentUser = UserManager.currentUser()
        //create article object
        const article = createNewsObject(currentUser, $("#Articles__input__title").val(), $("#Articles__input__summary").val(), $("#Articles__input__url").val())
        //call function to send article to api
        APIManager.createItem("Articles", article)
            .then(response => {
                //take the response and append a new card to the dom based on the new task item
                buildArticleCard(response.title, response.summary, response.url, response.id, currentUser)
            })
        
        clearFormFields()
        hideModal()
    })

    //handles click on the cancel article creation button
    $("#Article__modal__close").click(() => {
        hideModal()
        clearFormFields()
    })

    //handles click on the window and closes modal if shown
    $(window).click((event) => {
        if (event.target.classList.contains("modal")) {
            hideModal()
        }
    })
}


module.exports = activateArticleFormButtons