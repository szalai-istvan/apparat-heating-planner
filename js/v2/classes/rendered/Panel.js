class Panel {
    #type;
    #details;
    #lengthInMeters;
    #widthInMeters;
    #position;
    #isSelected;
    #isSelectedForDrag;
    #alignment = 0;
    #numberOfPanelsInGroup = 1;
    #textWidth;
    #textSize;
    #countourLineWeight;
    #lineWeight;

    constructor(type) {
        this.#details = panelTypes[type];
        if (!this.#details) {
            throw new Error(`Unknown panel type: ${type}`);
        }
        
        this.#type = type;
        const ratio = scaleContext.pixelsPerMetersRatio;
        
        this.#countourLineWeight = PANEL_CONTOUR_LINE_THICKNESS * ratio;
        this.#lineWeight = PANEL_LINE_THICKNESS * ratio;
        
        this.#textSize = PANEL_TEXT_SIZE_IN_METERS * ratio;
        textSize(this.#textSize);
        this.#textWidth = textWidth(this.#type);
        this.#position = screenContext.getMousePositionAbsolute();
        this.#lengthInMeters = this.#details.length * ratio;
        this.#widthInMeters = this.#details.width * ratio;
        
        selectionContext.selectObject(this);
        this.selectForDrag();
        renderer.register(this);
    }

    // public
    draw() {
        const ratio = scaleContext.pixelsPerMetersRatio;
        const length = this.#lengthInMeters;
        const width = this.#widthInMeters;
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
    }

    deselect() {
        if (this.#isSelectedForDrag) {
            this.#position = this.#mousePositionToPosition();
        }
        this.#isSelected = false;
        this.#isSelectedForDrag = false;
    }

    pointIsInsideText() {
        const width = this.#textWidth;
        const height = this.#widthInMeters * this.#numberOfPanelsInGroup * PANEL_SELECTION_MULTIPLIER;
        return pointIsInside(
            screenContext.getMousePositionAbsolute(),
            this.#getCenterPositionAbsolute(), 
            this.#alignment ? height : width,
            this.#alignment ? width : height
        );
    }

    remove() {
        renderer.remove(this);
    }

    rotate() {
        this.#alignment = (this.#alignment + 1) % 2;
    }

    addToGroup() {
        this.#numberOfPanelsInGroup += 1;
    }

    removeFromGroup() {
        this.#numberOfPanelsInGroup = Math.max(this.#numberOfPanelsInGroup - 1, 1);
    }

    calculateQuotePanelArray() {
        let i = 0;
        const firstPosition = this.#getFirstCenterPositionAbsolute();

        const quotePanels = [];
        while (i < this.#numberOfPanelsInGroup) {
            const offsetPosition = {
                x: firstPosition.x - i * (this.#alignment ? this.#widthInMeters : 0),
                y: firstPosition.y + i * (this.#alignment ? 0 : this.#widthInMeters)
            };

            const room = roomContext.getRoomContainingPoint(offsetPosition);

            quotePanels.push(new QuotePanel(this.#type, this.#details, room));
            i++;
        }
        return quotePanels;
    }

    // private
    #mousePositionToPosition() {
        const mousePosition = screenContext.getMousePositionAbsolute();
        if (this.#alignment) {
            return {
                x: mousePosition.x + this.#widthInMeters * 0.5 * this.#numberOfPanelsInGroup,
                y: mousePosition.y - this.#lengthInMeters / 2
            };    
        }
        return {
            x: mousePosition.x - this.#lengthInMeters / 2,
            y: mousePosition.y - this.#widthInMeters * 0.5 * this.#numberOfPanelsInGroup
        };
    }

    #drawType(offset) {
        const coordinates = this.#getTextCenter(offset);
        stroke('black');
        fill(PANEL_FILL_COLOR);
        const rectWidth = this.#textWidth * PANEL_TEXT_RECT_SIZE_MUL;
        const rectHeight = this.#widthInMeters * 0.5 * PANEL_TEXT_RECT_SIZE_MUL;
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

    #getFirstCenterPositionAbsolute() {
        const position = this.#position;
        if (this.#alignment) {
            return {
                x: position.x - this.#widthInMeters * 0.5,
                y: position.y + this.#lengthInMeters * 0.5
            };
        }
        return {
            x: position.x + this.#lengthInMeters * 0.5,
            y: position.y + this.#widthInMeters * 0.5
        };
    }

    #getCenterPositionAbsolute() {
        const position = this.#position;
        if (this.#alignment) {
            return {
                x: position.x - this.#widthInMeters * 0.5 * this.#numberOfPanelsInGroup,
                y: position.y + this.#lengthInMeters * 0.5
            };
        }
        return {
            x: position.x + this.#lengthInMeters * 0.5,
            y: position.y + this.#widthInMeters * 0.5 * this.#numberOfPanelsInGroup
        };
    }

    #getTextCenter(offset) {
        return {
            x: this.#lengthInMeters * 0.5,
            y: this.#widthInMeters * (0.5 + offset)
        };
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

        fill(PANEL_FILL_COLOR);
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

        const y1 = this.#widthInMeters / 9;
        const y2 = 2 * y1;
        const x2 = -panelTubeExtraLength;
        line(0, y1, x2, y1);
        line(0, y2, x2, y2);
    }

    #drawOneTube({endpoint1, endpoint2, length, side}) {
        const diameter = Math.abs(endpoint2 - endpoint1) * this.#widthInMeters / 9;
        const straightLength = length - diameter / 2;

        const x1 = side ? this.#lengthInMeters : 0;
        const x2 = side ? this.#lengthInMeters + straightLength : -straightLength;
        const y1 = endpoint1 * this.#widthInMeters / 9;
        const y2 = endpoint2 * this.#widthInMeters / 9;
        const centerY = (y1 + y2) / 2;

        line(x1, y1, x2, y1);
        line(x1, y2, x2, y2);

        const angle1 = side ? -90 : 90;
        const angle2 = side ? 90 : 270;
        arc(x2, centerY, diameter, diameter, angle1, angle2);
    }
}