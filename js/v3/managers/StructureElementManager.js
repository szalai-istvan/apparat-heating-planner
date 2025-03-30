class StructureElementManager {

    static tryToAddPanelGroup(structureElements, panel) {
        const panelAlignment = panel.alignment;
        if (structureElements.alignment === undefined || panelAlignment === structureElements.alignment) {
            StructureElementManager.setAlignment(structureElements, panelAlignment);
            if (!structureElements.panels.includes(panel)) {
                structureElements.panels.push(panel);
                StructureElementManager.recalculateBeams(structureElements);
            }
            return true;
        }
        return false;
    }

    static removePanelGroup(structureElements, panel) {
        structureElements.panels = structureElements.panels.filter(p => p !== panel);
        StructureElementManager.recalculateBeams(structureElements);
        if (structureElements.panels.length === 0) {
            StructureElementManager.setAlignment(structureElements, undefined);
        }
    }

    static registerRotation(structureElements, panel) {
        if (structureElements.alignment === undefined) {
            return true;
        }
        if (structureElements.panels.length < 2 && structureElements.panels[0] === panel) {
            StructureElementManager.setAlignment(structureElements, (panel.alignment + 1) % 2)
            return true;
        }
        displayMessage('A panel elforgatásának hatására egymásra merőleges panelek szerepelnének a szobában!<br/>Mozgasson, vagy távolítson el paneleket, mielőtt elforgatja!');
        return false;
    }

    static clear(structureElements) {
        structureElements.panels.forEach(p => PanelSelector.remove(p));
        structureElements.panels = [];
        structureElements.alignedBeams = [];
        structureElements.crossBeams = [];
    }

    static recalculateBeams(structureElements) {
        structureElements.alignedBeams = [];
        structureElements.crossBeams = [];

        if (structureElements.alignment) {
            StructureElementManager.recalculateAlignedBeamsVertical(structureElements);
            StructureElementManager.recalculateCrossBeamsVertical(structureElements);
        } else {
            StructureElementManager.recalculateAlignedBeamsHorizontal(structureElements);
            StructureElementManager.recalculateCrossBeamsHorizontal(structureElements);
        }
    }

    static getCd3060Amount(structureElements) {
        const aligned = structureElements.alignedBeams.map(beam => StructureElementManager.getLength(beam)).reduce((a, b) => a + b, 0);
        const crossed = structureElements.crossBeams.map(beam => StructureElementManager.getLength(beam)).reduce((a, b) => a + b, 0);

        return aligned + crossed;
    }

    static recalculateAlignedBeamsHorizontal(structureElements) {
        const roomTopLeft = StructureElementManager.getRoomTopLeftCornerCoordinates(structureElements);
        const roomTopRight = StructureElementManager.getRoomTopRightCornerCoordinates(structureElements);

        for (let p of structureElements.panels) {
            const panelTopLeft = PanelManager.getTopLeftCornerCoordinates(p);
            const panelWidth = PanelManager.getSizeInPixels(p).width;
            
            for (let offset = 0; offset <= p.numberOfPanelsInGroup; offset++) {
                const y = panelTopLeft.y + offset * panelWidth;
                const beamDefinition = StructureElementManager.createBeamDefinition(roomTopLeft.x, y, roomTopRight.x, y);
                structureElements.alignedBeams.push(beamDefinition);
            }
        }
    }

    static recalculateCrossBeamsHorizontal(structureElements) {
        const roomTopLeft = StructureElementManager.getRoomTopLeftCornerCoordinates(structureElements);
        const roomBottomLeft = StructureElementManager.getRoomBottomLeftCornerCoordinates(structureElements);
        const roomBottomRight = StructureElementManager.getRoomBottomRightCornerCoordinates(structureElements);

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
            const beam = StructureElementManager.createBeamDefinition(x, y1, x, y2);
            structureElements.crossBeams.push(beam);
            x += pixelsBetweenBeams;
        }
    }

    static recalculateAlignedBeamsVertical(structureElements) {
        const roomTopLeft = StructureElementManager.getRoomTopLeftCornerCoordinates(structureElements);
        const roomBottomLeft = StructureElementManager.getRoomBottomLeftCornerCoordinates(structureElements);

        for (let p of structureElements.panels) {
            const panelTopLeft = PanelManager.getTopLeftCornerCoordinates(p);
            const panelWidth = PanelManager.getSizeInPixels(p).width;

            for (let offset = 0; offset <= p.numberOfPanelsInGroup; offset++) {
                const x = panelTopLeft.x - offset * panelWidth;
                const beamDefinition = StructureElementManager.createBeamDefinition(x, roomTopLeft.y, x, roomBottomLeft.y);
                structureElements.alignedBeams.push(beamDefinition);
            }
        }
    }

    static recalculateCrossBeamsVertical(structureElements) {
        const roomTopLeft = StructureElementManager.getRoomTopLeftCornerCoordinates(structureElements);
        const roomBottomLeft = StructureElementManager.getRoomBottomLeftCornerCoordinates(structureElements);
        const roomBottomRight = StructureElementManager.getRoomBottomRightCornerCoordinates(structureElements);

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
            const beam = StructureElementManager.createBeamDefinition(x1, y, x2, y);
            structureElements.crossBeams.push(beam);
            y += pixelsBetweenBeams;
        }
    }

    static getRoomTopLeftCornerCoordinates(structureElements) {
        return StructureElementManager.getRoomCornerCoordinates(structureElements, minimumFunction, minimumFunction);
    }

    static getRoomTopRightCornerCoordinates(structureElements) {
        return StructureElementManager.getRoomCornerCoordinates(structureElements, maximumFunction, minimumFunction);
    }

    static getRoomBottomLeftCornerCoordinates(structureElements) {
        return StructureElementManager.getRoomCornerCoordinates(structureElements, minimumFunction, maximumFunction);
    }

    static getRoomBottomRightCornerCoordinates(structureElements) {
        return StructureElementManager.getRoomCornerCoordinates(structureElements, maximumFunction, maximumFunction);
    }

    static getRoomCornerCoordinates(structureElements, xReducer, yReducer) {
        const points = structureElements.roomPoints;
        const x = points.map(p => p.x).reduce(xReducer);
        const y = points.map(p => p.y).reduce(yReducer);
        return { x, y };
    }

    static setAlignment(structureElements, alignment) {
        structureElements.alignment = alignment;
        if (alignment === 0) {
            structureElements.drawAlignedBeamsFunc = () => structureElements.alignedBeams.forEach(beam => StructureElementsInRoomRenderer.drawHorizontalBeam(structureElements, beam));
            structureElements.drawCrossBeamsFunc = () => structureElements.crossBeams.forEach(beam => StructureElementsInRoomRenderer.drawVerticalBeam(structureElements, beam));
        } else if (alignment === 1) {
            structureElements.drawAlignedBeamsFunc = () => structureElements.alignedBeams.forEach(beam => StructureElementsInRoomRenderer.drawVerticalBeam(structureElements, beam));
            structureElements.drawCrossBeamsFunc = () => structureElements.crossBeams.forEach(beam => StructureElementsInRoomRenderer.drawHorizontalBeam(structureElements, beam));
        } else {
            structureElements.drawAlignedBeamsFunc = undefined;
            structureElements.drawCrossBeamsFunc = undefined;
        }
    }
    
    static createBeamDefinition(x1, y1, x2, y2) {
        return {
            p1: { x: x1, y: y1 },
            p2: { x: x2, y: y2 }
        };
    }

    static getLength(beam) {
        const length = calculateDistance(beam.p1, beam.p2);
        return length / scaleContext.pixelsPerMetersRatio;
    }

}