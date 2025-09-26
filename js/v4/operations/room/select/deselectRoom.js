/**
 * Megszűnteti a kiválasztott szoba kiválasztottságát
 * 
 * @returns {boolean} a művelet sikeressége
 */
function deselectRoom() {
    const room = selectedRoom;
    
    if (!room) {
        return true;
    }
    
    if (roomIsConfigured(room)) {
        room.isSelected = false;
        selectedRoom = null;

        if (mousePointerIsInsideRoom(room)) {
            calculateTextCenterPositionOfRoom(room);
        }
    }

    return true;
}