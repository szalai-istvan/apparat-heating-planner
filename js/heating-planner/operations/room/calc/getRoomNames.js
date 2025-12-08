/**
 * Visszaadja a létrehozott szobák neveit tartalmazó array-t.
 * 
 * @returns {string[]} A szobák neveinek listája.
 */
function getRoomNames() {
    return elementStore.rooms.map(r => r.name);
}