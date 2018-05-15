const out = require("./printChat")
const $ = require("jquery")



const retrieveChat = Object.create(null, {
	iter:{
		writable: true,
		value: 1
	},
	main:{
		value: function(){
			/* todo
				runs on one second interval attempting to get newest message
				on new message calls out.print(user, message)
				updates iter by 1
			*/
		}
	},
	init:{
		value: function(){
			/* todo
				get all current messages and send to out.printAll(user, msgArray)
			*/
		}
	}
})

module.exports = retrieveChat