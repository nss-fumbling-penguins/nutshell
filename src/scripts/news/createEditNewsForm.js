/* 
    module to add edit task form to the page
    Authors: (Mostly Riley - adapting his code) Josh Barton
*/
const $ = require("jquery")

const createEditNewsForm = () => {
    const output = $("#main-page")
    output.append(
        `
            <div class="modal" id="editArticle__modal">
                <div class="modal-content">
                    <span class="close-button" id="editArticle__close">&times;</span>
                    <h1>Edit a News Article</h1>
                    <p>If fields are left blank, those values will not be changed</p>
                    <input type="text" id="editArticle__input__title" placeholder="title">
                    <input type="text" id="editArticle__input__summary" placeholder="summary">
                    <input type="text" id="editArticle__input__URL" placeholder="URL">
                    <button id="editArticle__button__submit">Submit</button>
                </div>
            </div>
        `
    )
}

module.exports = createEditNewsForm