const errorDialog = document.getElementById('errorDialog');
const errorMessageParagraph = document.getElementById('errorMessageParagraph');

function displayErrorMessage(text) {
    errorMessageParagraph.innerHTML = text;
    errorDialog.showModal();
}