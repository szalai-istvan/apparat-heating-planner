class StructureElementsInRoomRenderer {

    static draw(structureElements) {
        if (getClassName(structureElements) !== 'StructureElementsInRoom') {
            throw new Error('BeamRenderer can only render StructureElementsInRoom!');
        }

        if (structureElements.drawAlignedBeamsFunc) {
            structureElements.drawAlignedBeamsFunc();
        }

        if (structureElements.drawCrossBeamsFunc) {
            structureElements.drawCrossBeamsFunc();
        }
    }

    static drawHorizontalBeam(structureElements, beam) {
        fill(BEAM_COLOR);
        stroke(structureElements.lineWidth);

        const p1 = beam.p1;
        const p2 = beam.p2;

        rect(p1.x, p1.y - structureElements.beamWidthPixel / 2, Math.abs(p2.x - p1.x), structureElements.beamWidthPixel);
        StructureElementsInRoomRenderer.drawHorizontalText(structureElements, beam);
    }

    static drawVerticalBeam(structureElements, beam) {
        fill(BEAM_COLOR);
        stroke(structureElements.lineWidth);

        const p1 = beam.p1;
        const p2 = beam.p2;

        rect(p1.x - structureElements.beamWidthPixel / 2, p1.y, structureElements.beamWidthPixel, Math.abs(p2.y - p1.y));
        StructureElementsInRoomRenderer.drawVerticalText(structureElements, beam);
    }

    static drawHorizontalText(structureElements, beam) {
        textAlign(CENTER, CENTER);
        textSize(structureElements.textSize);
        noStroke();
        fill(DEFAULT_TEXT_COLOR);

        const centerP = {
            x: (beam.p1.x + beam.p2.x) / 2,
            y: (beam.p1.y + beam.p2.y) / 2,
        };

        const offset = Math.abs(beam.p1.x - beam.p2.x) / 4;
        const x1 = centerP.x - offset;
        const x2 = centerP.x + offset;
        text(structureElements.text, x1, centerP.y);
        text(structureElements.text, centerP.x, centerP.y);
        text(structureElements.text, x2, centerP.y);
    }

    static drawVerticalText(structureElements, beam) {
        textAlign(CENTER, CENTER);
        textSize(structureElements.textSize);
        noStroke();
        fill(DEFAULT_TEXT_COLOR);

        const centerP = {
            x: (beam.p1.x + beam.p2.x) / 2,
            y: (beam.p1.y + beam.p2.y) / 2,
        };

        push();
        translate(centerP.x, centerP.y);
        rotate(270);

        const offset = Math.abs(beam.p1.y - beam.p2.y) / 4;
        text(structureElements.text, offset, 0);
        text(structureElements.text, 0, 0);
        text(structureElements.text, -offset, 0);
        pop();
    }
}