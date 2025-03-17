import { screenContext } from "../classes/context/ScreenContext";
import { renderer } from "../classes/Renderer";
import { selectionContext } from "../classes/selector/SelectionContext";
import { background, fill, line, noStroke, pop, push, rect, stroke } from "../declarations/declarations";

function draw(): void {
    selectionContext.clearSelectionCache();

    background(255);

    push();
    screenContext.translate();
    renderer.renderTranslatedObjects();
    // TODO rendererben lesz benne drawAxis();
    pop();

    // TODO rendererben lesz benne drawCursorDebugInfo();
    // TODO rendererben lesz benne drawUiBackground();
    selectionContext.checkForSelection();
    renderer.renderAbsolutePositionObjects();
}