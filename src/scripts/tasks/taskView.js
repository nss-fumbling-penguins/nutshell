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
    const taskView = $("<div id=\"Tasks\"></div>")

    //append main elements
    taskView.append(
        `
            <div id="Tasks__header">
                <h3>Task List</h3>
                <button id="Tasks__button__createTask">Add Task</button>
            </div>
            <div id="Tasks__form" class="hide">
                <input type="text" id="Tasks__input__title" placeholder="title">
                <input type="date" id="Tasks__input__date">
                <button id="Tasks__button__submit">Submit</button>
                <button id="Tasks__button__cancel">Cancel</button>
            </div>
            <div id="Tasks__output"></div>
        `
    )

    const userID = UserManager.currentUser()
    APIManager.getAllOfCollection("Tasks")
        .then(response => {
            console.log(response)
            response.forEach(task => {
                if (parseInt(task.userID) === userID) {
                    $("#Tasks__output").append(buildTaskCard(task.name, task.id, task.dueDate))
                }
            })
        })

    //append parent div to output
    output.append(taskView)
}

module.exports = showTaskView