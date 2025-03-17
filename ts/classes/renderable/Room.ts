import { Constants } from "../../appdata/constants";
import { CENTER, fill, line, pop, push, RIGHT, stroke, strokeWeight, text, textAlign, textSize, textWidth, TOP } from "../../declarations/declarations";
import { maximumFunction, minimumFunction, pointIsInside, roundNumber } from "../../helpers/helpers";
import { Coordinates, Renderable, Selectable } from "../../types/types";
import { screenContext } from "../context/ScreenContext";
import { renderer } from "../Renderer";
import { Panel } from "./Panel";
import { scaleContext } from "./ScaleContext";
import { StructureElementsInRoom } from "./StructureElementsInRoom";
import { tooltip } from "./Tooltip";

export class Room implements Renderable, Selectable {
    private name: string;
    private points: Coordinates[] = [];
    private isSelected: boolean = false;
    private middlePoint: Coordinates;
    private textSize: number;
    private lineWeight: number;
    private structureElementsInRoom: StructureElementsInRoom;

    constructor(name: string) {
        this.name = name || '';
        
        const ratio = scaleContext.pixelsPerMetersRatio || 0;
        this.textSize = Constants.ROOM_TEXT_SIZE_IN_METERS * ratio;
        this.lineWeight = Constants.ROOM_LINE_WEIGHT_IN_METERS * ratio;
        
        this.structureElementsInRoom = new StructureElementsInRoom(this);
        renderer.register(this);
    }

    // public
    public render(): void {
        const points = this.getPointsToDraw();
        const length = points.length;

        if (length < 2) {
            return;
        }

        this.updateDrawingSettings();

        for (let index = 0; index < length; index++) {
            const p1 = points[index];
            const p2 = points[(index + 1) % length];

            line(p1.x, p1.y, p2.x, p2.y);
        }

        pop();
        const middlePoint = this.middlePoint;
        if (middlePoint) {
            this.updateTextSettings();
            text(this.name, middlePoint.x, middlePoint.y);
            pop();
        }

        this.drawRoomSize(points);
        this.structureElementsInRoom.render();
    }

    public select(): void {
        this.isSelected = true;
    }

    public tryToDeselect(): boolean {
        this.isSelected = false;
        return true;
    }

    public addPoint(): void {
        const points = this.points;
        const mousePosition = screenContext.getMousePositionAbsolute();
        
        if (points.length >= 2) {
            return;
        } else {
            points.push(mousePosition);
            if (points.length >= 2) {
                this.middlePoint = this.getMiddlePoint();
                // TODO selectionContext.deselect();
                tooltip.roomAddingFinished();
            }
        }
    }

    public getName(): string {
        return this.name;
    }

    public remove(): void {
        renderer.remove(this);
        // TODO renderer.remove(this.structureElementsInRoom);
        this.structureElementsInRoom.clear();
    }

    public pointIsInsideRoom(point?: Coordinates): boolean {
        point = point || screenContext.getMousePositionAbsolute();
        const x = point.x;
        const y = point.y;
        
        if (this.points.length === 0) {
            return false;
        }

        const minX = this.points.map(p => p.x).reduce(minimumFunction);
        const maxX = this.points.map(p => p.x).reduce(maximumFunction);

        const minY = this.points.map(p => p.y).reduce(minimumFunction);
        const maxY = this.points.map(p => p.y).reduce(maximumFunction);

        return x > minX && x < maxX && y > minY && y < maxY;
    }

    public pointIsInsideText(): boolean {
        if (this.points.length < 2) {
            return false;
        }

        return pointIsInside(
            screenContext.getMousePositionAbsolute(),
            this.middlePoint, 
            textWidth(this.name),
            this.textSize
        );
    }

    public roomIsConfigured(): boolean {
        return this.points.length === 2;
    }

    public getPoints(): Coordinates[] {
        return this.points.map(p => ({x: p.x, y: p.y}));
    }

