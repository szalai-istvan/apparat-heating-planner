var addRoomsButton;
var roomPrefillButtons = [];

const addRoomDialog = document.getElementById('addRoomDialog');
const addRoomInput = document.getElementById('addRoomInput');
const addRoomButton = document.getElementById('addRoomButton');
const closeRoomDialogButton = document.getElementById('closeRoomDialogButton');

/**
 * Létrehozza a szobanév gyorskitöltő radio gombokat.
 * 
 * @returns {undefined}
 */
function createRoomPrefillRadioButtons() {
    const div = document.getElementById('roomPrefillRadioSet');
    for (let option of PREFILL_ROOM_NAMES) {
        const onchange = () => addRoomInput.value = option;
        const radioButton = createRadioButton('roomPrefill', option, onchange);
        div.appendChild(radioButton);
        roomPrefillButtons.push(radioButton);
    }
}

/**
 * Megjeleníti a szoba hozzáadásra szolgáló dialogot.
 * 
 * @returns {undefined}
 */
function showAddRoomDialog() {
    if (selectedRoomIsConfiguredOrNoRoomIsSelected()) {
        addRoomInput.value = '';
        addRoomInput.focus();
        addRoomDialog.showModal();
        toggleScreenControls();
        checkRadioButtons();
    }
}

/**
 * Ellenőrzi a gyorskitöltő radio gombokat, és a foglaltakat deaktiválja
 * 
 * @returns {undefined}
 */
function checkRadioButtons() {
    const roomNames = getRoomNames();
    for (let radioButton of roomPrefillButtons) {
        const inputElement = radioButton.childNodes[0];
        if (roomNames.includes(inputElement.value)) {
            inputElement.setAttribute(DISABLED, true);
        } else {
            inputElement.removeAttribute(DISABLED);
        }
        inputElement.checked = false;
    }
}

closeRoomDialogButton.addEventListener(CLICK, () => {
    addRoomDialog.close();
    toggleScreenControls();
});

addRoomButton.addEventListener(CLICK, () => {
    const roomName = addRoomInput.value;
    if (roomName) {
        addRoomInput.value = '';
        const addingSuccessful = createRoom(roomName);
        if (addingSuccessful) {
            addRoomDialog.close();
            toggleScreenControls();
        }
    } else {
        displayMessage('Név nélkül nem vehető fel szoba!');
    }
});