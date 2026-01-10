/**
 * Megállapítja, hogy ha van szoba kiválasztva, akkor konfigurált-e.
 * 
 * @returns {boolean} true, ha nincs szoba kiválasztva, vagy a kiválasztott szoba be van konfigurálva. Egyéb esetben false.
 */
function selectedRoomIsConfiguredOrNoRoomIsSelected() {
    if (!selectedRoom) {
        return true;
    }

    return roomIsConfigured(selectedRoom);
}