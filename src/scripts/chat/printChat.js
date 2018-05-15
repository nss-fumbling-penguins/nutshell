const $ = require("jquery")
const UserManager = require("../registration/UserManager")
const api = require("../api/APIManager")

const printChat = Object.create(null, {
	docRef:{
		value: $("#chatBox")
	},
	users:{
		writable:true,
		value:[]
	},
	print:{
		value:function (msg) {
			let user = UserManager.currentUser()
			let chat = ""
			let date = new Date(parseInt(msg.timeStamp))
			console.log("in print section")
			let time = (date.getHours() +":" + ( "0" + date.getMinutes()).substr(-2))
			if(msg.userID === user){
				//set class to chatRight
				chat = `<div class="chatMsg chatRight">
					<span class="chatUser">${printChat.users[((msg.userID) -1)]}: </span>
					<span class="chatText">${msg.message}</span>
					<p class="chatTime">${time}</p>
					</div>`
					$("#chatBox").append(chat)
			}else{
				//set class to chatLeft
				chat = `<div class="chatMsg chatLeft">
					<span class="chatUser">${printChat.users[((msg.userID) -1)]}: </span>
					<span class="chatText">${msg.message}</span>
					<p class="chatTime">${time}</p>
					</div>`
					$("#chatBox").append(chat)
			}
		}
	},
	printAll:{
		value: function (msgArray){
			
			let user = UserManager.currentUser()
			api.getAllOfCollection("users").then(userArray =>{
				userArray.forEach(user => {
					printChat.users.push(user.username)
				})
				msgs = []
				msgArray.forEach(msg => {
					if(msg.assigned !== "false"){
						let chat = ""
						let date = new Date(parseInt(msg.timeStamp))
						let time = (date.getHours() +":" + ( "0" + date.getMinutes()).substr(-2))
						if(msg.userID === user){
							//set class to chatRight
							chat = `<div class="chatMsg chatRight">
								<span class="chatUser">${printChat.users[((msg.userID) -1)]}: </span>
								<span class="chatText">${msg.message}</span>
								<p class="chatTime">${time}</p>
								</div>`
							msgs.push(chat)
						}else{
							//set class to chatLeft
							chat = `<div class="chatMsg chatLeft">
								<span class="chatUser">${printChat.users[((msg.userID) -1)]}: </span>
								<span class="chatText">${msg.message}</span>
								<p class="chatTime">${time}</p>
								</div>`
							msgs.push(chat)
						}
					}
				})
				$("#chatBox").append(msgs)
			})
		}
	}
})

module.exports = printChat