    public getWidthInMeters(points?: Coordinates[]): number {
        points = points || this.points;
        
        const ratio = scaleContext.pixelsPerMetersRatio || 0;
        const maxX = points.map(p => p.x).reduce(maximumFunction);
        const minX = points.map(p => p.x).reduce(minimumFunction);

        return (maxX - minX) / ratio;
    }

    public getHeightInMeters(points?: Coordinates[]): number {
        points = points || this.points;

        const ratio = scaleContext.pixelsPerMetersRatio || 0;
        const maxY = points.map(p => p.y).reduce(maximumFunction);
        const minY = points.map(p => p.y).reduce(minimumFunction);

        return (maxY - minY) / ratio;
    }

    public getCircumference(): number {
        return 2 * (this.getWidthInMeters() + this.getHeightInMeters());
    }

    public tryToRegisterPanel(panel: Panel): boolean {
        return this.structureElementsInRoom.tryToRegisterPanel(panel);
    }

    public removePanelFromRoom(panel: Panel): void {
        this.structureElementsInRoom.removePanelGroup(panel);
    }

    public TryToRegisterRotation(panel: Panel): boolean {
        return this.structureElementsInRoom.tryToRegisterRotation(panel);
    }

    public recalculateBeams(): void {
        this.structureElementsInRoom.recalculateBeams();
    }

    public getStructuralElementRenderObjects(): any { // TODO type!!!
        return this.structureElementsInRoom.getRenderObjects();
    }

    public getCd3060Amount(): number {
        return this.structureElementsInRoom.getCd3060Amount();
    }

    public validatePoints(pointsToValidate: Coordinates[][]): boolean {
        return true; // TODO később...
    }

    // private
    private getMiddlePoint(points?: Coordinates[]): Coordinates {
        points = points || this.getPointsToDraw();
        const length = points.length;
        if (length === 0) {
            return {x: 0, y: 0};
        }

        const x = points.map(p => p.x).reduce((a, b) => a + b) / length;
        const y = points.map(p => p.y).reduce((a, b) => a + b) / length;

        return {x, y};
    }

    private updateDrawingSettings(): void {
        push();
        if (this.isSelected) {
            stroke(Constants.SELECTED_TEXT_COLOR);
        } else {
            stroke(Constants.DEFAULT_TEXT_COLOR);
        }
        strokeWeight(this.lineWeight);
    }

    private updateTextSettings(): void {
        push();
        textAlign(CENTER, CENTER);
        if (this.pointIsInsideText()) {
            fill(Constants.SELECTED_TEXT_COLOR);
            textSize(this.textSize * Constants.ROOM_TEXT_POP_FACTOR);
        } else {
            fill(Constants.DEFAULT_TEXT_COLOR);
            textSize(this.textSize);
        }
    }

    private getPointsToDraw(): Coordinates[] {
        const points = this.points;
        
        const p0 = points[0];
        if (!p0) {
            return [];
        }

        const p1 = points.length >= 2 ? points[1] : screenContext.getMousePositionAbsolute();

        const pointsToDraw = [];
        pointsToDraw.push({x: p0.x, y: p0.y});
        pointsToDraw.push({x: p0.x, y: p1.y});
        pointsToDraw.push({x: p1.x, y: p1.y});
        pointsToDraw.push({x: p1.x, y: p0.y});

        return pointsToDraw;
    }

    private drawRoomSize(points: Coordinates[]): void {
        const topY = points.map(p => p.y).reduce(minimumFunction);
        const rightX = points.map(p => p.x).reduce(maximumFunction);
        const middlePoint = this.getMiddlePoint();

        const width = `${roundNumber(this.getWidthInMeters(points), 1)} m`;
        const height = `${roundNumber(this.getHeightInMeters(points), 1)} m`;

        textSize(this.textSize);

        textAlign(CENTER, TOP);
        text(width, middlePoint.x, topY);
        textAlign(RIGHT, CENTER);
        text(height, rightX, middlePoint.y);
    }
}