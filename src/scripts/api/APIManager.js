/* 
    App to handle interactions with the api for nutshell
    Authors: Riley Mathews
*/
const $ = require("jquery")

const APIManager = Object.create(null, {
    //method to get everything from the api
    getAllDatabase: {
        value: function () {
            return $.ajax("http://localhost:8088/db")
        }
    },
    //method to get all items in the collection passed to it
    getAllOfCollection: {
        value: function (collection) {
            return $.ajax(`http://localhost:8088/${collection}`)
        }
    },
    //method to get one item of [id] and collection passed to it
    getOneOfCollection: {
        value: function (collection, id) {
            return $.ajax(`http://localhost:8088/${collection}/${id}`)
        }
    },
    //post methods
    //method to create user
    createUser: {
        value: function (data) {
            return $.ajax({
                url: "http://localhost:8088/Users",
                method: "POST",
                data: data
            })
        }
    },
    //method to create items of the collection type passed to it
    createItem: {
        value: function (collection, data) {
            return $.ajax({
                url: `http://localhost:8088/${collection}`,
                method: "POST",
                data: data
            })
        }
    },
    //delete methods
    //method to remove an item [id] of the collection passed to it
    removeItem: {
        value: function (collection, id) {
            return $.ajax({
                url: `http://localhost:8088/${collection}/${id}`,
                method: "DELETE",
            })
        }
    },
    //update methods
    //method to update item of [id] and [collection] with [data] passed to it
    updateItem: {
        value: function (collection, id, data) {
            return $.ajax({
                url: `http://localhost:8088/${collection}/${id}`,
                method: "PUT",
                data: data
            })
        }
    }
})


module.exports = APIManager