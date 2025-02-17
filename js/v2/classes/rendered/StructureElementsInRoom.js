class StructureElementsInRoom {
    #alignment;
    #room;
    #beamWidthPixel;

    #panels = [];
    #alignedBeams = [];
    #crossBeams = [];

    #drawAlignedBeamsFunc;
    #drawCrossBeamsFunc;

    constructor(room) {
        this.#room = room;
        this.#alignment = undefined;
        renderer.register(this);
        this.#beamWidthPixel = BEAM_WIDTH_METER * scaleContext.pixelsPerMetersRatio;
    }

    // public
    draw() {

    }

    addPanelGroup(panel) {
        const panelAlignment = panel.getAlignment();
        if (this.#alignment === undefined || panelAlignment === this.#alignment) {
            this.#setAlignment(panelAlignment);
            if (!this.#panels.includes(panel)) {
                this.#panels.push(panel);
                this.recalculateBeams();    
            }
            return true;
        }
        return false;
    }

    removePanelGroup(panel) {
        this.#panels = this.#panels.filter(p => p !== panel);
        this.recalculateBeams();
        if (this.#panels.length === 0) {
            this.#setAlignment(undefined);
        }
    }

    registerRotation(panel) {
        if (this.#alignment === undefined) {
            return true;
        }
        if (this.#panels.length < 2 && this.#panels[0] === panel) {
            this.#setAlignment((panel.getAlignment() + 1) % 2);
            return true;
        }
        displayErrorMessage('A panel elforgatásának hatására egymásra merőleges panelek szerepelnének a szobában!<br/>Mozgasson, vagy távolítson el paneleket, mielőtt elforgatja!');
        return false;
    }

    clear() {
        this.#panels.forEach(p => p.remove());
        this.#panels = [];
        this.#alignedBeams = [];
        this.#crossBeams = [];
    }
    
    recalculateBeams() {
        this.#alignedBeams = [];
        this.#crossBeams = [];

        if (this.#alignment) {
            this.#recalculateAlignedBeamsVertical();
            this.#recalculateCrossBeamsVertical();
        } else {
            this.#recalculateAlignedBeamsHorizontal();
            this.#recalculateCrossBeamsHorizontal();
        }
    }

    getRenderObjects() {
        return {
            alignedBeams: {
                draw: () => this.#drawAlignedBeamsFunc && this.#drawAlignedBeamsFunc()
            },
            crossBeams: {
                draw: () => this.#drawCrossBeamsFunc && this.#drawCrossBeamsFunc()
            }
        };
    }

    // private
    #recalculateAlignedBeamsHorizontal() {
        const roomTopLeft = this.#getRoomTopLeftCornerCoordinates();
        const roomTopRight = this.#getRoomTopRightCornerCoordinates();

        for (let p of this.#panels) {
            const panelTopLeft = p.getTopLeftCornerCoordinates();
            const panelWidth = p.getSizeInPixels().width;

            for (let offset = 0; offset <= p.getNumberOfPanelsInGroup(); offset++) {
                const y = panelTopLeft.y + offset * panelWidth;
                const beamDefinition = this.#createBeamDefinition(roomTopLeft.x, y, roomTopRight.x, y);
                this.#alignedBeams.push(beamDefinition);
            }
        }
    }

    #recalculateCrossBeamsHorizontal() {

    }

    #recalculateAlignedBeamsVertical() {
        const roomTopLeft = this.#getRoomTopLeftCornerCoordinates();
        const roomBottomLeft = this.#getRoomBottomLeftCornerCoordinates();

        for (let p of this.#panels) {
            const panelTopLeft = p.getTopLeftCornerCoordinates();
            const panelWidth = p.getSizeInPixels().width;

            for (let offset = 0; offset <= p.getNumberOfPanelsInGroup(); offset++) {
                const x = panelTopLeft.x - offset * panelWidth;
                const beamDefinition = this.#createBeamDefinition(x, roomTopLeft.y, x, roomBottomLeft.y);
                this.#alignedBeams.push(beamDefinition);
            }
        }
    }

    #recalculateCrossBeamsVertical() {

    }

    #createBeamDefinition(x1, y1, x2, y2) {
        return {
            p1: {x: x1, y: y1},
            p2: {x: x2, y: y2}
        };
    }

    #getRoomTopLeftCornerCoordinates() {
        return this.#getRoomCornerCoordinates(minimumFunction, minimumFunction);
    }

    #getRoomTopRightCornerCoordinates() {
        return this.#getRoomCornerCoordinates(maximumFunction, minimumFunction);
    }

    #getRoomBottomLeftCornerCoordinates() {
        return this.#getRoomCornerCoordinates(minimumFunction, maximumFunction);
    }

    #getRoomBottomRightCornerCoordinates() {
        return this.#getRoomCornerCoordinates(maximumFunction, maximumFunction);
    }

    #getRoomCornerCoordinates(xReducer, yReducer) {
        const points = this.#room.getPoints();
        const x = points.map(p => p.x).reduce(xReducer);
        const y = points.map(p => p.y).reduce(yReducer);
        return {x, y};
    }

    #setAlignment(alignment) {
        this.#alignment = alignment;
        if (alignment === 0) {
            this.#drawAlignedBeamsFunc = () => this.#alignedBeams.forEach(beam => this.#drawHorizontalBeam(beam));
            this.#drawCrossBeamsFunc = () => this.#crossBeams.forEach(beam => this.#drawVerticalBeam(beam));
        } else if (alignment === 1) {
            this.#drawAlignedBeamsFunc = () => this.#alignedBeams.forEach(beam => this.#drawVerticalBeam(beam));
            this.#drawCrossBeamsFunc = () => this.#crossBeams.forEach(beam => this.#drawHorizontalBeam(beam));
        } else {
            this.#drawAlignedBeamsFunc = undefined;
            this.#drawCrossBeamsFunc = undefined;
        }
    }
    
    #drawHorizontalBeam(beam) {
        fill(BEAM_COLOR);
        stroke(2);

        const p1 = beam.p1;
        const p2 = beam.p2;
        
        rect(p1.x, p1.y - this.#beamWidthPixel / 2, Math.abs(p2.x - p1.x), this.#beamWidthPixel);
    }

    #drawVerticalBeam(beam) {
        fill(BEAM_COLOR);
        stroke(2);
        
        const p1 = beam.p1;
        const p2 = beam.p2;

        rect(p1.x - this.#beamWidthPixel / 2, p1.y, this.#beamWidthPixel, Math.abs(p2.y - p1.y));
    }
}
