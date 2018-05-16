/* 
    module to create a form for adding a friend by username
    Authors: Riley Mathews
*/

const $ = require("jquery")

const createAddFriendForm = () => {
    $("#main-page").append(
        `
            <div class="modal" id="Friend__modal">
                <div class="modal-content">
                    <span class="close-button" id="Friend__modal__close">&times;</span>
                    <h1>Add a Friend.</h1>
                    <input type="text" id="Friend__modal__input__username">
                    <button id="Friend__modal__btn__submit">Submit</button>
                </div>
            </div>
        `
    )
}

module.exports = createAddFriendForm