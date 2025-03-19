class RoomSelector {

    static select(room) {
        room.isSelected = true;
    }

    static tryToDeselect(room) {
        room.isSelected = false;
    }

    static remove(room) {
        renderer.remove(room);
        renderer.remove(room.structureElementsInRoom);
        room.structureElementsInRoom.clear();
    }
}