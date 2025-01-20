var ellipseRadius = 0.24;

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

    constructor(type) {
        this.#details = panelTypes[type];
        if (!this.#details) {
            throw new Error(`Unknown panel type: ${type}`);
        }
        
        this.#type = type;
        this.#position = screenContext.getMousePositionAbsolute();
        const ratio = scaleContext.pixelsPerMetersRatio;
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
        this.#drawType();
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
        const point = screenContext.getMousePositionAbsolute();
        const x = point.x;
        const y = point.y;
        const middlePoint = this.#getCenterPositionAbsolute();

        const width = textWidth(this.#type);
        let minX, maxX, minY, maxY;
        if (this.#alignment) {
            minX = middlePoint.x - 12;
            maxX = middlePoint.x + 12;

            minY = middlePoint.y - width / 2;
            maxY = middlePoint.y + width / 2;
        } else {
            minX = middlePoint.x - width / 2;
            maxX = middlePoint.x + width / 2;

            minY = middlePoint.y - 12;
            maxY = middlePoint.y + 12;
        } 

        return x > minX && x < maxX && y > minY && y < maxY;
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

    #drawType() {
        textAlign(CENTER, CENTER);
        const pointIsInsideText = this.pointIsInsideText();
        if (pointIsInsideText || (this.#isSelected && !this.#isSelectedForDrag)) {
            fill('red');
        }

        textSize(24 + this.#isSelected * 4 + pointIsInsideText * 4);
        
        const coordinates = this.#getTextCenter();
        text(this.#type, coordinates.x, coordinates.y);
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

    #getCenterPosition() {
        const position = this.#position;
        return {
            x: position.x + this.#lengthInMeters * 0.5,
            y: position.y + this.#widthInMeters * 0.5 * this.#numberOfPanelsInGroup
        };
    }

    #getTextCenter() {
        const coordinates = this.#isSelectedForDrag ? this.#mousePositionToPosition() : this.#position;
        return {
            x: coordinates.x + this.#lengthInMeters * 0.5,
            y: coordinates.y + this.#widthInMeters * 0.5 * this.#numberOfPanelsInGroup
        };
    }

    #drawWithOffset({ratio, length, width, offset}) {
        const widthOffset = width * offset;

        strokeWeight(3);
        translate(0, widthOffset);
        rect(0, 0, length, width);

        strokeWeight(0.5);
        const step = width / 9;
        for (let tube = step; tube < width; tube += step) {
            line(0, tube, length, tube);
        }

        arc(0, width * 0.5, 2 * ellipseRadius * ratio, width * 7/9, 90, 270);
        arc(length, width * 0.5, 2 * ellipseRadius * ratio, width * 7/9, -90, 90);

        translate(0, -widthOffset);
    }

}