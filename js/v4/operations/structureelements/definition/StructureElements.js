class StructureElements {
    id;

    alignment;
    /** @type {Line[]} */
    alignedBeams = [];
    /** @type {Line[]} */
    crossBeams = [];
    ud30Beams;

    roomId;

    constructor(room) {
        this.id = createUniqueId();

        this.roomId = room.id;
        room.structureElementsId = this.id;
    }
}
