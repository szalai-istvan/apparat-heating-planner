class ScaleContext {
    #firstPoint = null;
    #secondPoint = null;
    scalingInProgress = false;
    #referenceLength = null;
    #pixelsPerMetersRatio = null;

    constructor() {
        renderer.register(this);
    }

    // public
    startScaling() {
        this.scalingInProgress = true;
        this.#firstPoint = null;
        this.#secondPoint = null;
    }

    addReferencePoint() {
        const point = screenContext.getMousePositionAbsolute();
        if (!this.#firstPoint) {
            this.#firstPoint = point;
        } else if (!this.#secondPoint) {
            this.#secondPoint = point;
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
            this.#pixelsPerMetersRatio = referencePointDistance / this.#referenceLength / screenContext.zoom;
            
            scalingDialog.close();
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
        return Boolean(this.#pixelsPerMetersRatio);
    }
    // private

}

const scaleContext = new ScaleContext();