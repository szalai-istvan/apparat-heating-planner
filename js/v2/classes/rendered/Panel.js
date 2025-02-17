class Panel {
    #type;
    #details;
    #lengthInPixels;
    #widthInPixels;
    #position; // top left corner coordinates
    #isSelected;
    #isSelectedForDrag;
    #alignment = 0;
    #numberOfPanelsInGroup = 1;
    #textWidth;
    #textSize;
    #countourLineWeight;
    #lineWeight;
    #room;

    constructor(type) {
        const ratio = scaleContext.pixelsPerMetersRatio;
        this.#countourLineWeight = PANEL_CONTOUR_LINE_THICKNESS * ratio;
        this.#lineWeight = PANEL_LINE_THICKNESS * ratio;
        this.#textSize = PANEL_TEXT_SIZE_IN_METERS * ratio;

        this.setType(type);
        this.selectForDrag();
        renderer.register(this);
    }

    // public
    draw() {
        this.getBoundaryPoints();
        this.getBoundaryPoints(this.#numberOfPanelsInGroup, (this.#alignment + 1) % 2);

        const ratio = scaleContext.pixelsPerMetersRatio;
        const length = this.#lengthInPixels;
        const width = this.#widthInPixels;
        const coordinates = this.#isSelectedForDrag ? this.#mousePositionToPosition() : this.#position;
        push();
        translate(coordinates.x, coordinates.y);
        rotate(this.#alignment * 90);

        for(let offset = 0; offset < this.#numberOfPanelsInGroup; offset++) {
            this.#drawWithOffset({ratio, length, width, offset});
        }

        translate(-coordinates.x, -coordinates.y);
        pop();
    }

    select() {
        this.#isSelected = true;
    }

    selectForDrag() {
        this.#isSelectedForDrag = true;
        this.#room && this.#room.removePanelFromRoom(this);
        this.#room = undefined;
    }

    deselect() {
        if (this.#isSelectedForDrag) {
            this.#position = this.#mousePositionToPosition();
        }

        const destinationRoom = roomContext.registerRelocatedPanelGroup(this);
        if (!destinationRoom) {
            return false;
        }
        this.#room = destinationRoom;

        this.#isSelected = false;
        this.#isSelectedForDrag = false;

        return true;
    }

    pointIsInsideText() {
        const width = this.#textWidth;
        const height = this.#widthInPixels * this.#numberOfPanelsInGroup * PANEL_SELECTION_MULTIPLIER;
        return pointIsInside(
            screenContext.getMousePositionAbsolute(),
            this.#getGroupCenterPositionAbsolute(), 
            this.#alignment ? height : width,
            this.#alignment ? width : height
        );
    }

    remove() {
        renderer.remove(this);
        this.#room && this.#room.removePanelFromRoom(this);
        this.#room = undefined;
    }

    rotate() {
        const newAlignment = (this.#alignment + 1) % 2;
        const boundaryPoints = this.getBoundaryPoints(this.#numberOfPanelsInGroup, newAlignment);
        if (this.#validateBoundaryPoints(boundaryPoints)) {
            if ((!this.#room) || (this.#room && this.#room.registerRotation(this))) {
                this.#position = this.#getTopLeftCornerCoordinates(newAlignment);
                this.#alignment = newAlignment;
                this.#room && this.#room.recalculateBeams();
            } 
        } else {
            displayErrorMessage('A forgatás hatására a panelcsoport egy része szobán kívülre kerülne!<br/>Helyezze át, mielőtt elforgatja!');
        }
    }

    addToGroup() {
        const newGroupNumber = (this.#numberOfPanelsInGroup + 1);
        const boundaryPoints = this.getBoundaryPoints(newGroupNumber, this.#alignment);
        if (this.#validateBoundaryPoints(boundaryPoints)) {
            this.#numberOfPanelsInGroup = newGroupNumber;
            this.#room.recalculateBeams();
        } else {
            displayErrorMessage('Újabb panel hozzáadásának hatására a panelcsoport egy része szobán kívülre kerülne!<br/>Helyezze át, mielőtt hozzáad a csoporthoz!');
        }
    }

    removeFromGroup() {
        this.#numberOfPanelsInGroup = Math.max(this.#numberOfPanelsInGroup - 1, 1);
        this.#room.recalculateBeams();
    }

    calculateQuotePanelArray() {
        let i = 0;
        const firstPosition = this.getFirstCenterPositionAbsolute();

        const quotePanels = [];
        while (i < this.#numberOfPanelsInGroup) {
            const offsetPosition = {
                x: firstPosition.x - i * (this.#alignment ? this.#widthInPixels : 0),
                y: firstPosition.y + i * (this.#alignment ? 0 : this.#widthInPixels)
            };

            const room = roomContext.getRoomContainingPoint(offsetPosition);

            quotePanels.push(new QuotePanel(this.#type, this.#details, room));
            i++;
        }
        return quotePanels;
    }

    getFirstCenterPositionAbsolute() {
        const position = this.#position;
        if (this.#alignment) {
            return {
                x: position.x - this.#widthInPixels * 0.5,
                y: position.y + this.#lengthInPixels * 0.5
            };
        }
        return {
            x: position.x + this.#lengthInPixels * 0.5,
            y: position.y + this.#widthInPixels * 0.5
        };
    }

    getBoundaryPoints(numberOfPanels = undefined, alignment = undefined) {
        numberOfPanels = numberOfPanels || this.#numberOfPanelsInGroup;
        alignment = alignment ?? this.#alignment;

        const coordinates = this.#isSelectedForDrag ? this.#mousePositionToPosition() : this.#getTopLeftCornerCoordinates(alignment);
        const extraLength = PANEL_TUBE_EXTRA_LENGTH_PER_SIDE * scaleContext.pixelsPerMetersRatio;

        let p1;
        let p2;
        if (!alignment) {
            p1 = {
                x: coordinates.x - extraLength,
                y: coordinates.y
            };
            p2 = {
                x: coordinates.x + this.#lengthInPixels + extraLength,
                y: coordinates.y + this.#widthInPixels * numberOfPanels
            };
        } else {
            p1 = {
                x: coordinates.x,
                y: coordinates.y - extraLength
            };
            p2 = {
                x: coordinates.x - this.#widthInPixels * numberOfPanels,
                y: coordinates.y + this.#lengthInPixels + extraLength
            };
        }
               
        return {p1, p2};
    }

    getAlignment() {
        return this.#alignment;
    }

    setType(type) {
        const ratio = scaleContext.pixelsPerMetersRatio;

        this.#details = panelTypes[type];
        if (!this.#details) {
            throw new Error(`Unknown panel type: ${type}`);
        }
        
        this.#type = type;
        textSize(this.#textSize);
        this.#textWidth = textWidth(this.#type);
        this.#position = screenContext.getMousePositionAbsolute();
        this.#lengthInPixels = this.#details.length * ratio;
        this.#widthInPixels = this.#details.width * ratio;
    }

    isSelectedForDrag() {
        return this.#isSelectedForDrag;
    }

    getTopLeftCornerCoordinates() {
        return this.#position;
    }

    getNumberOfPanelsInGroup() {
        return this.#numberOfPanelsInGroup;
    }

    getSizeInPixels() {
        return {length: this.#lengthInPixels, width: this.#widthInPixels};
    }

    // private
    #validateBoundaryPoints(boundaryPoints) {
        if (!this.#room || this.#isSelectedForDrag) {
            return true;
        }
        return this.#room.pointIsInsideRoom(boundaryPoints.p1) && this.#room.pointIsInsideRoom(boundaryPoints.p2);
    }

    #mousePositionToPosition() {
        const mousePosition = screenContext.getMousePositionAbsolute();
        if (this.#alignment) {
            return {
                x: mousePosition.x + this.#widthInPixels * 0.5 * this.#numberOfPanelsInGroup,
                y: mousePosition.y - this.#lengthInPixels / 2
            };    
        }
        return {
            x: mousePosition.x - this.#lengthInPixels / 2,
            y: mousePosition.y - this.#widthInPixels * 0.5 * this.#numberOfPanelsInGroup
        };
    }
    
    #getGroupCenterPositionAbsolute() {
        const position = this.#position;
        if (this.#alignment) {
            return {
                x: position.x - this.#widthInPixels * 0.5 * this.#numberOfPanelsInGroup,
                y: position.y + this.#lengthInPixels * 0.5
            };
        }
        return {
            x: position.x + this.#lengthInPixels * 0.5,
            y: position.y + this.#widthInPixels * 0.5 * this.#numberOfPanelsInGroup
        };
    }

    #getTextCenter(offset) {
        return {
            x: this.#lengthInPixels * 0.5,
            y: this.#widthInPixels * (0.5 + offset)
        };
    }

    #getTopLeftCornerCoordinates(alignment = undefined) {
        alignment = alignment ?? this.#alignment;

        if (alignment === this.#alignment) {
            return this.#position;
        }

        const offsetX = (this.#lengthInPixels + this.#widthInPixels * this.#numberOfPanelsInGroup) / 2;
        const offsetY = (this.#widthInPixels * this.#numberOfPanelsInGroup - this.#lengthInPixels) / 2;
        const alignmentMultiplier = -1 * ((-1) ** alignment);

        return {
            x: this.#position.x + alignmentMultiplier * offsetX,
            y: this.#position.y + alignmentMultiplier * offsetY
        };
    }

    #drawType(offset) {
        const coordinates = this.#getTextCenter(offset);
        stroke('black');
        fill(PANEL_FILL_COLOR);
        const rectWidth = this.#textWidth * PANEL_TEXT_RECT_SIZE_MUL;
        const rectHeight = this.#widthInPixels * 0.5 * PANEL_TEXT_RECT_SIZE_MUL;
        rect(
            coordinates.x - rectWidth / 2,
            coordinates.y - rectHeight / 2,
            rectWidth,
            rectHeight
        );

        textAlign(CENTER, CENTER);
        const pointIsInsideText = this.pointIsInsideText();
        if (pointIsInsideText || (this.#isSelected && !this.#isSelectedForDrag)) {
            fill(SELECTED_TEXT_COLOR);
        } else {
            fill(DEFAULT_TEXT_COLOR);
        }

        const p = PANEL_TEXT_POP_FACTOR;
        textSize(this.#textSize * (1 + p * this.#isSelected + p * pointIsInsideText));
        text(this.#type, coordinates.x, coordinates.y);
    }

    #drawWithOffset({ratio, length, width, offset}) {
        const widthOffset = width * offset;

        strokeWeight(this.#countourLineWeight);
        fill(PANEL_FILL_COLOR);
        translate(0, widthOffset);
        rect(0, 0, length, width);

        strokeWeight(this.#lineWeight);

        const i = width / 9;
        for (let pipeNumber = i; pipeNumber < width; pipeNumber += i) {
            line(0, pipeNumber, length, pipeNumber);
        }

        this.#drawTubes({ratio, length, width, offset});
        translate(0, -widthOffset);
        this.#drawType(offset);
    }

    #drawTubes({ratio, length, width, offset}) {
        const panelTubeExtraLength = PANEL_TUBE_EXTRA_LENGTH_PER_SIDE * scaleContext.pixelsPerMetersRatio;
        const panelStep = PANEL_TUBE_EXTRA_LENGTH_STEP * scaleContext.pixelsPerMetersRatio;

        noFill();
        strokeWeight(this.#lineWeight);

        this.#drawOneTube({
            endpoint1: 3,
            endpoint2: 8,
            length: panelTubeExtraLength,
            side: 0
        });
        this.#drawOneTube({
            endpoint1: 4,
            endpoint2: 7,
            length: panelTubeExtraLength - panelStep,
            side: 0
        });
        this.#drawOneTube({
            endpoint1: 5,
            endpoint2: 6,
            length: panelTubeExtraLength - 2 * panelStep,
            side: 0
        });

        this.#drawOneTube({
            endpoint1: 1,
            endpoint2: 8,
            length: panelTubeExtraLength,
            side: 1
        });
        this.#drawOneTube({
            endpoint1: 2,
            endpoint2: 7,
            length: panelTubeExtraLength - panelStep,
            side: 1
        });
        this.#drawOneTube({
            endpoint1: 3,
            endpoint2: 6,
            length: panelTubeExtraLength - 2 * panelStep,
            side: 1
        });
        this.#drawOneTube({
            endpoint1: 4,
            endpoint2: 5,
            length: panelTubeExtraLength - 3 * panelStep,
            side: 1
        });

        const y1 = this.#widthInPixels / 9;
        const y2 = 2 * y1;
        const x2 = -panelTubeExtraLength;
        line(0, y1, x2, y1);
        line(0, y2, x2, y2);
    }

    #drawOneTube({endpoint1, endpoint2, length, side}) {
        const diameter = Math.abs(endpoint2 - endpoint1) * this.#widthInPixels / 9;
        const straightLength = length - diameter / 2;

        const x1 = side ? this.#lengthInPixels : 0;
        const x2 = side ? this.#lengthInPixels + straightLength : -straightLength;
        const y1 = endpoint1 * this.#widthInPixels / 9;
        const y2 = endpoint2 * this.#widthInPixels / 9;
        const centerY = (y1 + y2) / 2;

        line(x1, y1, x2, y1);
        line(x1, y2, x2, y2);

        const angle1 = side ? -90 : 90;
        const angle2 = side ? 90 : 270;
        arc(x2, centerY, diameter, diameter, angle1, angle2);
    }
}