// error dialog
function displayErrorMessage(text) {
    errorMessage.innerHTML = text;
    errorDialog.showModal();
}

// scaling dialog
function showScalingDialog() {
    scalingInput.value = '';
    scalingDialog.showModal();
}

scalingDialogCloseButton.addEventListener('click', (event) => {
    const scalingValue = scalingInput.value.replace(",", ".");
    scalingContext.processScalingValue(scalingValue);
});

// manage rooms dialog
manageRooms.addEventListener('click', () => showManageRoomsDialog());
addRoomButton.addEventListener('click', () => {
    roomsContext.addRoom(addRoomInput.value);
    addRoomInput.value = '';
});
removeRoomButton.addEventListener('click', () => roomsContext.removeRoom(removeRoomSelect.value));
closeManageRoomsDialog.addEventListener('click', () => manageRoomsDialog.close());

function showManageRoomsDialog() {
    addRoomInput.value = '';
    manageRoomsDialog.showModal();
}

// add panels dialog
addPanelGroup.addEventListener('click', () => showAddPanelDialog());
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
        panelInformation.addToPanels(type, room, amount);
        addPanelDialog.close();
    } else {
        displayErrorMessage(`Érvénytelen darabszám: ${amount}. Csak pozitív egész szám adható meg.`);
    }

}