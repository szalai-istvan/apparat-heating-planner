const errorDialog = document.getElementById('errorDialog');
const errorMessageParagraph = document.getElementById('errorMessageParagraph');
const errorMessageOkButton = document.getElementById('errorMessageOkButton');

function displayMessage(text) {
    errorMessageParagraph.innerHTML = text;
    errorDialog.showModal();
    toggleScreenControls();
}

errorMessageOkButton.addEventListener('click', () => {
    errorDialog.close();
    toggleScreenControls();
});

function displayHelpData() {
  displayMessage("Segítség kérése:<br/>e-mail: sjb@apparat.hu");
}