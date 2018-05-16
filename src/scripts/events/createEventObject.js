/*
    module to create a event object to send to api manager
    Authors: Patrick
*/
const createEventObject = (userID, name, date, location) => {
    const event = {
        userID,
        name,
        date,
        location
    }
    return event
}

module.exports = createEventObject