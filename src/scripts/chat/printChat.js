/*
/	Module:		 Print Chat
/	Author: 	 Levi Schubert
/	Description: The module responsible for adding new messages and
/				 updating messages on the chat panel
*/


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
			let time = (date.getHours() +":" + ( "0" + date.getMinutes()).substr(-2))
			if(msg.userID === user){
				//set class to chatRight
				chat = `<div class="chatMsg chatRight" id="${msg.timeStamp}">
					<span class="chatUser">${printChat.users[((msg.userID) -1)]}:</span>
					<span class="chatText">${msg.message}</span>
					<p class="chatTime">${time}</p>
					</div>`
				$("#chatBox").append(chat)
				$(`#${msg.timeStamp}`).on("dblclick", (e) =>{
					console.log(e)
					//create edit form here
				})
			}else{
				//set class to chatLeft
				chat = `<div class="chatMsg chatLeft" id="${msg.timeStamp}">
					<span class="chatUser">${printChat.users[((msg.userID) -1)]}:</span>
					<span class="chatText">${msg.message}</span>
					<p class="chatTime">${time}</p>
					</div>`
					$("#chatBox").append(chat)
			}
			$("#chatBox").animate({ scrollTop: $("#chatBox").prop("scrollHeight")}, 1000)
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
				editable = []
				addable = []
				msgArray.forEach(msg => {
					if(msg.assigned !== "false"){
						let chat = ""
						let date = new Date(parseInt(msg.timeStamp))
						let time = (date.getHours() +":" + ( "0" + date.getMinutes()).substr(-2))
						if(parseInt(msg.userID) === user){
							//set class to chatRight
							chat = `<div class="chatMsg chatRight" id="${msg.timeStamp}">
								<span class="chatUser">${printChat.users[((msg.userID) -1)]}:</span>
								<span class="chatText">${msg.message}</span>
								<p class="chatTime">${time}</p>
								</div>`
							msgs.push(chat)
							editable.push(msg.timeStamp)
						}else{
							//set class to chatLeft
							chat = `<div class="chatMsg chatLeft" id="${msg.timeStamp}">
								<span class="chatUser">${printChat.users[((msg.userID) -1)]}:</span>
								<span class="chatText">${msg.message}</span>
								<p class="chatTime">${time}</p>
								</div>`
							msgs.push(chat)
							addable.push({
								id:msg.timeStamp,
								user:printChat.users[((msg.userID) -1)]
							})
						}
					}
				})
				$("#chatBox").append(msgs)
				editable.forEach(id => {
					$(`#${id}`).on("dblclick", (e) =>{
						console.log(e)
						//create edit form here
					})
				})
				addable.forEach(data => {
					$(`#${data.id} .chatUser`).on("click", (e) =>{
						console.log(data.user)
						//create edit form here
					})
				})
				$("#chatBox").animate({ scrollTop: $("#chatBox").prop("scrollHeight")}, 1000)
				
			})
		}
	}
})

module.exports = printChat