class RoomContext {
    #selectedRoom = null;
    #rooms = [];

    constructor() {}

    // public
    createRoom(name) {
        name = name.trim();

        if (this.#roomNameAlreadyExists(name)) {
            displayErrorMessage(`${name} nevű szoba már létezik. Egyedi nevet kell megadni.`);
            return;
        }
        const room = new Room(name);
        this.#rooms.push(room);

        selectionContext.selectObject(room);
    }

    addPoint() {
        const selectedRoom = this.#selectedRoom;
        if (selectedRoom && this.#pointIsNotInAnyRoom()) {
            selectedRoom.addPoint();
        }
    }

    select(room) {
        this.deselect();

        room.select();
        this.#selectedRoom = room;
    }

    deselect(contextReset = true) {
        if (this.#selectedRoom && this.#selectedRoom.roomIsConfigured()) {
            this.#selectedRoom.deselect();
            this.#selectedRoom = null;
        }
    }
    
    checkForSelection() {
        const selection = this.#rooms.filter(r => r.pointIsInsideText());
        const room = selection[0];
        if (room) {
            return room;
        }
    }

    removeSelected() {
        const room = this.#selectedRoom;
        if (room) {
            room.remove();
            this.#rooms = this.#rooms.filter(r => r !== room);
            selectionContext.deselect();
        }
    }

    displayDeleteButton() {
        return this.#selectedRoom && this.#selectedRoom.roomIsConfigured();
    }

    thereAreRooms() {
        return this.#rooms.length > 0 && this.#rooms[0].roomIsConfigured();
    }

    // private
    #roomNameAlreadyExists(name) {
        return this.#rooms.map(room => room.getName().toLowerCase()).includes(name.toLowerCase());
    }

    #pointIsNotInAnyRoom() {
        return this.#rooms.filter(r => r.pointIsInsideRoom()).length === 0;
    }
}

const roomContext = new RoomContext();