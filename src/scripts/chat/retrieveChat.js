const out = require("./printChat")
const $ = require("jquery")
const api = require("../api/APIManager")



const retrieveChat = Object.create(null, {
	iter:{
		writable: true,
		value: 1
	},
	main:{
		value: function(){
			/* todo
				runs on one second interval attempting to get newest message
				on new message calls out.print(msg)
				updates iter by 1
			*/
			// console.log("checking for new messages")
			
			api.getOneOfCollection("messages", retrieveChat.iter).then(msg =>{
				if(msg.assigned === "true"){
					retrieveChat.iter += 1
					out.print(msg)
				}
			})
	
		}
	},
	init:{
		value: function(){
			/* todo
				get all current messages and send to out.printAll(msgArray)
				sets iter to 1 after last id
			*/
			api.getAllOfCollection("messages").then(msgArray => {

				out.printAll(msgArray)
				retrieveChat.iter = msgArray.length
			}).then(()=>{
				let listen = setInterval(retrieveChat.main, 10000)
			})
		}
	}
})

module.exports = retrieveChat