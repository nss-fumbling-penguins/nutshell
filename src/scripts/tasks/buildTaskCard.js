/* 
    module to build an html representation of a task
    Authors: Riley Mathews
*/

const $ = require("jquery")

const buildTaskElement = (title, id, date) => {
    const output = $("#Tasks__output")
    const taskElement = $(`<div id="Task__card__${id}" class="Task__card"></div>`)
    taskElement.append(
        `
            <h4>${title}</h4>
            <p>Due: ${date}</p>
            <button id="Complete__task__${id}">complete</button>
            <button id="Edit__task__${id}">edit</button>
            <button id="Delete__task__${id}">delete</button>
        `
    )
    output.append(taskElement)

    //add event listeners to buttons
    //delete task
    $(`#Delete__task__${id}`).click(() => {
        console.log("deleted", id)
    })

    //edit task
    $(`#Edit__task__${id}`).click(() => {
        console.log("editing", id)
    })

    //complete task
    $(`#Complete__task__${id}`).click(() => {
        console.log(id, "completed")
    })
}


module.exports = buildTaskElement