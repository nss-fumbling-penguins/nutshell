const createArticleForm = () => {
    const output = $("#main-page")
    output.append(
        `
        <div class="modal" id="Article__modal">
            <div class="modal-content">
                <span class="close-button" id="Article__modal__close">&times;</span>
                <h1>Create a news item.</h1>
                <input type="text" id="News__input__title" placeholder="title">
                <input type="text" id="News__input__summary" placeholder="summary">
                <input type="text" id="News__input__url" placeholder="URL">
                <button id="News__button__submit">Submit</button>
            </div>
        </div>
        `
    )
}

module.exports = createArticleForm