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
	//stores all usernames for lookup without ajax requests
	users:{
		writable:true,
		value:[]
	},
	editMessage:{
		value: function(data){
			//finds message in chat panel and changes message text to updated value
			$(`#${data.target}`).find(".chatText").text(data.msg)
		}
	},
	check:{
		value: function(msg){
			if(msg.userID >= printChat.users.length){
				
				printChat.updateUserList().then(() => {
					this.print(msg)
				})
			}else{
				this.print(msg)
			}
		}
	},
	// print takes a message object parameter and displays it into the chat panel
	print:{
		value:function (msg) {
			//instantiate and assign necessary local variables
			let user = UserManager.currentUser()
			let chat = ""
			let date = new Date(parseInt(msg.timeStamp))
			let time = (date.getHours() +":" + ( "0" + date.getMinutes()).substr(-2))
			//check if message belongs to logged in user
			if(msg.userID === user){
				//create html component with message detail populated and add to DOM
				chat = `<div class="chatMsg chatRight" id="${msg.timeStamp}">
					<span class="chatUser">${printChat.users[((msg.userID) -1)]}</span>
					<span class="chatText">${msg.message}</span>
					<p class="chatTime">${time}</p>
					</div>`
				$("#chatBox").append(chat)

				//add event listener for editing message on double click
				$(`#${msg.timeStamp}`).on("dblclick", (e) =>{
					//todo add check to see if there is an edit window open
					//create edit input, populate with current message, and add to DOM
					let edit = "<input type=\"text\" class=\"editMsg\">"
					$(e.currentTarget).append(edit)
					$(e.currentTarget).find(".editMsg").val(`${$(e.currentTarget).find(".chatText").text()}`)

					//add event listener to edit input
					$(e.currentTarget).find(".editMsg").on("keyup", function(event) {
						//listen for enter key
						if (event.keyCode === 13 && $(e.currentTarget).find(".editMsg").val() !== ""){
							//get updated message, pass it to local storage and json server, update message on DOM
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
							//removes the edit input
							$(e.currentTarget).find(".editMsg").remove()
						}
					})
				
				})
			}else{
				//if message isn't from logged in user create message and add to DOM
				chat = `<div class="chatMsg chatLeft" id="${msg.timeStamp}">
					<span class="chatUser">${printChat.users[((msg.userID) -1)]}</span>
					<span class="chatText">${msg.message}</span>
					<p class="chatTime">${time}</p>
					</div>`
					$("#chatBox").append(chat)
					//add event listener for add friend modal
					$(`#${msg.timeStamp} .chatUser`).on("click", (e) =>{
						//show add friend modal
						friend(printChat.users[((msg.userID) -1)])
					})
			}
			//scroll chat down to new message
			$("#chatBox").animate({ scrollTop: $("#chatBox").prop("scrollHeight")}, 1000)
		}
	},
	//gets list of all users and saves them to save on ajax calls
	updateUserList:{
		value:  function() { 
				
				return	new Promise(function (resolve, reject) {
					const printChat = require("./printChat")
					printChat.users = []
					api.getAllOfCollection("users").then(userArray =>{
						userArray.forEach(user => {
							printChat.users.push(user.username)
						})
						resolve()
					})
				})
		}
	},
	// printall takes an array of message objects and adds them all to the DOM
	printAll:{
		value: function (msgArray){
			//create and instantiate necessary local variables
			let user = UserManager.currentUser()
			//gets list of all users
			printChat.updateUserList().then(() => {
				msgs = []
				editable = []
				addable = []
				//begins creating message elements
				msgArray.forEach(msg => {
					if(msg.assigned !== "false"){
						let chat = ""
						let date = new Date(parseInt(msg.timeStamp))
						let time = (date.getHours() +":" + ( "0" + date.getMinutes()).substr(-2))
						if(parseInt(msg.userID) === user){
							//set class to chatRight
							chat = `<div class="chatMsg chatRight" id="${msg.timeStamp}">
								<span class="chatUser">${printChat.users[((msg.userID) -1)]}</span>
								<span class="chatText">${msg.message}</span>
								<p class="chatTime">${time}</p>
								</div>`
							msgs.push(chat)
							editable.push(msg.timeStamp)
						}else{
							//set class to chatLeft
							chat = `<div class="chatMsg chatLeft" id="${msg.timeStamp}">
								<span class="chatUser">${printChat.users[((msg.userID) -1)]}</span>
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
				//adds all messages to DOM
				$("#chatBox").append(msgs)
				//adds edit event handlers
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
				//adds add friend event handlers
				addable.forEach(data => {
					$(`#${data.id} > .chatUser`).on("click", (e) =>{
						friend(data.user)
					})
				})
				//scrolls to bottom of chat box
				$("#chatBox").animate({ scrollTop: $("#chatBox").prop("scrollHeight")}, 1000)
				
				
			})
		}
	}
})

module.exports = printChat