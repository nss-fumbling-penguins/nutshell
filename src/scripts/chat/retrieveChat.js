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
	iter:{
		writable: true,
		value: 1
	},
	handle:{
		value: function(){
			data = chatStorage.load()
			if("edit" in data && data.edit === true){
				//a message was edited
				
			}else{
				out.print(data)
			}
		}
	},
	onCreate:{
		value: function(msg){
			out.print(msg)
		}
	},
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