var addRoomsButton;

const addRoomDialog = document.getElementById('addRoomDialog');
const addRoomInput = document.getElementById('addRoomInput');
const addRoomButton = document.getElementById('addRoomButton');
const closeRoomDialogButton = document.getElementById('closeRoomDialogButton');

function showAddRoomDialog() {
    addRoomInput.value = '';
    addRoomDialog.showModal();
}

closeRoomDialogButton.addEventListener('click', () => addRoomDialog.close());

addRoomButton.addEventListener('click', () => {
    const roomName = addRoomInput.value;
    if (addRoomInput.value) {
        addRoomInput.value = '';
        const addingSuccessful = roomContext.createRoom(roomName);
        if (addingSuccessful) {
            addRoomDialog.close();
        }
    }
});