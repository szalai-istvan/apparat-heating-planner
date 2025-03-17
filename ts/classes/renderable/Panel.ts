import { Constants } from "../../appdata/constants";
import { PANEL_TYPES } from "../../appdata/panelTypes";
import { arc, CENTER, fill, line, noFill, pop, push, rect, rotate, stroke, strokeWeight, text, textAlign, textSize, textWidth, translate } from "../../declarations/declarations";
import { displayErrorMessage } from "../../helpers/errordialog";
import { isNullOrUndefined, pointIsInside } from "../../helpers/helpers";
import { BoundaryPoints, Coordinates, Dimensions, PanelDrawOffsetParams, PanelType, Renderable, Selectable } from "../../types/types";
import { screenContext } from "../context/ScreenContext";
import { renderer } from "../Renderer";
import { roomSelector } from "../selector/RoomSelector";
import { Room } from "./Room";
import { scaleContext } from "./ScaleContext";

export class Panel implements Renderable, Selectable {
    private type: string = '';
    private details: PanelType;
    private lengthInPixels: number;
    private widthInPixels: number;
    private position: Coordinates; // top left corner coordinates
    private isSelected: boolean;
    private isSelectedForDrag: boolean;
    private alignment: number = 0;
    private numberOfPanelsInGroup: number = 1;
    private textWidth: number;
    private textSize: number;
    private countourLineWeight: number;
    private lineWeight: number;
    private room: Room | null;

    constructor(type: string) {
        const ratio = scaleContext.pixelsPerMetersRatio || 0;
        this.countourLineWeight = Constants.PANEL_CONTOUR_LINE_THICKNESS * ratio;
        this.lineWeight = Constants.PANEL_LINE_THICKNESS * ratio;

        this.setType(type);
        this.selectForDrag();
        renderer.register(this);
    }

    // public
    public render(): void {
        const ratio = scaleContext.pixelsPerMetersRatio || 0;
        const length = this.lengthInPixels;
        const width = this.widthInPixels;
        const coordinates = this.isSelectedForDrag ? this.mousePositionToPosition() : this.position;

        push();
        translate(coordinates.x, coordinates.y);
        rotate(this.alignment * 90);

        for (let offset = 0; offset < this.numberOfPanelsInGroup; offset++) {
            this.drawWithOffset({ ratio, length, width, offset });
        }

        translate(-coordinates.x, -coordinates.y);
        pop();
    }

    public select(): void {
        this.isSelected = true;
    }

    public tryToDeselect(): boolean {
        if (this.isSelectedForDrag) {
            this.position = this.mousePositionToPosition();
        }

        const destinationRoom: Room | null = roomSelector.registerRelocatedPanelGroup(this);
        if (destinationRoom === null) {
            // TODO displayErrorMessage inkább itt
            return false;
        }

        this.room = destinationRoom;

        this.isSelected = false;
        this.isSelectedForDrag = false;

        return true;
    }

    public selectForDrag(): void {
        this.isSelectedForDrag = true;
        if (this.room !== null) {
            this.room.removePanelFromRoom(this);
            this.room.removePanelFromRoom(this);
        }
        this.room = null;
    }

    public cursorIsInsideText(): boolean {
        const width = this.textWidth;
        const height = this.widthInPixels * this.numberOfPanelsInGroup * Constants.PANEL_SELECTION_MULTIPLIER;
        return pointIsInside(
            screenContext.getMousePositionAbsolute(),
            this.getGroupCenterPositionAbsolute(),
            this.alignment ? height : width,
            this.alignment ? width : height
        );
    }

    public remove(): void {
        renderer.remove(this);
        if (this.room !== null) {
            this.room.removePanelFromRoom(this);
        }

        this.room = null;
    }

    public rotate(): void {
        const newAlignment = (this.alignment + 1) % 2;
        const boundaryPoints = this.getBoundaryPoints(this.numberOfPanelsInGroup, newAlignment);
        if (this.validateBoundaryPoints(boundaryPoints)) {
            if (isNullOrUndefined(this.room) || (this.room && this.room.TryToRegisterRotation(this))) {
                this.position = this.getTopLeftCornerCoordinates(newAlignment);
                this.alignment = newAlignment;
                if (this.room) {
                    this.room.recalculateBeams();
                }
            }
        } else {
            displayErrorMessage('A forgatás hatására a panelcsoport egy része szobán kívülre kerülne!<br/>Helyezze át, mielőtt elforgatja!');
        }
    }

    public addToGroup(): void {
        const newGroupNumber = (this.numberOfPanelsInGroup + 1);
        const boundaryPoints = this.getBoundaryPoints(newGroupNumber, this.alignment);

        if (this.validateBoundaryPoints(boundaryPoints)) {
            this.numberOfPanelsInGroup = newGroupNumber;
            if (this.room) {
                this.room.recalculateBeams();
            }
        } else {
            displayErrorMessage('Újabb panel hozzáadásának hatására a panelcsoport egy része szobán kívülre kerülne!<br/>Helyezze át, mielőtt hozzáad a csoporthoz!');
        }
    }

