class StructureElements {
    id;

    alignment;
    alignedBeams = [];
    crossBeams = [];

    roomId;

    constructor(room) {
        this.id = createUniqueId();

        this.roomId = room.id;
        room.structureElementsId = this.id;
    }
}
