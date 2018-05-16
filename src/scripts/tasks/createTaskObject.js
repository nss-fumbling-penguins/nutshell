/* 
    module to create a task object to send to api manager
    Authors: Riley Mathews
*/

const createTaskObject = (userID, name, dueDate) => {
    const Task = {
        userID,
        name,
        dueDate,
        completed: false
    }
    return Task
}

module.exports = createTaskObject