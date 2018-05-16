/*
/	Module:		 Chat Storage
/	Author: 	 Levi Schubert
/	Description: The module responsible for loading and saving the
/				 local storage for the chat panel
*/

const chatStorage = Object.create(null, {
	load:{
		value: function(){
			const chatData = localStorage.getItem("chatStorage")
			return JSON.parse(chatData)
		}
	},
	save:{
		value: function(msgArray){
			const chatData = JSON.stringify(msgArray)
			localStorage.setItem("chatStorage", chatData)
		}
	}
})

module.exports = chatStorage