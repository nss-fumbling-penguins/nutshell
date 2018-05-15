const APIManager = require("./api/APIManager")
const buildChat = require("./chat/buildChat")
const user = require("./registration/UserManager")

user.logInUser(3)
buildChat.buildChat()
