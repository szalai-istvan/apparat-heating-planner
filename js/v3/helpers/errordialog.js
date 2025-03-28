const errorDialog = document.getElementById('errorDialog');
const errorMessageParagraph = document.getElementById('errorMessageParagraph');
const errorMessageOkButton = document.getElementById('errorMessageOkButton');

function displayMessage(text) {
    errorMessageParagraph.innerHTML = text;
    errorDialog.showModal();
    screenContext.disableControls();
}

errorMessageOkButton.addEventListener('click', () => {
    errorDialog.close();
    screenContext.enableControls();
});