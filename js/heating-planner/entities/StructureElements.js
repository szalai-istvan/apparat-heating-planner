/**
 * Egy szoba szerkezeti elemeit reprezentáló osztály
 */
export class StructureElements {
    /** @type {string} */
    id;

    /** @type {number} */
    alignment;
    /** @type {Line[]} */
    alignedBeams = [];
    /** @type {Line[]} */
    crossBeams = [];
    /** @type {Line[]} */
    ud30Beams = [];

    /** @type {string} */
    roomId;

    constructor(room) {
        // this.id = createUniqueId(); todo

        this.roomId = room.id;
        room.structureElementsId = this.id;
    }
}
