import { screenContext } from "../classes/context/ScreenContext";
import { roomSelector } from "../classes/selector/RoomSelector";
import { displayErrorMessage } from "../helpers/errordialog";


export const addRoomDialog: HTMLDialogElement = document.getElementById('addRoomDialog') as HTMLDialogElement;
export const addRoomButton: HTMLButtonElement = document.getElementById('addRoomButton') as HTMLButtonElement;
const addRoomInput: HTMLInputElement = document.getElementById('addRoomInput') as HTMLInputElement;
const closeRoomDialogButton: HTMLButtonElement = document.getElementById('closeRoomDialogButton') as HTMLButtonElement;

export function showAddRoomDialog(): void {
    if (roomSelector.selectedRoomIsConfiguredOrNoRoomIsSelected()) {
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
        const addingSuccessful = roomSelector.create(roomName);
        if (addingSuccessful) {
            addRoomDialog.close();
            screenContext.enableControls();
        }
    } else {
        displayErrorMessage('Név nélkül nem vehető fel szoba!');
    }
});