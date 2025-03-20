var addRoomsButton;
var roomPrefillButtons = [];

const addRoomDialog = document.getElementById('addRoomDialog');
const addRoomInput = document.getElementById('addRoomInput');
const addRoomButton = document.getElementById('addRoomButton');
const closeRoomDialogButton = document.getElementById('closeRoomDialogButton');

function showAddRoomDialog() {
    if (roomContext.selectedRoomIsConfiguredOrNoRoomIsSelected()) {
        addRoomInput.value = '';
        addRoomInput.focus();
        addRoomDialog.showModal();
        checkRadioButtons();
        screenContext.disableControls();
    }
}

function createRoomPrefillRadioButtons() {
    const div = document.getElementById('roomPrefillRadioSet');
    for (let option of PREFILL_ROOM_NAMES) {
        const onchange = () => addRoomInput.value = option;
        const radioButton = createRadioButton('roomPrefill', option, onchange);
        div.appendChild(radioButton);
        roomPrefillButtons.push(radioButton);
    }
}

function checkRadioButtons() {
    const roomNames = roomContext.getRoomNames();
    for (let radioButton of roomPrefillButtons) {
        const inputElement = radioButton.childNodes[0];
        if (roomNames.includes(inputElement.value)) {
            inputElement.setAttribute('disabled', true);
        } else {
            inputElement.removeAttribute('disabled');
        }
        inputElement.checked = false;
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
        const addingSuccessful = roomContext.tryToCreateRoom(roomName);
        if (addingSuccessful) {
            addRoomDialog.close();
            screenContext.enableControls();
        }
    } else {
        displayErrorMessage('Név nélkül nem vehető fel szoba!');
    }
});