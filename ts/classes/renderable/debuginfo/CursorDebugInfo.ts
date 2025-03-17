import { textAlign, LEFT, TOP, text, mouseX, mouseY, frameRate } from "../../../declarations/declarations";
import { roundNumber } from "../../../helpers/helpers";
import { Renderable } from "../../../types/types";
import { screenContext } from "../../context/ScreenContext";

export class CursorDebugInfo implements Renderable { // TODO renderer menedzselje
    constructor() {}

    public render(): void {
        const mouse = screenContext.getMousePositionAbsolute();
        textAlign(LEFT, TOP);
        text(`x: ${roundNumber(mouse.x, 1)}\ny: ${roundNumber(mouse.y, 1)}\nzoom: ${roundNumber(screenContext.zoom, 1)}\nfps: ${roundNumber(frameRate(), 1)}`, mouseX + 20, mouseY + 20);
    }
}