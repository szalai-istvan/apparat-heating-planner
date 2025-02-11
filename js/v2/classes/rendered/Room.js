class Room {
    #name;
    #points = [];
    #isSelected = false;
    #middlePoint;
    #textSize;
    #lineWeight;

    constructor(name) {
        this.#name = name || '';
        renderer.register(this);

        const ratio = scaleContext.pixelsPerMetersRatio;
        this.#textSize = ROOM_TEXT_SIZE_IN_METERS * ratio;
        this.#lineWeight = ROOM_LINE_WEIGHT_IN_METERS * ratio;
    }

    // public
    addPoint() {
        const points = this.#points;
        const mousePosition = screenContext.getMousePositionAbsolute();
        
        if (points.length >= 2) {
            return;
        } else {
            points.push(mousePosition);
            if (points.length >= 2) {
                this.#middlePoint = this.#getMiddlePoint();
                selectionContext.deselect();
                tooltip.roomAddingFinished();
            }
        }
    }

    draw() {
        const points = this.#getPointsToDraw();
        const length = points.length;

        if (length < 2) {
            return;
        }

        this.#updateDrawingSettings();

        for (let index = 0; index < length; index++) {
            const p1 = points[index];
            const p2 = points[(index + 1) % length];

            line(p1.x, p1.y, p2.x, p2.y);
        }

        pop();
        const middlePoint = this.#middlePoint;
        if (middlePoint) {
            this.#updateTextSettings();
            text(this.#name, middlePoint.x, middlePoint.y);
            pop();
        }
    }

    getName() {
        return this.#name;
    }

    select() {
        this.#isSelected = true;
    }

    deselect() {
        this.#isSelected = false;
    }

    remove() {
        renderer.remove(this);
    }

    pointIsInsideRoom(point = undefined) {
        point = point || screenContext.getMousePositionAbsolute();
        const x = point.x;
        const y = point.y;
        
        if (this.#points.length === 0) {
            return false;
        }

        const minX = this.#points.map(p => p.x).reduce(minimumFunction);
        const maxX = this.#points.map(p => p.x).reduce(maximumFunction);

        const minY = this.#points.map(p => p.y).reduce(minimumFunction);
        const maxY = this.#points.map(p => p.y).reduce(maximumFunction);

        return x > minX && x < maxX && y > minY && y < maxY;
    }

    pointIsInsideText() {
        if (this.#points.length < 2) {
            return false;
        }

        return pointIsInside(
            screenContext.getMousePositionAbsolute(),
            this.#middlePoint, 
            textWidth(this.#name),
            this.#textSize
        );
    }

    roomIsConfigured() {
        return this.#points.length === 2;
    }

    getSizeInMeters() {
        const width = Math.abs(this.#points[0].x - this.#points[1].x);
        const height = Math.abs(this.#points[0].y - this.#points[1].y);
        return {
            x: width * scaleContext.pixelsPerMetersRatio,
            height: height * scaleContext.pixelsPerMetersRatio
        };
    }

    getPoints() {
        return this.#points.map(p => ({x: p.x, y: p.y}));
    }

    // private
    #getMiddlePoint() {
        const points = this.#getPointsToDraw();
        const length = points.length;
        if (length === 0) {
            return;
        }

        const x = points.map(p => p.x).reduce((a, b) => a + b) / length;
        const y = points.map(p => p.y).reduce((a, b) => a + b) / length;

        return {x, y};
    }

    #updateDrawingSettings() {
        push();
        if (this.#isSelected) {
            stroke(SELECTED_TEXT_COLOR);
        } else {
            stroke(DEFAULT_TEXT_COLOR);
        }
        strokeWeight(this.#lineWeight);
    }

    #updateTextSettings() {
        push();
        textAlign(CENTER, CENTER);
        if (this.pointIsInsideText()) {
            fill(SELECTED_TEXT_COLOR);
            textSize(this.#textSize * ROOM_TEXT_POP_FACTOR);
        } else {
            textSize(this.#textSize);
        }
    }

    #getPointsToDraw() {
        const points = this.#points;
        
        const p0 = points[0];
        if (!p0) {
            return [];
        }

        const p1 = points.length >= 2 ? points[1] : screenContext.getMousePositionAbsolute();

        const pointsToDraw = [];
        pointsToDraw.push({x: p0.x, y: p0.y});
        pointsToDraw.push({x: p0.x, y: p1.y});
        pointsToDraw.push({x: p1.x, y: p1.y});
        pointsToDraw.push({x: p1.x, y: p0.y});

        return pointsToDraw;
    }

    #getWidth() {
        return Math.abs(this.#points[0].x - this.#points[1].x);
    }

    #getHeight() {
        return Math.abs(this.#points[0].y - this.#points[1].y);
    }
}