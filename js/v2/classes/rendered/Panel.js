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
        textAlign(CENTER, CENTER);
        const pointIsInsideText = this.pointIsInsideText();
        if (pointIsInsideText || (this.#isSelected && !this.#isSelectedForDrag)) {
            fill(SELECTED_TEXT_COLOR);
        } else {
            fill(DEFAULT_TEXT_COLOR);
        }

        const p = PANEL_TEXT_POP_FACTOR;
        textSize(this.#textSize * (1 + p * this.#isSelected + p * pointIsInsideText));
        
        const coordinates = this.#getTextCenter(offset);
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
        const step = width / 9;
        for (let tube = step; tube < width; tube += step) {
            line(0, tube, length, tube);
        }

        arc(0, width * 0.5, 2 * PANEL_ELLIPSE_RADIUS * ratio, width * 7/9, 90, 270);
        arc(length, width * 0.5, 2 * PANEL_ELLIPSE_RADIUS * ratio, width * 7/9, -90, 90);
        translate(0, -widthOffset);
        this.#drawType(offset);
    }

}