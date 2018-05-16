/*
Create News Object
Author: Josh Barton
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
