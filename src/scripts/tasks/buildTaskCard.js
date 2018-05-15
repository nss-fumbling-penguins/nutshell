/* 
    module to build an html representation of a task
    Authors: Riley Mathews
*/

const $ = require("jquery")

const buildTaskElement = (title, id, date) => {
    const taskElement = $(`<div id="Task__card__${id}" class="card"></div>`)
    taskElement.append(
        `
            <h4>${title}</h4>
            <p>Due: ${date}</p>
            <button id="Task__card__complete">complete</button>
            <button id="Task__card__edit">edit</button>
        `
    )
    console.log(`card ${id} built`)
    return taskElement
}


module.exports = buildTaskElement