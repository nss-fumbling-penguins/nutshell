/*
/	Module:		 Print Chat
/	Author: 	 Levi Schubert
/	Description: The module responsible for adding new messages and
/				 updating messages on the chat panel
*/


const $ = require("jquery")
const UserManager = require("../registration/UserManager")
const api = require("../api/APIManager")
const chatStorage = require("./chatStorage")
const friend = require("../friends/showAddFriendModal")

const printChat = Object.create(null, {
	docRef:{
		value: $("#chatBox")
	},
	users:{
		writable:true,
		value:[]
	},
	editMessage:{
		value: function(data){
			
			$(`#${data.target}`).find(".chatText").text(data.msg)
		}
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
					//todo add check to see if there is an edit window open
					let edit = "<input type=\"text\" class=\"editMsg\">"
					$(e.currentTarget).append(edit)
					$(e.currentTarget).find(".editMsg").val(`${$(e.currentTarget).find(".chatText").text()}`)
					$(e.currentTarget).find(".editMsg").on("keyup", function(event) {
						if (event.keyCode === 13 && $(e.currentTarget).find(".editMsg").val() !== ""){
							$(e.currentTarget).find(".chatText").text($(e.currentTarget).find(".editMsg").val())
							let data = {
								edit: true,
								target: e.currentTarget.id,
								msg: $(e.currentTarget).find(".editMsg").val()
							}
							chatStorage.save(data)
							api.getByTimestamp(e.currentTarget.id).then(update => {
								update[0].message = data.msg
								api.updateItem("messages", update[0].id, update[0])
							})
							$(e.currentTarget).find(".editMsg").remove()
						}
					})
				
				})
			}else{
				//set class to chatLeft
				chat = `<div class="chatMsg chatLeft" id="${msg.timeStamp}">
					<span class="chatUser">${printChat.users[((msg.userID) -1)]}:</span>
					<span class="chatText">${msg.message}</span>
					<p class="chatTime">${time}</p>
					</div>`
					$("#chatBox").append(chat)
					$(`#${msg.timeStamp} .chatUser`).on("click", (e) =>{
						friend(printChat.users[((msg.userID) -1)])
						//show add friend modal
					})
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
						let edit = "<input type=\"text\" class=\"editMsg\">"
						$(e.currentTarget).append(edit)
						$(e.currentTarget).find(".editMsg").val(`${$(e.currentTarget).find(".chatText").text()}`)
						$(e.currentTarget).find(".editMsg").on("keyup", function(event) {
							if (event.keyCode === 13 && $(e.currentTarget).find(".editMsg").val() !== ""){
								$(e.currentTarget).find(".chatText").text($(e.currentTarget).find(".editMsg").val())
								let data = {
									edit: true,
									target: e.currentTarget.id,
									msg: $(e.currentTarget).find(".editMsg").val()
								}
								chatStorage.save(data)
								api.getByTimestamp(e.currentTarget.id).then(update => {
									update[0].message = data.msg
									api.updateItem("messages", update[0].id, update[0])
								})
								$(e.currentTarget).find(".editMsg").remove()
							}
						})
					})
				})
				addable.forEach(data => {
					$(`#${data.id} .chatUser`).on("click", (e) =>{
						friend(data.user)
					})
				})
				$("#chatBox").animate({ scrollTop: $("#chatBox").prop("scrollHeight")}, 1000)
				
			})
		}
	}
})

module.exports = printChat