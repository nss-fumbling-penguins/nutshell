/* 
    module to create modal form for adding a new task
    Authors: Riley Mathews
*/

const $ = require("jquery")


// file to eventually hold create task form as modal popup
const createTaskForm = () => {
    const output = $("#main-page")
    output.append(
        `
        <div class="modal" id="Task__modal">
            <div class="modal-content">
                <span class="close-button" id="Task__modal__close">&times;</span>
                <h1>Create a new task.</h1>
                <input type="text" id="Tasks__input__title" placeholder="title">
                <input type="date" id="Tasks__input__date">
                <button id="Tasks__button__submit">Submit</button>
                <button id="Tasks__button__cancel">Cancel</button>
            </div>
        </div>
        `
    )
}

module.exports = createTaskForm