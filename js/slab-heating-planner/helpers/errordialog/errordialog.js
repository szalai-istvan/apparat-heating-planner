const messageDialog = document.getElementById("messageDialog");
const messageParagraph = document.getElementById("messageParagraph");
const messageOkButton = document.getElementById("messageOkButton");

function displayMessage(text) {
    messageParagraph.innerHTML = text;
    messageDialog.showModal();
    toggleScreenControls();
}

messageOkButton.addEventListener(CLICK, () => {
    messageDialog.close();
    toggleScreenControls();
});

function displayHelpData() {
    displayMessage("Segítség kérése:<br/>e-mail: sjb@apparat.hu");
}