declare const MINIMUM_ZOOM: 0.01;
declare const MAXIMUM_ZOOM: 1000;
declare const ZOOM_STEP: 1.05;
declare class ScreenContext {
    zoom: number;
    setCanvas(canvas: any): void;
    translate(): void;
    startDragging(): void;
    stopDragging(): void;
    zoomIn(): void;
    zoomOut(): void;
    adjustForExport(): void;
    getMousePosition(): {
        x: any;
        y: any;
    };
    getMousePositionAbsolute(): {
        x: number;
        y: number;
    };
    enableControls(): void;
    disableControls(): void;
    controlsAreEnabled(): boolean;
    #private;
}
declare const screenContext: ScreenContext;
