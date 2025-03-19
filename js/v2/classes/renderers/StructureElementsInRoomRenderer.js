class StructureElementsInRoomRenderer {

    static draw(beam) {
        if (getClassName(beam) !== 'StructureElementsInRoom') {
            throw new Error('BeamRenderer can only render StructureElementsInRoom!');
        }

        if (beam.drawAlignedBeamsFunc) {
            beam.drawAlignedBeamsFunc();
        }

        if (beam.drawCrossBeamsFunc) {
            beam.drawCrossBeamsFunc();
        }
    }
}