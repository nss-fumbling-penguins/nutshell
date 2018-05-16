/* 
    index js file for the task view and task creation
    Authors: Riley Mathews
*/

const showTaskView = require("./taskView")
const ActivateTaskFormButtons = require("./TaskFormButtons")
const createTaskForm = require("./newTaskForm")
const createEditTaskForm = require("./createEditTaskForm")

const initializeTasks = () => {
    createEditTaskForm()
    showTaskView()
    createTaskForm()
    ActivateTaskFormButtons()
}

module.exports = initializeTasks