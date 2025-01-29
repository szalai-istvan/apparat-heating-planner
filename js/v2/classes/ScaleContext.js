class ScaleContext {
    #firstPoint = null;
    #secondPoint = null;
    scalingInProgress = false;
    #referenceLength = null;
    pixelsPerMetersRatio = null;

    constructor() {
        renderer.register(this);
    }

    // public
    startScaling() {
        this.scalingInProgress = true;
        this.clear();
        tooltip.displayCursorTooltip(SCALING_1);
    }

    addReferencePoint() {
        const point = screenContext.getMousePositionAbsolute();
        if (!this.#firstPoint) {
            this.#firstPoint = point;
            tooltip.displayCursorTooltip(SCALING_2);
        } else if (!this.#secondPoint) {
            this.#secondPoint = point;
            tooltip.clearCursorTooltip();
            showScalingDialog();
        }
    }

    processScalingValue(scalingValue) {
        const firstPoint = this.#firstPoint;
        const secondPoint = this.#secondPoint;

        const scalingValueNumber = Number(scalingValue);
        if (scalingValueNumber > 0) {
            this.#referenceLength = scalingValueNumber;
            this.scalingInProgress = false;
            const referencePointDistance = calculateDistance(firstPoint, secondPoint);
            this.pixelsPerMetersRatio = referencePointDistance / this.#referenceLength;
            
            scalingDialog.close();
            tooltip.displayTooltip(ROOM_ADD);
        } else {
            displayErrorMessage('Érvénytelen méretarány. Csak pozitív szám adható meg!');
        }
    }

    draw() {
        const scalingInProgress = this.scalingInProgress;
        if (!scalingInProgress) {
            return;
        }

        const firstPoint = this.#firstPoint;
        const secondPoint = this.#secondPoint;

        if (!firstPoint) {
            return;
        }

        if (secondPoint) {
            line(firstPoint.x, firstPoint.y, secondPoint.x, secondPoint.y);
        } else {
            const mousePosition = screenContext.getMousePositionAbsolute();
            line(firstPoint.x, firstPoint.y, mousePosition.x, mousePosition.y);
        }
        
    }

    ratioIsSet() {
        return Boolean(this.pixelsPerMetersRatio);
    }
    
    clear() {
        this.#firstPoint = null;
        this.#secondPoint = null;
        this.pixelsPerMetersRatio = null;
    }

}

const scaleContext = new ScaleContext();