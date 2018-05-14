# api manager documentation

```
APIManager.getAllDatabase() 
```
returns everything from the api

```
APIManager.getAllOfCollection(collection) 
```
returns all items of the specified collection

```
APIManager.getOneOfCollection(collection, id) 
```
gets the item with the id specified within the specified collection

```
APIManager.createUser(data) 
```
creates a new user with information from the object passed to it

```
APIManager.createItem(collection, data) 
```
creates a new item (message, article, etc...) of the specified collection using the information from the object passed as data argument

```
APIManager.removeItem(collection, id) 
```
removes the item of specified id from the specified collection

```
APIManager.updateItem(collection, id, data) 
```
updates the item at specified id of specified collection using data passed as argument