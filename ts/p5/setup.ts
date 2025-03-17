import { createButtons } from "../buttons/buttons";
import { screenContext } from "../classes/context/ScreenContext";
import { tooltip } from "../classes/renderable/Tooltip";
import { angleMode, createCanvas, DEGREES } from "../declarations/declarations";
import { disableContextMenu, disableEscapeButton, handleWindowResize, enableEnterForConfirm, getDocumentDimensions } from "../helpers/helpers";
import { DocumentDimensions } from "../types/types";

export let docSize: DocumentDimensions;
export let canvas: any;

export function setup(): void {
    disableContextMenu();
    disableEscapeButton();
    handleWindowResize();
    enableEnterForConfirm();
    
    docSize = getDocumentDimensions();
    canvas = createCanvas(docSize.vw, window.innerHeight);
    canvas.parent("body");
    screenContext.setCanvas(canvas);
    
    angleMode(DEGREES);
    createButtons();
    
    tooltip.applicationStarted();
}