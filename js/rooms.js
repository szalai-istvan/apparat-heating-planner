var roomsContext = {
    rooms: [],
    
    addRoom: function(room) {
        if (!room) {
            return;
        }
        
        if (this.rooms.includes(room)) {
            displayErrorMessage(`${room} nevű szoba már létezik. Egyedi nevet kell megadni.`);
            return;
        }
        this.rooms.push(room);
        this.refreshRoomSelectionBox(removeRoomSelect);
        this.refreshRoomSelectionBox(addPanelRoomSelect);
    },

    removeRoom: function(room) {
        this.rooms = this.rooms.filter(r => r !== room);
        this.refreshRoomSelectionBox(removeRoomSelect);
        this.refreshRoomSelectionBox(addPanelRoomSelect);
    },

    refreshRoomSelectionBox: function(roomSelectionBox) {
        while (roomSelectionBox.firstChild) {
            roomSelectionBox.removeChild(roomSelectionBox.firstChild);
        }
        for (let room of this.rooms) {
            var option = document.createElement("option");
            option.text = room;
            option.value = room;
            roomSelectionBox.appendChild(option);
        }
    }
};