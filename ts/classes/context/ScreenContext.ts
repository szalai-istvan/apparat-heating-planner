import { mouseX, mouseY, scale, translate } from "../../declarations/declarations";
import { getDocumentDimensions, noModalsAreOpened } from "../../helpers/helpers";
import { Coordinates } from "../../types/types";
import { blueprint } from "../renderable/Blueprint";

const MINIMUM_ZOOM = 0.01;
const MAXIMUM_ZOOM = 1_000;
const ZOOM_STEP = 1.05;

export class ScreenContext {
    private canvas: any;
    
    // dragging
    private sumDrag: Coordinates = {x: 0, y: 0};
    private startPosition: Coordinates = {x: 0, y: 0};
    private draggingInProgress: boolean = false;

    // zoom
    public zoom: number = 1;

    // controls
    private controlsAreEnabled: boolean = true;
    
    constructor() {}

    public setCanvas(canvas: any): void {
        this.canvas = canvas;
    }

    public translate(): void {
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

    public startDragging(): void {
        this.startPosition = this.getMousePosition();
        this.draggingInProgress = true;
    }

    public stopDragging(): void {
        this.updateSumDrag();
        this.draggingInProgress = false;
    }

    public zoomIn(): void {
        this.zoom = Math.min(MAXIMUM_ZOOM, this.zoom * ZOOM_STEP);
    }

    public zoomOut(): void {
        this.zoom = Math.max(MINIMUM_ZOOM, this.zoom / ZOOM_STEP);
    }

    public adjustForExport(): void {
        const blueprintSize = blueprint.getSizeData();
        const docSize = getDocumentDimensions();
        const width = docSize.vw;
        const height = window.innerHeight;
        const zoom = Math.min(width / blueprintSize.w, height / blueprintSize.h);
        
        this.sumDrag = {x: 0, y: 0};
        this.zoom = zoom;
    }

    public getMousePosition(): Coordinates {
        return {x: mouseX, y: mouseY};
    }

    public getMousePositionAbsolute(): Coordinates {
        const currentDragValue = this.getCurrentDragValue();
        const sumDrag = this.sumDrag;
        const canvasSize = this.getCanvasSize();

        return {
            x: (mouseX - currentDragValue.x - sumDrag.x * this.zoom - canvasSize.x / 2) / this.zoom, 
            y: (mouseY - currentDragValue.y - sumDrag.y * this.zoom - canvasSize.y / 2) / this.zoom
        };
    }

    public enableControls(): void {
        if (noModalsAreOpened()) {
            this.controlsAreEnabled = true;
        }
    }

    public disableControls(): void {
        this.controlsAreEnabled = false;
    }

    public getControlsAreEnabled(): boolean {
        return this.controlsAreEnabled;
    }

    // private
    private getCanvasSize(): Coordinates {
        const canvas = this.canvas;
        if (!canvas) {
            return {x: 0, y: 0};
        }

        return {
            x: canvas.width,
            y: canvas.height
        };
    }

    private getCurrentDragValue(): Coordinates {
        if (this.draggingInProgress) {
            const startPosition = this.startPosition;
            return {
                x: mouseX - startPosition.x,
                y: mouseY - startPosition.y
            };
        }
        return {x: 0, y: 0};
    }

    private updateSumDrag() {
        if (this.draggingInProgress) {
            const currentDragValue = this.getCurrentDragValue();
            this.sumDrag.x += (currentDragValue.x / this.zoom);
            this.sumDrag.y += (currentDragValue.y / this.zoom);
    
        }
    }
}

export const screenContext = new ScreenContext();