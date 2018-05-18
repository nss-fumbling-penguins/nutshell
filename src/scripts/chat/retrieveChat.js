/*
/	Module:		 Retrieve Chat
/	Author: 	 Levi Schubert
/	Description: The module responsible for fetching new messages
/				 and sending them to the Print Chat Module
*/

const out = require("./printChat")
const $ = require("jquery")
const api = require("../api/APIManager")
const chatStorage = require("./chatStorage")



const retrieveChat = Object.create(null, {
	//handles printing an externally created message
	handle:{
		value: function(){
			data = chatStorage.load()
			if("edit" in data && data.edit === true){
				//a message was edited
				out.editMessage(data)
			}else{
				out.check(data)
			}
		}
	},
	//handles printing a locally created message
	onCreate:{
		value: function(msg){
			out.print(msg)
		}
	},
	//gets all messages, prints them, and sets up storage listener
	init:{
		value: function(){
			
			api.getAllOfCollection("messages").then(msgArray => {

				out.printAll(msgArray)
				window.addEventListener("storage", function(event){
					retrieveChat.handle()
				})
			})
		}
	}
})

module.exports = retrieveChat