import { DRAWING_NAV, DRAWING_UPLOAD, PANEL_0, PANEL_1, PANEL_HOVER, PANEL_SELECT, ROOM_0, ROOM_1, ROOM_ADD, ROOM_HOVER, ROOM_SELECT, SCALING_0, SCALING_1, SCALING_2, TOOLTIP_TEXT, WELCOME } from "../../appdata/tooltips";
import { CENTER, fill, LEFT, mouseX, mouseY, rect, text, textAlign, textSize, textWidth, TOP } from "../../declarations/declarations";
import { maximumFunction, tooltipPosition } from "../../helpers/helpers";
import { renderer } from "../Renderer";
export class Tooltip {
    constructor(position) {
        this.text = '';
        this.cursorText = '';
        this.timeoutId = 0;
        this.position = position;
        renderer.register(this);
    }
    render() {
        if (this.text.length > 0) {
            const position = this.position;
            fill('black');
            textAlign(LEFT, CENTER);
            textSize(18);
            text(this.text, position.x, position.y);
        }
        if (this.cursorText.length > 0) {
            textAlign(LEFT, TOP);
            textSize(16);
            fill('white');
            const width = this.textWidth(this.cursorText);
            rect(mouseX + 18, mouseY + 18, width + 4, 20 * (1 + this.numberOfLineBreaks(this.cursorText)));
            fill('black');
            text(this.cursorText, mouseX + 20, mouseY + 20);
        }
    }
    displayTooltip(key) {
        this.text = TOOLTIP_TEXT[key] || '';
    }
    displayTooltipIf(presentKey, key) {
        if (this.text === TOOLTIP_TEXT[presentKey]) {
            this.displayTooltip(key);
        }
    }
    displayCursorTooltip(key) {
        this.cursorText = TOOLTIP_TEXT[key];
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(() => this.clearCursorTooltip(), 15000);
    }
    clearTooltip() {
        this.text = '';
    }
    clearCursorTooltip() {
        this.cursorText = '';
    }
    applicationStarted() {
        this.displayTooltip(WELCOME);
        setTimeout(() => this.displayTooltipIf(WELCOME, DRAWING_UPLOAD), 4000);
    }
    fileIsUploaded() {
        this.displayTooltip(SCALING_0);
        this.displayCursorTooltip(DRAWING_NAV);
    }
    scalingStarted() {
        this.displayTooltip(SCALING_0);
        this.displayCursorTooltip(SCALING_1);
    }
    firstReferencePointAdded() {
        this.displayCursorTooltip(SCALING_2);
    }
    scalingFinished() {
        this.displayTooltip(ROOM_ADD);
    }
    roomAddingStarted() {
        this.displayCursorTooltip(ROOM_0);
    }
    roomAddingFinished() {
        this.clearCursorTooltip();
        this.displayTooltip(ROOM_1);
    }
    roomNameHovered() {
        this.displayCursorTooltip(ROOM_HOVER);
    }
    roomNameUnhovered() {
        if (this.cursorText === TOOLTIP_TEXT[ROOM_HOVER]) {
            this.clearCursorTooltip();
        }
    }
    roomSelected() {
        this.displayCursorTooltip(ROOM_SELECT);
    }
    roomDeselected() {
        this.clearCursorTooltip();
    }
    panelAdded() {
        this.displayTooltip(PANEL_0);
        this.displayCursorTooltip(PANEL_1);
    }
    panelHovered() {
        this.displayCursorTooltip(PANEL_HOVER);
    }
    panelUnhovered() {
        if (this.cursorText === TOOLTIP_TEXT[PANEL_HOVER]) {
            this.clearCursorTooltip();
        }
    }
    panelSelected() {
        this.displayCursorTooltip(PANEL_SELECT);
    }
    panelSelectedForDrag() {
        this.displayCursorTooltip(PANEL_1);
    }
    numberOfLineBreaks(text) {
        return text.split('\n').length - 1;
    }
    textWidth(text) {
        return text.split('\n').map(line => textWidth(line)).reduce(maximumFunction);
    }
}
export const tooltip = new Tooltip(tooltipPosition());
