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
        room.select();
    }

    addPoint() {
        const selectedRoom = this.#selectedRoom;
        if (selectedRoom && this.#pointIsNotInAnyRoom()) {
            selectedRoom.addPoint();
        }
    }

    checkForSelection() {
        const selection = this.#rooms.filter(r => r.pointIsInsideText());
        const room = selection[0];
        if (room) {
            this.#rooms.forEach(r => r.deSelect());
            room.select();
        }
    }

    selectRoom(room) {
        this.#selectedRoom = room;
    }

    deselectRoom() {
        this.#selectedRoom = null;
    }

    removeSelected() {
        const room = this.#selectedRoom;
        if (room) {
            room.remove();
            this.#rooms = this.#rooms.filter(r => r !== room);
            this.deselectRoom();
        }
    }

    displayDeleteButton() {
        return this.#selectedRoom && this.#selectedRoom.roomIsConfigured();
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