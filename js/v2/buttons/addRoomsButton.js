var addRoomsButton;

const addRoomDialog = document.getElementById('addRoomDialog');
const addRoomInput = document.getElementById('addRoomInput');
const addRoomButton = document.getElementById('addRoomButton');
const closeRoomDialogButton = document.getElementById('closeRoomDialogButton');

function showAddRoomDialog() {
    if (roomContext.selectedRoomIsConfiguredOrNoRoomIsSelected()) {
        addRoomInput.value = '';
        addRoomInput.focus();
        addRoomDialog.showModal();
        screenContext.disableControls();
    }
}

closeRoomDialogButton.addEventListener('click', () => {
    addRoomDialog.close();
    screenContext.enableControls();
});

addRoomButton.addEventListener('click', () => {
    const roomName = addRoomInput.value;
    if (addRoomInput.value) {
        addRoomInput.value = '';
        const addingSuccessful = roomContext.createRoom(roomName);
        if (addingSuccessful) {
            addRoomDialog.close();
            screenContext.enableControls();
        }
    } else {
        displayErrorMessage('Név nélkül nem vehető fel szoba!');
    }
});