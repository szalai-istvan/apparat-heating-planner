import { CreateRoomAction } from "../../actions/room/CreateRoomAction.js";
import { RoomCalculations } from "../../actions/room/RoomCalculations.js";
import { ApplicationState } from "../../appdata/ApplicationState.js";
import { Constants } from "../../appdata/Constants.js";
import { UiCalculations } from "../UICalculations.js";
import { Dialogs } from "./Dialogs.js";

const addRoomDialog = document.getElementById('addRoomDialog');
const addRoomInput = document.getElementById('addRoomInput');
const addRoomButton = document.getElementById('addRoomButton');
const closeRoomDialogButton = document.getElementById('closeRoomDialogButton');
const threePointDefinitionCheckbox = document.getElementById('3pointdefinition');

/**
 * Megjeleníti a szoba hozzáadásra szolgáló dialogot.
 * 
 * @returns {undefined}
 */
function showAddRoomDialog() {
    if (UiCalculations.operationInProgress()) {
        return;
    }

    if (RoomCalculations.selectedRoomIsConfiguredOrNoRoomIsSelected()) {
        checkRadioButtons();
        addRoomInput.value = '';
        threePointDefinitionCheckbox.checked = false;
        addRoomInput.focus();
        addRoomDialog.showModal();
        Dialogs.toggleScreenControls();
    }
}

/**
 * Ellenőrzi a gyorskitöltő radio gombokat, és a foglaltakat deaktiválja
 * 
 * @returns {undefined}
 */
function checkRadioButtons() {
    const roomNames = RoomCalculations.getRoomNames();
    for (let radioButton of ApplicationState.roomPrefillButtons) {
        const inputElement = radioButton.childNodes[0];
        if (roomNames.includes(inputElement.value)) {
            inputElement.setAttribute(Constants.strings.disabled, true);
        } else {
            inputElement.removeAttribute(Constants.strings.disabled);
        }
        inputElement.checked = false;
    }
}

closeRoomDialogButton.addEventListener(Constants.strings.click, () => {
    addRoomDialog.close();
    Dialogs.toggleScreenControls();
});

addRoomButton.addEventListener(Constants.strings.click, () => {
    const roomName = addRoomInput.value;
    if (roomName) {
        addRoomInput.value = '';
        const tilted = threePointDefinitionCheckbox.checked;
        const addingSuccessful = CreateRoomAction.createRoom(roomName, tilted);
        if (addingSuccessful) {
            addRoomDialog.close();
            Dialogs.toggleScreenControls();
        }
    } else {
        displayMessage('Név nélkül nem vehető fel szoba!');
    }
});

/**
 * Szoba hozzáadó dialógus műveletei.
 */
export const AddRoomDialog = {
    showAddRoomDialog
};