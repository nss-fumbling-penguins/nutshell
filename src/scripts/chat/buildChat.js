const $ = require("jquery")
const print = require("./printChat")
const retrieve = require("./retrieveChat")
const api = require("../api/APIManager")
const user = require("../registration/UserManager")

const chatActor = Object.create(null, {
	buildChat:
		{
			value: function() {
				const chatRef = $("#chat")
				
				let chatbox = `
					<div id="chatBox"></div>
					<div id="chatInputSection">
						<input type="text" id="chatInput">
					</div>`
				
				chatRef.append(chatbox)
				this.init()
			}
		},
	init:{
		value: function() {
			//todo add event listener on enter key press in form
			const input = $("#chatInput")
			input.on("keyup", function(event) {
				// debugger
				if (event.keyCode === 13 && input.val() !== "") {
					let text = input.val()
					let data = {
						"userID": user.currentUser(),
						"message": text,
						"timeStamp": Date.now(),
						"assigned": "true",
						"id": retrieve.iter
					}
					input.val("") // = ""
					api.updateItem("messages", retrieve.iter, data)
					api.createItem("messages", {"assigned":"false"})
				}
			})
			retrieve.init()
			
		}
	}
})

module.exports = chatActor