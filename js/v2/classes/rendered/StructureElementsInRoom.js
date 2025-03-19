class StructureElementsInRoom {
    alignment;
    room;
    beamWidthPixel;
    textSize;
    lineWidth;

    panels = [];
    alignedBeams = [];
    crossBeams = [];

    drawAlignedBeamsFunc;
    drawCrossBeamsFunc;

    constructor(room) {
        this.room = room;
        this.alignment = undefined;
        renderer.register(this);
        this.lineWidth = ROOM_LINE_WEIGHT_IN_METERS * scaleContext.pixelsPerMetersRatio;

        this.beamWidthPixel = BEAM_WIDTH_METER * scaleContext.pixelsPerMetersRatio;
        this.textSize = BEAM_TEXT_SIZE_METER * scaleContext.pixelsPerMetersRatio;
    }

    addPanelGroup(panel) {
        const panelAlignment = panel.getAlignment();
        if (this.alignment === undefined || panelAlignment === this.alignment) {
            this.setAlignment(panelAlignment);
            if (!this.panels.includes(panel)) {
                this.panels.push(panel);
                this.recalculateBeams();
                this.calculateAdjustmentIfNecessary(panel);
            }
            return true;
        }
        return false;
    }

    removePanelGroup(panel) {
        this.panels = this.panels.filter(p => p !== panel);
        this.recalculateBeams();
        if (this.panels.length === 0) {
            this.setAlignment(undefined);
        }
    }

    registerRotation(panel) {
        if (this.alignment === undefined) {
            return true;
        }
        if (this.panels.length < 2 && this.panels[0] === panel) {
            this.setAlignment((panel.getAlignment() + 1) % 2);
            return true;
        }
        displayErrorMessage('A panel elforgatásának hatására egymásra merőleges panelek szerepelnének a szobában!<br/>Mozgasson, vagy távolítson el paneleket, mielőtt elforgatja!');
        return false;
    }

    clear() {
        this.panels.forEach(p => p.remove());
        this.panels = [];
        this.alignedBeams = [];
        this.crossBeams = [];
    }

    recalculateBeams() {
        this.alignedBeams = [];
        this.crossBeams = [];

        if (this.alignment) {
            this.recalculateAlignedBeamsVertical();
            this.recalculateCrossBeamsVertical();
        } else {
            this.recalculateAlignedBeamsHorizontal();
            this.recalculateCrossBeamsHorizontal();
        }
    }

    getCd3060Amount() {
        const aligned = this.alignedBeams.map(beam => this.getLength(beam)).reduce((a, b) => a + b, 0);
        const crossed = this.crossBeams.map(beam => this.getLength(beam)).reduce((a, b) => a + b, 0);

        return aligned + crossed;
    }

    
    recalculateAlignedBeamsHorizontal() {
        const roomTopLeft = this.getRoomTopLeftCornerCoordinates();
        const roomTopRight = this.getRoomTopRightCornerCoordinates();

        for (let p of this.panels) {
            const panelTopLeft = p.getTopLeftCornerCoordinates();
            const panelWidth = p.getSizeInPixels().width;

            for (let offset = 0; offset <= p.getNumberOfPanelsInGroup(); offset++) {
                const y = panelTopLeft.y + offset * panelWidth;
                const beamDefinition = this.createBeamDefinition(roomTopLeft.x, y, roomTopRight.x, y);
                this.alignedBeams.push(beamDefinition);
            }
        }
    }

    recalculateCrossBeamsHorizontal() {
        const roomTopLeft = this.getRoomTopLeftCornerCoordinates();
        const roomBottomLeft = this.getRoomBottomLeftCornerCoordinates();
        const roomBottomRight = this.getRoomBottomRightCornerCoordinates();

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
            const beam = this.createBeamDefinition(x, y1, x, y2);
            this.crossBeams.push(beam);
            x += pixelsBetweenBeams;
        }
    }

    recalculateAlignedBeamsVertical() {
        const roomTopLeft = this.getRoomTopLeftCornerCoordinates();
        const roomBottomLeft = this.getRoomBottomLeftCornerCoordinates();

        for (let p of this.panels) {
            const panelTopLeft = p.getTopLeftCornerCoordinates();
            const panelWidth = p.getSizeInPixels().width;

            for (let offset = 0; offset <= p.getNumberOfPanelsInGroup(); offset++) {
                const x = panelTopLeft.x - offset * panelWidth;
                const beamDefinition = this.createBeamDefinition(x, roomTopLeft.y, x, roomBottomLeft.y);
                this.alignedBeams.push(beamDefinition);
            }
        }
    }

    recalculateCrossBeamsVertical() {
        const roomTopLeft = this.getRoomTopLeftCornerCoordinates();
        const roomBottomLeft = this.getRoomBottomLeftCornerCoordinates();
        const roomBottomRight = this.getRoomBottomRightCornerCoordinates();

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
            const beam = this.createBeamDefinition(x1, y, x2, y);
            this.crossBeams.push(beam);
            y += pixelsBetweenBeams;
        }
    }

    createBeamDefinition(x1, y1, x2, y2) {
        return {
            p1: { x: x1, y: y1 },
            p2: { x: x2, y: y2 }
        };
    }

    getRoomTopLeftCornerCoordinates() {
        return this.getRoomCornerCoordinates(minimumFunction, minimumFunction);
    }

    getRoomTopRightCornerCoordinates() {
        return this.getRoomCornerCoordinates(maximumFunction, minimumFunction);
    }

    getRoomBottomLeftCornerCoordinates() {
        return this.getRoomCornerCoordinates(minimumFunction, maximumFunction);
    }

    getRoomBottomRightCornerCoordinates() {
        return this.getRoomCornerCoordinates(maximumFunction, maximumFunction);
    }

    getRoomCornerCoordinates(xReducer, yReducer) {
        const points = this.room.getPoints();
        const x = points.map(p => p.x).reduce(xReducer);
        const y = points.map(p => p.y).reduce(yReducer);
        return { x, y };
    }

    setAlignment(alignment) {
        this.alignment = alignment;
        if (alignment === 0) {
            this.drawAlignedBeamsFunc = () => this.alignedBeams.forEach(beam => this.drawHorizontalBeam(beam));
            this.drawCrossBeamsFunc = () => this.crossBeams.forEach(beam => this.drawVerticalBeam(beam));
        } else if (alignment === 1) {
            this.drawAlignedBeamsFunc = () => this.alignedBeams.forEach(beam => this.drawVerticalBeam(beam));
            this.drawCrossBeamsFunc = () => this.crossBeams.forEach(beam => this.drawHorizontalBeam(beam));
        } else {
            this.drawAlignedBeamsFunc = undefined;
            this.drawCrossBeamsFunc = undefined;
        }
    }

    drawHorizontalBeam(beam) {
        fill(BEAM_COLOR);
        stroke(this.lineWidth);

        const p1 = beam.p1;
        const p2 = beam.p2;

        rect(p1.x, p1.y - this.beamWidthPixel / 2, Math.abs(p2.x - p1.x), this.beamWidthPixel);
        this.drawHorizontalText(beam);
    }

    drawVerticalBeam(beam) {
        fill(BEAM_COLOR);
        stroke(this.lineWidth);

        const p1 = beam.p1;
        const p2 = beam.p2;

        rect(p1.x - this.beamWidthPixel / 2, p1.y, this.beamWidthPixel, Math.abs(p2.y - p1.y));
        this.drawVerticalText(beam);
    }

    drawHorizontalText(beam) {
        textAlign(CENTER, CENTER);
        textSize(this.textSize);
        noStroke();
        fill(DEFAULT_TEXT_COLOR);

        const centerP = {
            x: (beam.p1.x + beam.p2.x) / 2,
            y: (beam.p1.y + beam.p2.y) / 2,
        };

        const offset = Math.abs(beam.p1.x - beam.p2.x) / 4;
        const x1 = centerP.x - offset;
        const x2 = centerP.x + offset;
        text(BEAM_TYPE, x1, centerP.y);
        text(BEAM_TYPE, centerP.x, centerP.y);
        text(BEAM_TYPE, x2, centerP.y);
    }

    drawVerticalText(beam) {
        textAlign(CENTER, CENTER);
        textSize(this.textSize);
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
        text(BEAM_TYPE, offset, 0);
        text(BEAM_TYPE, 0, 0);
        text(BEAM_TYPE, -offset, 0);
        pop();
    }

    getLength(beam) {
        const length = calculateDistance(beam.p1, beam.p2);
        console.log(length / scaleContext.pixelsPerMetersRatio);
        return length / scaleContext.pixelsPerMetersRatio;
    }
}
