/*  
    module to add functionality to task cards as they are created
    Authors: Riley Mathews
*/

const $ = require("jquery")
const editTask = require("./editTaskForm")

const activateTaskCardButtons = (id) => {
    //add event listeners to buttons
    //delete task
    $(`#Delete__task__${id}`).click(() => {
        console.log("deleted", id)
    })

    //edit task
    $(`#Edit__task__${id}`).click(() => {
        editTask(id)
    })

    //complete task
    $(`#Complete__task__${id}`).click(() => {
        console.log(id, "completed")
    })
}

module.exports = activateTaskCardButtons