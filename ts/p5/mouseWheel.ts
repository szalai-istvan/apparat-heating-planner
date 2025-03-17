import { screenContext } from "../classes/context/ScreenContext";

export function mouseWheel(event: {delta: number}): void {
    if (!screenContext.getControlsAreEnabled()) {
        return;
    }
    
    if (event.delta > 0) {
        screenContext.zoomOut();
    } else {
        screenContext.zoomIn();
    }
}