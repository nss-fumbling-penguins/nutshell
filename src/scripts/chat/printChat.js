const $ = require("jquery")

const printChat = Object.create(null, {
	print:{
		value:function (user, msg) {

		}
	},
	printAll:{
		value: function (user, msgArray){

		}
	}
})

module.exports = printChat