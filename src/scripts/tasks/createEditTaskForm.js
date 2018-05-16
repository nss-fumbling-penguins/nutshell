/* 
    module to add edit task form to the page
    Authors: Riley Mathews
*/
const $ = require("jquery")

const createEditTaskForm = () => {
    const output = $("#main-page")
    output.append(
        `
            <div class="modal" id="editTask__modal">
                <div class="modal-content">
                    <span class="close-button" id="editTask__close">&times;</span>
                    <h1>Edit a task</h1>
                    <p>If fields are left blank, those values will not be changed</p>
                    <input type="text" id="editTask__input__title" placeholder="title">
                    <input type="date" id="editTask__input__date">
                    <button id="editTask__button__submit">Submit</button>
                </div>
            </div>
        `
    )
}

module.exports = createEditTaskForm