/*  
    module to add functionality to task cards as they are created
    Authors: Riley Mathews
*/

const $ = require("jquery")
const editTask = require("./editTaskForm")
const deleteTask = require("./deleteTask")
const APIManager = require("../api/APIManager")

const activateTaskCardButtons = (id) => {
    //add event listeners to buttons
    //delete task
    $(`#Delete__task__${id}`).click(() => {
        deleteTask(id)
        $(`#Task__card__${id}`).remove()
    })

    //edit task
    $(`#Edit__task__${id}`).click(() => {
        console.log(id)
        editTask(id)
        $("#editTask__input__title").focus()
    })

    //complete task
    $(`#Complete__task__${id}`).click(() => {
        $(`#Task__card__${id}__buttons`).empty()
        $(`#Task__card__${id}__buttons`).append("<p class=\"complete\">complete</p>")
        APIManager.getOneOfCollection("Tasks", id)
            .then(response => {
                response.completed = true
                APIManager.updateItem("Tasks", id, response)
            })
    })
}

module.exports = activateTaskCardButtons