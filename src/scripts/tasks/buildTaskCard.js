/* 
    module to build an html representation of a task
    Authors: Riley Mathews
*/

const $ = require("jquery")

const buildTaskElement = (title, id) => {
    const taskElement = $(`<div id="Task__card__${id}" class="card"></div>`)
    taskElement.append(
        `
            <h4>${title}</h4>
            <button id="Task__card__complete">complete</button>
            <button id="Task__card__edit">edit</button>
        `
    )
    return taskElement
}


module.exports = buildTaskElement