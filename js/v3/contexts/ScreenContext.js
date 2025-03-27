const MINIMUM_ZOOM = 0.01;
const MAXIMUM_ZOOM = 1_000;
const ZOOM_STEP = 1.05;

class ScreenContext {
    canvas;
    
    // dragging
    sumDrag = {x: 0, y: 0};
    startPosition = {x: 0, y: 0};
    draggingInProgress = false;

    // zoom
    zoom = 1;

    // controls
    controlsAreEnabled = true;

    constructor() {}

    setCanvas(canvas) {
        this.canvas = canvas;
    }

    translate() {
        const canvasSize = this.getCanvasSize();
        translate(0.5 * canvasSize.x, 0.5 * canvasSize.y);
        scale(this.zoom);

        const sumDrag = this.sumDrag;
        translate(sumDrag.x, sumDrag.y);

        if (this.draggingInProgress) {
            const currentDragValue = this.getCurrentDragValue();
            translate(
                currentDragValue.x / this.zoom, 
                currentDragValue.y / this.zoom
            );
        }
    }

    startDragging() {
        this.startPosition = this.getMousePosition();
        this.draggingInProgress = true;
    }

    stopDragging() {
        this.updateSumDrag();
        this.draggingInProgress = false;
    }

    zoomIn() {
        this.zoom = Math.min(MAXIMUM_ZOOM, this.zoom * ZOOM_STEP);
    }

    zoomOut() {
        this.zoom = Math.max(MINIMUM_ZOOM, this.zoom / ZOOM_STEP);
    }

    adjustForExport() {
        const blueprintSize = blueprintContext.getSizeData();
        const docSize = getDocumentDimensions();
        const width = docSize.vw - 100;
        const height = window.innerHeight - 60;
        const zoom = Math.min(width / blueprintSize.w, height / blueprintSize.h);
        
        if (blueprintContext.blueprints.length === 1) {
            this.sumDrag = {x: 0, y: 0};
        } else if (blueprintContext.blueprints.length > 1) {
            const firstSize = BlueprintManager.getSizeData(blueprintContext.blueprints[0]);
            this.sumDrag = {x: - blueprintSize.w / 2 + firstSize.w / 2, y: 0};
        }

        this.sumDrag.x += 50 * blueprintContext.blueprints.length;
        this.sumDrag.y += 30;

        this.zoom = zoom;
    }

    getMousePosition() {
        return {x: mouseX, y: mouseY};
    }

    getMousePositionAbsolute() {
        const currentDragValue = this.getCurrentDragValue();
        const sumDrag = this.sumDrag;
        const canvasSize = this.getCanvasSize();

        return {
            x: (mouseX - currentDragValue.x - sumDrag.x * this.zoom - canvasSize.x / 2) / this.zoom, 
            y: (mouseY - currentDragValue.y - sumDrag.y * this.zoom - canvasSize.y / 2) / this.zoom
        };
    }

    enableControls() {
        if (noModalsAreOpened()) {
            this.controlsAreEnabled = true;
        }
    }

    disableControls() {
        this.controlsAreEnabled = false;
    }

    controlsEnabled() {
        return this.controlsAreEnabled;
    }

    
    getCanvasSize() {
        const canvas = this.canvas;
        if (!canvas) {
            return {x: 0, y: 0};
        }

        return {
            x: canvas.width,
            y: canvas.height
        };
    }

    getCurrentDragValue() {
        if (this.draggingInProgress) {
            const startPosition = this.startPosition;
            return {
                x: mouseX - startPosition.x,
                y: mouseY - startPosition.y
            };
        }
        return {x: 0, y: 0};
    }

    updateSumDrag() {
        if (this.draggingInProgress) {
            const currentDragValue = this.getCurrentDragValue();
            this.sumDrag.x += (currentDragValue.x / this.zoom);
            this.sumDrag.y += (currentDragValue.y / this.zoom);
    
        }
    }
}

const screenContext = new ScreenContext();