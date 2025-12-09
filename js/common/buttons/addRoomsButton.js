var addRoomsButton;
var roomPrefillButtons = [];

const addRoomDialog = document.getElementById('addRoomDialog');
const addRoomInput = document.getElementById('addRoomInput');
const addRoomButton = document.getElementById('addRoomButton');
const closeRoomDialogButton = document.getElementById('closeRoomDialogButton');
const threePointDefinitionCheckbox = document.getElementById('3pointdefinition');

/**
 * Létrehozza a szobanév gyorskitöltő radio gombokat.
 * 
 * @returns {undefined}
 */
function createRoomPrefillRadioButtons() {
    const div = document.getElementById(ROOM_PREFILL_RADIO_SET);
    for (let option of PREFILL_ROOM_NAMES) {
        const onchange = () => addRoomInput.value = option;
        const radioButton = createRadioButton(ROOM_PREFILL, option, onchange);
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
    if (operationInProgress()) {
        return;
    }

    if (selectedRoomIsConfiguredOrNoRoomIsSelected()) {
        addRoomInput.value = '';
        threePointDefinitionCheckbox.checked = false;
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
        const tilted = threePointDefinitionCheckbox.checked;
        const addingSuccessful = createRoom(roomName, tilted);
        if (addingSuccessful) {
            addRoomDialog.close();
            toggleScreenControls();
        }
    } else {
        displayMessage('Név nélkül nem vehető fel szoba!');
    }
});


function createRadioButton(name, value, onchange) {
    const input = document.createElement(INPUT);
    input.setAttribute(TYPE, RADIO);
    const id = value.toLowerCase();
    input.setAttribute(ID, id);
    input.setAttribute(NAME, name);
    input.setAttribute(VALUE, value);
    
    const label = document.createElement(LABEL);
    label.setAttribute(FOR, id)
    label.innerHTML = value;
    label.classList.add(RADIO_LABEL);
    
    const span = document.createElement(SPAN);
    span.appendChild(input);
    span.appendChild(label);
    input.addEventListener(CHANGE, onchange);
    return span;
}