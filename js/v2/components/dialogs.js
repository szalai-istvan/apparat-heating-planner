const errorDialog = document.getElementById('errorDialog');
const errorMessageParagraph = document.getElementById('errorMessageParagraph');

function displayErrorMessage(text) {
    errorMessageParagraph.innerHTML = text;
    errorDialog.showModal();
}

// add panels dialog
addPanelDialogCloseButton.addEventListener('click', () => addPanels());

function showAddPanelDialog() {
    addPanelAmountTextbox.value = '';
    addPanelRoomSelect.value = '';
    addPanelTypeSelect.value = '';
    addPanelDialog.showModal();
}

function addPanels() {
    const amount = Number(addPanelAmountTextbox.value);
    if (amount > 0) {
        const room = addPanelRoomSelect.value;
        const type = addPanelTypeSelect.value;
        if (type && room) {
            panelInformation.addToPanels(type, room, amount);
            addPanelDialog.close();    
        } else {
            displayErrorMessage('Hiányzó adat.');
        }
    } else {
        displayErrorMessage(`Érvénytelen darabszám: ${amount}. Csak pozitív egész szám adható meg.`);
    }

}