    public removeFromGroup(): void {
        this.numberOfPanelsInGroup = Math.max(this.numberOfPanelsInGroup - 1, 1);
        if (this.room) {
            this.room.recalculateBeams();
        }
    }

    public calculateQuotePanelArray(): QuotePanel[] {
        let i = 0;
        const firstPosition = this.getFirstCenterPositionAbsolute();

        const quotePanels: QuotePanel[] = [];
        while (i < this.numberOfPanelsInGroup) {
            const offsetPosition = {
                x: firstPosition.x - i * (this.alignment ? this.widthInPixels : 0),
                y: firstPosition.y + i * (this.alignment ? 0 : this.widthInPixels)
            };

            const room = roomSelector.getRoomContainingPoint(offsetPosition);

            quotePanels.push(new QuotePanel(this.type, this.details, room));
            i++;
        }
        return quotePanels;
    }

    public getFirstCenterPositionAbsolute(): Coordinates {
        const position = this.position;
        if (this.alignment === 1) {
            return {
                x: position.x - this.widthInPixels * 0.5,
                y: position.y + this.lengthInPixels * 0.5
            };
        }
        return {
            x: position.x + this.lengthInPixels * 0.5,
            y: position.y + this.widthInPixels * 0.5
        };
    }

    public getBoundaryPoints(numberOfPanels?: number, alignment?: number): BoundaryPoints {
        numberOfPanels = numberOfPanels ?? this.numberOfPanelsInGroup;
        alignment = alignment ?? this.alignment;

        const coordinates = this.isSelectedForDrag ? this.mousePositionToPosition() : this.getTopLeftCornerCoordinates(alignment);
        const extraLength = Constants.PANEL_TUBE_EXTRA_LENGTH_PER_SIDE * (scaleContext.pixelsPerMetersRatio || 0);

        let p1;
        let p2;
        if (alignment === 0) {
            p1 = {
                x: coordinates.x - extraLength,
                y: coordinates.y
            };
            p2 = {
                x: coordinates.x + this.lengthInPixels + extraLength,
                y: coordinates.y + this.widthInPixels * numberOfPanels
            };
        } else {
            p1 = {
                x: coordinates.x,
                y: coordinates.y - extraLength
            };
            p2 = {
                x: coordinates.x - this.widthInPixels * numberOfPanels,
                y: coordinates.y + this.lengthInPixels + extraLength
            };
        }

        return { p1, p2 };
    }

    public getAlignment(): number {
        return this.alignment;
    }

    public setType(type: string): void {
        const ratio = scaleContext.pixelsPerMetersRatio || 0;

        this.details = PANEL_TYPES[type];
        if (isNullOrUndefined(this.details)) {
            throw new Error(`Unknown panel type: ${type}`);
        }

        this.textSize = Constants.PANEL_TEXT_SIZE_IN_METERS * ratio;
        if (type === 'F100') {
            this.textSize /= 2;
        }

        this.type = type;
        textSize(this.textSize);
        this.textWidth = textWidth(this.type);
        this.position = screenContext.getMousePositionAbsolute();
        this.lengthInPixels = this.details.length * ratio;
        this.widthInPixels = this.details.width * ratio;
    }

    public selectedForDrag(): boolean {
        return this.isSelectedForDrag;
    }

    public getNumberOfPanelsInGroup(): number {
        return this.numberOfPanelsInGroup;
    }

    public getSizeInPixels(): Dimensions {
        return { length: this.lengthInPixels, width: this.widthInPixels };
    }

    
    public getTopLeftCornerCoordinates(alignment?: number): Coordinates {
        alignment = alignment ?? this.alignment;

        if (alignment === this.alignment) {
            return this.position;
        }

        const offsetX = (this.lengthInPixels + this.widthInPixels * this.numberOfPanelsInGroup) / 2;
        const offsetY = (this.widthInPixels * this.numberOfPanelsInGroup - this.lengthInPixels) / 2;
        const alignmentMultiplier = -1 * ((-1) ** alignment);

        return {
            x: this.position.x + alignmentMultiplier * offsetX,
            y: this.position.y + alignmentMultiplier * offsetY
        };
    }

    // private
    private validateBoundaryPoints(boundaryPoints: BoundaryPoints): boolean {
        if (this.room || this.isSelectedForDrag) {
            return true;
        }

        if (this.room !== null) {
            const room = this.room as Room;
            return room.pointIsInsideRoom(boundaryPoints.p1) && room.pointIsInsideRoom(boundaryPoints.p2);
        }
        return false;
    }

    private mousePositionToPosition(): Coordinates {
        const mousePosition = screenContext.getMousePositionAbsolute();
        if (this.alignment === 1) {
            return {
                x: mousePosition.x + this.widthInPixels * 0.5 * this.numberOfPanelsInGroup,
                y: mousePosition.y - this.lengthInPixels / 2
            };
        }
        return {
            x: mousePosition.x - this.lengthInPixels / 2,
            y: mousePosition.y - this.widthInPixels * 0.5 * this.numberOfPanelsInGroup
        };
    }

