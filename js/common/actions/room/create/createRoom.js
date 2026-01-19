/**
 * Függvény, amely lefut a szoba létrehozása után.
 * 
 * @param {Room} room 
 */
let onRoomCreatedCallback = (room) => {};

/**
 * Létrehoz egy szobát.
 * 
 * @param {string} name szoba neve
 * @param {boolean} tilted boolean flag, ferde-e a szoba 
 * @returns {boolean} true, ha sikerült a szobát létrehozni, egyébként false
 */
function createRoom(name, tilted) {
    checkClass(name, CLASS_STRING);

    name = name.trim();

    if (roomNameAlreadyExists(name)) {
        displayMessage(`${name} nevű szoba már létezik. Egyedi nevet kell megadni.`);
        return false;
    }

    const room = new Room(name, tilted);
    elementStore.register(room);
    selectObject(room);

    onRoomCreatedCallback(room);

    return true;
}

function roomNameAlreadyExists(name) {
    return elementStore.rooms.map(room => room.name.toLowerCase()).includes(name.toLowerCase());
}

function onRoomIsCreated(callback) {
    onRoomCreatedCallback = callback;
}