class RoomContext {
    #cachedSelection = null;
    #selectedRoom = null;
    #rooms = [];

    constructor() {}

    // public
    createRoom(name) {
        name = name.trim();

        if (this.#roomNameAlreadyExists(name)) {
            displayErrorMessage(`${name} nevű szoba már létezik. Egyedi nevet kell megadni.`);
            return false;
        }
        const room = new Room(name);
        this.#rooms.push(room);

        tooltip.roomAddingStarted();
        selectionContext.selectObject(room);
        return true;
    }

    addPoint() {
        const selectedRoom = this.#selectedRoom;
        if (selectedRoom && this.#pointIsValid()) {
            selectedRoom.addPoint();
        }
    }

    select(room) {
        this.deselect();

        room.select();
        this.#selectedRoom = room;

        if (room.roomIsConfigured()) {
            tooltip.roomSelected();
        }
    }

    deselect(selectedObject) {
        if (this.#selectedRoom && this.#selectedRoom.roomIsConfigured()) {
            this.#selectedRoom.deselect();
            this.#selectedRoom = null;
            tooltip.roomDeselected();
        }
    }
    
    checkForSelection() {
        if (this.#cachedSelection) {
            return this.#cachedSelection;
        }

        const selection = this.#rooms.filter(r => r.pointIsInsideText());
        const room = selection[0];
        if (room) {
            if (room !== this.#selectedRoom) {
                tooltip.roomNameHovered();
            }
            this.#cachedSelection = room;
            return room;
        }
        tooltip.roomNameUnhovered();
    }

    clearSelectionCache() {
        this.#cachedSelection = null;
    }

    removeSelected() {
        const room = this.#selectedRoom;
        if (room) {
            room.remove();
            this.#rooms = this.#rooms.filter(r => r !== room);
            selectionContext.deselect();
        }
        if (this.#rooms.length === 0) {
            tooltip.scalingFinished();
        }
    }

    selectedRoomIsConfiguredOrNoRoomIsSelected() {
        if (!this.#selectedRoom) {
            return true;
        }

        return this.selectedRoomIsConfigured();
    }

    selectedRoomIsConfigured() {
        return this.#selectedRoom && this.#selectedRoom.roomIsConfigured();
    }

    displayDeleteButton() {
        return this.selectedRoomIsConfigured();
    }

    thereAreRooms() {
        return this.#rooms.length > 0 && this.#rooms[0].roomIsConfigured();
    }

    clear() {
        this.#rooms.forEach(room => room.remove());
        this.#rooms = [];
        selectionContext.deselect();
        panelContext.clear();
    }

    getRoomContainingPoint(point) {
        const room = this.#rooms.filter(r => r.pointIsInsideRoom(point))[0];
        if (room) {
            return room.getName();
        }
        return null;
    }

    getRoomNames() {
        return this.#rooms.map(r => r.getName());
    }

    // private
    #roomNameAlreadyExists(name) {
        return this.#rooms.map(room => room.getName().toLowerCase()).includes(name.toLowerCase());
    }

    #pointIsValid() {
        const pointIsNotInAnyRooms = this.#rooms.filter(r => r.pointIsInsideRoom()).length === 0;
        if (!pointIsNotInAnyRooms) {
            return false;
        }
        return true;
    }
}

const roomContext = new RoomContext();