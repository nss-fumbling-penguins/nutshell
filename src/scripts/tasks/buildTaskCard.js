/* 
    module to build an html representation of a task
    Authors: Riley Mathews
*/

const $ = require("jquery")
const activateTaskCardButtons = require("./TaskCardEventHandlers")

const buildTaskElement = (title, id, date) => {
    const output = $("#Tasks__output")
    const taskElement = $(`<div id="Task__card__${id}" class="Task__card"></div>`)
    taskElement.append(
        `
            <h4 class="Task__card__title">${title}</h4>
            <p class="Task__card__date">Due: ${date}</p>
            <div id="Task__card__${id}__buttons">
                <button id="Complete__task__${id}">complete</button>
                <button id="Edit__task__${id}">edit</button>
                <button id="Delete__task__${id}">delete</button>
            </div>
        `
    )
    output.append(taskElement)
    activateTaskCardButtons(id)
    
}


module.exports = buildTaskElement