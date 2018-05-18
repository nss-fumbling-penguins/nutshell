/* 
    module to create the task view in the users dashboard
    Authors: Riley Mathews
*/

const $ = require("jquery")
const APIManager = require("../api/APIManager")
const UserManager = require("../registration/UserManager")
const buildTaskCard = require("./buildTaskCard")

const showTaskView = () => {
    //get refference to main div
    const output = $("#main-page")
    //create parent task div
    const taskView = $("<div id=\"Tasks\" class=\"component\"></div>")

    //append main elements
    taskView.append(
        `
            <div id="Tasks__header" class="component__header">
                <h3 class="component__header__title">Task List</h3>
                <button id="Tasks__button__createTask" class="component__header__button">Add Task</button>
            </div>
            <div id="Tasks__output" class="component__output"></div>
        `
    )

    const userID = UserManager.currentUser()
    APIManager.getAllOfCollection("Tasks")
        .then(response => {
            response.forEach(task => {
                if (parseInt(task.userID) === userID && task.completed === "false") {
                    buildTaskCard(task.name, task.id, task.dueDate)
                }
            })
        })

    //append parent div to output
    output.append(taskView)
}

module.exports = showTaskView