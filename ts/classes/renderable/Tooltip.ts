import { DRAWING_NAV, DRAWING_UPLOAD, PANEL_0, PANEL_1, PANEL_HOVER, PANEL_SELECT, ROOM_0, ROOM_1, ROOM_ADD, ROOM_HOVER, ROOM_SELECT, SCALING_0, SCALING_1, SCALING_2, TOOLTIP_TEXT, WELCOME } from "../../appdata/tooltips";
import { CENTER, fill, LEFT, mouseX, mouseY, rect, text, textAlign, textSize, textWidth, TOP } from "../../declarations/declarations";
import { maximumFunction, tooltipPosition } from "../../helpers/helpers";
import { Coordinates, Renderable } from "../../types/types";
import { renderer } from "../Renderer";

export class Tooltip implements Renderable {
    private text: string = '';
    private cursorText: string = '';
    private position: Coordinates;
    private timeoutId: number = 0;

    constructor(position: Coordinates) {
        this.position = position;
        renderer.register(this);
    }

    // public
    public render(): void {
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

    public displayTooltip(key: string): void {
        this.text = TOOLTIP_TEXT[key] || '';
    }

    public displayTooltipIf(presentKey: string, key: string): void {
        if (this.text === TOOLTIP_TEXT[presentKey]) {
            this.displayTooltip(key);
        }
    }

    public displayCursorTooltip(key: string): void {
        this.cursorText = TOOLTIP_TEXT[key];

        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(() => this.clearCursorTooltip(), 15_000);
    }

    public clearTooltip(): void {
        this.text = '';
    }

    public clearCursorTooltip(): void {
        this.cursorText = '';
    }

    public applicationStarted(): void {
        this.displayTooltip(WELCOME);
        setTimeout(() => this.displayTooltipIf(WELCOME, DRAWING_UPLOAD), 4_000);
    }

    public fileIsUploaded(): void {
        this.displayTooltip(SCALING_0);
        this.displayCursorTooltip(DRAWING_NAV);
    }

    public scalingStarted(): void {
        this.displayTooltip(SCALING_0);
        this.displayCursorTooltip(SCALING_1);
    }

    public firstReferencePointAdded(): void {
        this.displayCursorTooltip(SCALING_2);
    }

    public scalingFinished(): void {
        this.displayTooltip(ROOM_ADD);
    }

    public roomAddingStarted(): void {
        this.displayCursorTooltip(ROOM_0);
    }

    public roomAddingFinished(): void {
        this.clearCursorTooltip();
        this.displayTooltip(ROOM_1);
    }

    public roomNameHovered(): void {
        this.displayCursorTooltip(ROOM_HOVER);
    }

    public roomNameUnhovered(): void {
        if (this.cursorText === TOOLTIP_TEXT[ROOM_HOVER]) {
            this.clearCursorTooltip();
        }
    }

    public roomSelected(): void {
        this.displayCursorTooltip(ROOM_SELECT);
    }

    public roomDeselected(): void {
        this.clearCursorTooltip();
    }

    public panelAdded(): void {
        this.displayTooltip(PANEL_0);
        this.displayCursorTooltip(PANEL_1);
    }

    public panelHovered(): void {
        this.displayCursorTooltip(PANEL_HOVER);
    }

    public panelUnhovered(): void {
        if (this.cursorText === TOOLTIP_TEXT[PANEL_HOVER]) {
            this.clearCursorTooltip();
        }
    }

    public panelSelected(): void {
        this.displayCursorTooltip(PANEL_SELECT);
    }

    public panelSelectedForDrag(): void {
        this.displayCursorTooltip(PANEL_1);
    }

    // private
    private numberOfLineBreaks(text: string): number {
        return text.split('\n').length - 1;
    }

    private textWidth(text: string): number {
        return text.split('\n').map(line => textWidth(line)).reduce(maximumFunction);
    }
}

export const tooltip = new Tooltip(tooltipPosition());