/*
Create News Object
Author: (most Riley Mathews) Josh Barton (adapting Riley's code)
*/

const createNewsObject = (userID, title, summary, url) => {
    const Article = {
        userID,
        title,
        summary,
        url,
        timeStamp: Date.now()
    }
    return Article
}

module.exports = createNewsObject
