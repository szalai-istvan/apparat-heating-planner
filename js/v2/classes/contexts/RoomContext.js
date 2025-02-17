class RoomContext {
    #cachedSelection = null;
    #selectedRoom = null;
    #rooms = [];

    constructor() {}

    // public
    // selection context methods
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
    
    select(room = undefined) {
        room = room || this.checkForSelection();
        if (!room) return;

        this.deselect();
        room.select();
        this.#selectedRoom = room;

        if (room.roomIsConfigured()) {
            tooltip.roomSelected();
        }
    }
    
    deselect() {
        if (this.#selectedRoom && this.#selectedRoom.roomIsConfigured()) {
            this.#selectedRoom.deselect();
            this.#selectedRoom = null;
            tooltip.roomDeselected();
        }
    }
    
    removeSelected() {
        const room = this.#selectedRoom;
        if (room) {
            room.remove();
            this.#rooms = this.#rooms.filter(r => r !== room);
            this.#selectedRoom = undefined;
        }
        if (this.#rooms.length === 0) {
            tooltip.scalingFinished();
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

    // Context specific public methods
    clear() {
        this.#rooms.forEach(room => room.remove());
        this.#rooms = [];
        selectionContext.deselect();
        panelContext.clear();
    }

    addPoint() {
        const selectedRoom = this.#selectedRoom;
        if (selectedRoom && this.#pointIsValid()) {
            selectedRoom.addPoint();
        }
    }

    selectedRoomIsConfiguredOrNoRoomIsSelected() {
        if (!this.#selectedRoom) {
            return true;
        }

        return this.#selectedRoom.roomIsConfigured();
    }

    displayDeleteButton() {
        return this.#selectedRoom && this.#selectedRoom.roomIsConfigured();
    }

    thereAreRooms() {
        return this.#rooms.length > 0 && this.#rooms[0].roomIsConfigured();
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

    registerRelocatedPanelGroup(panel) {
        const boundaryPoints = panel.getBoundaryPoints();
        const p1 = boundaryPoints.p1;
        const p2 = boundaryPoints.p2;

        const room = this.#rooms.filter(room => room.pointIsInsideRoom(p1) && room.pointIsInsideRoom(p2))[0];
        if (!room) {
            displayErrorMessage('A panelcsoport része vagy egésze szobán kívül van!<br/>Helyezze el a panelt máshová, vagy csökkentse a panelek hosszát a baloldali gombok segítségével!');    
            return false;
        }
        
        const successfulRegister = room.registerPanelGroup(panel);
        if (!successfulRegister) {
            displayErrorMessage('Egy adott szobában nem helyezhet el különböző irányban álló paneleket!');
            return false;
        }

        return room;
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
        // TODO ...
    }
}

const roomContext = new RoomContext();