var ellipseRadius = 0.24;

class Panel {
    #type;
    #details;
    #lengthInMeters;
    #widthInMeters;
    #position;
    #isSelected;
    #alignment = 0;

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
        renderer.register(this);
    }

    // public
    draw() {
        const ratio = scaleContext.pixelsPerMetersRatio;
        const length = this.#lengthInMeters;
        const width = this.#widthInMeters;
        const coordinates = this.#isSelected ? this.#mousePositionToPosition() : this.#position;

        push();
        strokeWeight(3);
        rect(
            coordinates.x,
            coordinates.y, 
            length,
            width);

        strokeWeight(0.5);

        const step = width / 9;
        for (let tube = step; tube < width; tube += step) {
            line(coordinates.x, coordinates.y + tube, coordinates.x + length, coordinates.y + tube);
        }

        arc(
            coordinates.x, 
            coordinates.y + width * 0.5, 
            2 * ellipseRadius * ratio, 
            width * 7/9, 
            90, 
            270
        );
    
        arc(
            coordinates.x + length, 
            coordinates.y + width * 0.5, 
            2 * ellipseRadius * ratio, 
            width * 7/9, 
            -90, 
            90
        );
        this.#drawType();
        pop();
    }

    select() {
        this.#isSelected = true;
    }

    deselect() {
        this.#isSelected = false;
        this.#position = this.#mousePositionToPosition();
    }

    pointIsInsideText() {
        const point = screenContext.getMousePositionAbsolute();
        const x = point.x;
        const y = point.y;
        const middlePoint = this.#getCenterPosition();

        const width = textWidth(this.#type);
        const minX = middlePoint.x - width / 2;
        const maxX = middlePoint.x + width / 2;

        const minY = middlePoint.y - 12;
        const maxY = middlePoint.y + 12;

        return x > minX && x < maxX && y > minY && y < maxY;
    }

    // private
    #mousePositionToPosition() {
        const mousePosition = screenContext.getMousePositionAbsolute();
        return {
            x: mousePosition.x - this.#lengthInMeters / 2,
            y: mousePosition.y - this.#widthInMeters / 2
        };
    }

    #drawType() {
        textAlign(CENTER, CENTER);
        if (this.pointIsInsideText()) {
            fill('red');
            textSize(28);
        } else {
            textSize(24);
        }
        const coordinates = this.#isSelected ? screenContext.getMousePositionAbsolute() : this.#getCenterPosition();
        text(this.#type, coordinates.x, coordinates.y);
    }

    #getCenterPosition() {
        const position = this.#position;
        return {
            x: position.x + this.#lengthInMeters / 2,
            y: position.y + this.#widthInMeters / 2
        };
    }
}