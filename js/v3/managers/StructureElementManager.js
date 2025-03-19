class StructureElementManager {

    static tryToAddPanelGroup(structureElements, panel) {
        const panelAlignment = panel.getAlignment();
        if (structureElements.alignment === undefined || panelAlignment === structureElements.alignment) {
            structureElements.setAlignment(panelAlignment);
            if (!structureElements.panels.includes(panel)) {
                structureElements.panels.push(panel);
                structureElements.recalculateBeams();
                structureElements.calculateAdjustmentIfNecessary(panel);
            }
            return true;
        }
        return false;
    }

    static removePanelGroup(structureElements, panel) {
        structureElements.panels = structureElements.panels.filter(p => p !== panel);
        structureElements.recalculateBeams();
        if (structureElements.panels.length === 0) {
            structureElements.setAlignment(undefined);
        }
    }

    static registerRotation(structureElements, panel) {
        if (structureElements.alignment === undefined) {
            return true;
        }
        if (structureElements.panels.length < 2 && structureElements.panels[0] === panel) {
            structureElements.setAlignment((panel.getAlignment() + 1) % 2);
            return true;
        }
        displayErrorMessage('A panel elforgatásának hatására egymásra merőleges panelek szerepelnének a szobában!<br/>Mozgasson, vagy távolítson el paneleket, mielőtt elforgatja!');
        return false;
    }

    static clear(structureElements) {
        structureElements.panels.forEach(p => p.remove());
        structureElements.panels = [];
        structureElements.alignedBeams = [];
        structureElements.crossBeams = [];
    }

    static recalculateBeams(structureElements) {
        structureElements.alignedBeams = [];
        structureElements.crossBeams = [];

        if (structureElements.alignment) {
            structureElements.recalculateAlignedBeamsVertical();
            structureElements.recalculateCrossBeamsVertical();
        } else {
            structureElements.recalculateAlignedBeamsHorizontal();
            structureElements.recalculateCrossBeamsHorizontal();
        }
    }

    static getCd3060Amount(structureElements) {
        const aligned = structureElements.alignedBeams.map(beam => structureElements.getLength(beam)).reduce((a, b) => a + b, 0);
        const crossed = structureElements.crossBeams.map(beam => structureElements.getLength(beam)).reduce((a, b) => a + b, 0);

        return aligned + crossed;
    }

    static recalculateAlignedBeamsHorizontal(structureElements) {
        const roomTopLeft = structureElements.getRoomTopLeftCornerCoordinates();
        const roomTopRight = structureElements.getRoomTopRightCornerCoordinates();

        for (let p of structureElements.panels) {
            const panelTopLeft = p.getTopLeftCornerCoordinates();
            const panelWidth = p.getSizeInPixels().width;

            for (let offset = 0; offset <= p.getNumberOfPanelsInGroup(); offset++) {
                const y = panelTopLeft.y + offset * panelWidth;
                const beamDefinition = structureElements.createBeamDefinition(roomTopLeft.x, y, roomTopRight.x, y);
                structureElements.alignedBeams.push(beamDefinition);
            }
        }
    }

    static recalculateCrossBeamsHorizontal(structureElements) {
        const roomTopLeft = structureElements.getRoomTopLeftCornerCoordinates();
        const roomBottomLeft = structureElements.getRoomBottomLeftCornerCoordinates();
        const roomBottomRight = structureElements.getRoomBottomRightCornerCoordinates();

        const roomWidthPixels = roomBottomRight.x - roomBottomLeft.x;
        const pixelsBetweenBeams = METERS_BETWEEN_BEAMS * scaleContext.pixelsPerMetersRatio;
        let initialOffset = (roomWidthPixels % pixelsBetweenBeams) / 2;
        const minimumOffset = BEAM_MINIMUM_OFFSET_METERS * scaleContext.pixelsPerMetersRatio;
        if (initialOffset < minimumOffset) {
            initialOffset += pixelsBetweenBeams;
        }

        let x = roomTopLeft.x + initialOffset;
        const y1 = roomTopLeft.y;
        const y2 = roomBottomLeft.y;
        while (x < (roomBottomRight.x - minimumOffset)) {
            const beam = structureElements.createBeamDefinition(x, y1, x, y2);
            structureElements.crossBeams.push(beam);
            x += pixelsBetweenBeams;
        }
    }

    static recalculateAlignedBeamsVertical(structureElements) {
        const roomTopLeft = structureElements.getRoomTopLeftCornerCoordinates();
        const roomBottomLeft = structureElements.getRoomBottomLeftCornerCoordinates();

        for (let p of structureElements.panels) {
            const panelTopLeft = p.getTopLeftCornerCoordinates();
            const panelWidth = p.getSizeInPixels().width;

            for (let offset = 0; offset <= p.getNumberOfPanelsInGroup(); offset++) {
                const x = panelTopLeft.x - offset * panelWidth;
                const beamDefinition = structureElements.createBeamDefinition(x, roomTopLeft.y, x, roomBottomLeft.y);
                structureElements.alignedBeams.push(beamDefinition);
            }
        }
    }

    static recalculateCrossBeamsVertical(structureElements) {
        const roomTopLeft = structureElements.getRoomTopLeftCornerCoordinates();
        const roomBottomLeft = structureElements.getRoomBottomLeftCornerCoordinates();
        const roomBottomRight = structureElements.getRoomBottomRightCornerCoordinates();

        const roomHeightPixels = roomBottomLeft.y - roomTopLeft.y;
        const pixelsBetweenBeams = METERS_BETWEEN_BEAMS * scaleContext.pixelsPerMetersRatio;
        let initialOffset = (roomHeightPixels % pixelsBetweenBeams) / 2;
        const minimumOffset = BEAM_MINIMUM_OFFSET_METERS * scaleContext.pixelsPerMetersRatio;
        if (initialOffset < minimumOffset) {
            initialOffset += pixelsBetweenBeams;
        }

        let y = roomTopLeft.y + initialOffset;
        const x1 = roomBottomLeft.x;
        const x2 = roomBottomRight.x;
        while (y < (roomBottomLeft.y - minimumOffset)) {
            const beam = structureElements.createBeamDefinition(x1, y, x2, y);
            structureElements.crossBeams.push(beam);
            y += pixelsBetweenBeams;
        }
    }

    createBeamDefinition(x1, y1, x2, y2) {
        return {
            p1: { x: x1, y: y1 },
            p2: { x: x2, y: y2 }
        };
    }

    static getRoomTopLeftCornerCoordinates(structureElements) {
        return structureElements.getRoomCornerCoordinates(minimumFunction, minimumFunction);
    }

    static getRoomTopRightCornerCoordinates(structureElements) {
        return structureElements.getRoomCornerCoordinates(maximumFunction, minimumFunction);
    }

    static getRoomBottomLeftCornerCoordinates(structureElements) {
        return structureElements.getRoomCornerCoordinates(minimumFunction, maximumFunction);
    }

    static getRoomBottomRightCornerCoordinates(structureElements) {
        return structureElements.getRoomCornerCoordinates(maximumFunction, maximumFunction);
    }

    static getRoomCornerCoordinates(structureElements, xReducer, yReducer) {
        const points = structureElements.room.getPoints();
        const x = points.map(p => p.x).reduce(xReducer);
        const y = points.map(p => p.y).reduce(yReducer);
        return { x, y };
    }

    static setAlignment(structureElements, alignment) {
        structureElements.alignment = alignment;
        if (alignment === 0) {
            structureElements.drawAlignedBeamsFunc = () => structureElements.alignedBeams.forEach(beam => structureElements.drawHorizontalBeam(beam));
            structureElements.drawCrossBeamsFunc = () => structureElements.crossBeams.forEach(beam => structureElements.drawVerticalBeam(beam));
        } else if (alignment === 1) {
            structureElements.drawAlignedBeamsFunc = () => structureElements.alignedBeams.forEach(beam => structureElements.drawVerticalBeam(beam));
            structureElements.drawCrossBeamsFunc = () => structureElements.crossBeams.forEach(beam => structureElements.drawHorizontalBeam(beam));
        } else {
            structureElements.drawAlignedBeamsFunc = undefined;
            structureElements.drawCrossBeamsFunc = undefined;
        }
    }

    static getLength(beam) {
        const length = calculateDistance(beam.p1, beam.p2);
        return length / scaleContext.pixelsPerMetersRatio;
    }

}