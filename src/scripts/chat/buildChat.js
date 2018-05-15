const $ = require("jquery")
const print = require("./printChat")
const retrieve = require("./retrieveChat")

const chatActor = Object.create(null, {
	buildChat:
		{
			value: function() {
				const chatRef = $("#chat")
				
				let chatbox = `
					<div id="chatBox"></div>
					<div id="chatInput">
						<input type="text" id="chatInput">
					</div>`
				
				chatRef.append(chatbox)
				this.init()
			}
		},
	init:{
		value: function() {
			//todo add event listener on enter key press in form
			$("#chatInput").keyup(function(event) {
				if (event.keyCode === 13) {
					
				}
			})
			retrieve.init()
			setInterval(retrieve.main(), 1000)
		}
	}
})

module.exports = chatActor