    private getGroupCenterPositionAbsolute(): Coordinates {
        const position = this.position;
        if (this.alignment === 1) {
            return {
                x: position.x - this.widthInPixels * 0.5 * this.numberOfPanelsInGroup,
                y: position.y + this.lengthInPixels * 0.5
            };
        }
        return {
            x: position.x + this.lengthInPixels * 0.5,
            y: position.y + this.widthInPixels * 0.5 * this.numberOfPanelsInGroup
        };
    }

    private getTextCenter(offset: number): Coordinates {
        return {
            x: this.lengthInPixels * 0.5,
            y: this.widthInPixels * (0.5 + offset)
        };
    }

    private drawType(offset: number): void {
        const coordinates = this.getTextCenter(offset);
        stroke('black');
        fill(Constants.PANEL_FILL_COLOR);
        const rectWidth = this.textWidth * Constants.PANEL_TEXT_RECT_SIZE_MUL;
        const rectHeight = this.widthInPixels * 0.5 * Constants.PANEL_TEXT_RECT_SIZE_MUL;
        rect(
            coordinates.x - rectWidth / 2,
            coordinates.y - rectHeight / 2,
            rectWidth,
            rectHeight
        );

        textAlign(CENTER, CENTER);
        const cursorIsInsideText = this.cursorIsInsideText();
        if (cursorIsInsideText || (this.isSelected && !this.isSelectedForDrag)) {
            fill(Constants.SELECTED_TEXT_COLOR);
        } else {
            fill(Constants.DEFAULT_TEXT_COLOR);
        }

        const p = Constants.PANEL_TEXT_POP_FACTOR;
        textSize(this.textSize * (1 + p * Number(this.isSelected) + p * Number(cursorIsInsideText)));
        text(this.type, coordinates.x, coordinates.y);
    }

    private drawWithOffset(params: PanelDrawOffsetParams) {
        const widthOffset = params.width * params.offset;

        strokeWeight(this.countourLineWeight);
        stroke('black');
        fill(Constants.PANEL_FILL_COLOR);
        translate(0, widthOffset);
        rect(0, 0, params.length, params.width);

        strokeWeight(this.lineWeight);

        const i = params.width / 9;
        for (let pipeNumber = i; pipeNumber < params.width; pipeNumber += i) {
            line(0, pipeNumber, length, pipeNumber);
        }

        this.drawTubes(params);
        translate(0, -widthOffset);
        this.drawType(params.offset);
    }

    private drawTubes(params: PanelDrawOffsetParams) {
        const pixelsPerMetersRatio = scaleContext.pixelsPerMetersRatio || 0;
        const panelTubeExtraLength = Constants.PANEL_TUBE_EXTRA_LENGTH_PER_SIDE * pixelsPerMetersRatio;
        const panelStep = Constants.PANEL_TUBE_EXTRA_LENGTH_STEP * pixelsPerMetersRatio;

        noFill();
        strokeWeight(this.lineWeight);

        this.drawOneTube({
            endpoint1: 3,
            endpoint2: 8,
            length: panelTubeExtraLength,
            side: 0
        });
        this.drawOneTube({
            endpoint1: 4,
            endpoint2: 7,
            length: panelTubeExtraLength - panelStep,
            side: 0
        });
        this.drawOneTube({
            endpoint1: 5,
            endpoint2: 6,
            length: panelTubeExtraLength - 2 * panelStep,
            side: 0
        });

        this.drawOneTube({
            endpoint1: 1,
            endpoint2: 8,
            length: panelTubeExtraLength,
            side: 1
        });
        this.drawOneTube({
            endpoint1: 2,
            endpoint2: 7,
            length: panelTubeExtraLength - panelStep,
            side: 1
        });
        this.drawOneTube({
            endpoint1: 3,
            endpoint2: 6,
            length: panelTubeExtraLength - 2 * panelStep,
            side: 1
        });
        this.drawOneTube({
            endpoint1: 4,
            endpoint2: 5,
            length: panelTubeExtraLength - 3 * panelStep,
            side: 1
        });

        const y1 = this.widthInPixels / 9;
        const y2 = 2 * y1;
        const x2 = -panelTubeExtraLength;
        line(0, y1, x2, y1);
        line(0, y2, x2, y2);
    }

    private drawOneTube(params: { endpoint1: number, endpoint2: number, length: number, side: number }) {
        const endpoint1 = params.endpoint1;
        const endpoint2 = params.endpoint2;
        const length = params.length;
        const side = params.side;

        const diameter = Math.abs(endpoint2 - endpoint1) * this.widthInPixels / 9;
        const straightLength = length - diameter / 2;

        const x1 = side ? this.lengthInPixels : 0;
        const x2 = side ? this.lengthInPixels + straightLength : -straightLength;
        const y1 = endpoint1 * this.widthInPixels / 9;
        const y2 = endpoint2 * this.widthInPixels / 9;
        const centerY = (y1 + y2) / 2;

        line(x1, y1, x2, y1);
        line(x1, y2, x2, y2);

        const angle1 = side ? -90 : 90;
        const angle2 = side ? 90 : 270;
        arc(x2, centerY, diameter, diameter, angle1, angle2);
    }
}