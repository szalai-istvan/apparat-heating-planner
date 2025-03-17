import { Constants } from "../../appdata/constants";
import { fill, stroke, rect, textAlign, CENTER, textSize, noStroke, text, push, translate, rotate, pop } from "../../declarations/declarations";
import { calculateDistance, isNullOrUndefined, maximumFunction, minimumFunction } from "../../helpers/helpers";
import { BeamDefinition, Coordinates, Reducer, Renderable, Supplier } from "../../types/types";
import { renderer } from "../Renderer";
import { Panel } from "./Panel";
import { Room } from "./Room";
import { scaleContext } from "./ScaleContext";

export class StructureElementsInRoom implements Renderable {
    private alignment: number | null;
    private room: Room;
    private beamWidthPixel: number;
    private textSize: number;
    private lineWidth: number;

    private panels: Panel[] = [];
    private alignedBeams: BeamDefinition[] = [];
    private crossBeams: BeamDefinition[] = [];

    private drawAlignedBeamsFunc: Supplier<void>;
    private drawCrossBeamsFunc: Supplier<void>;

    constructor(room: Room) {
        this.room = room;
        this.alignment = null;
        renderer.register(this);

        const ratio = scaleContext.pixelsPerMetersRatio || 0;
        this.lineWidth = Constants.ROOM_LINE_WEIGHT_IN_METERS * ratio;

        this.beamWidthPixel = Constants.BEAM_WIDTH_METER * ratio;
        this.textSize = Constants.BEAM_TEXT_SIZE_METER * ratio;
    }

    // public
    public render(): void {

    }

    public tryToRegisterPanel(panel: Panel): boolean {
        const panelAlignment = panel.getAlignment();
        if (isNullOrUndefined(this.alignment) || panelAlignment === this.alignment) {
            this.setAlignment(panelAlignment);
            if (!this.panels.includes(panel)) {
                this.panels.push(panel);
                this.recalculateBeams();
                this.calculateAdjustmentIfNecessary(panel);
            }
            return true;
        }
        return false;
    }

    public removePanelGroup(panel: Panel): void {
        this.panels = this.panels.filter(p => p !== panel);
        this.recalculateBeams();
        if (this.panels.length === 0) {
            this.setAlignment(null);
        }
    }

    public tryToRegisterRotation(panel: Panel): boolean {
        if (isNullOrUndefined(this.alignment)) {
            return true;
        }
        if (this.panels.length < 2 && this.panels[0] === panel) {
            this.setAlignment((panel.getAlignment() + 1) % 2);
            return true;
        }
        return false;
    }

    public clear(): void {
        this.panels.forEach(p => p.remove());
        this.panels = [];
        this.alignedBeams = [];
        this.crossBeams = [];
    }

    public recalculateBeams(): void {
        this.alignedBeams = [];
        this.crossBeams = [];

        if (this.alignment) {
            this.recalculateAlignedBeamsVertical();
            this.recalculateCrossBeamsVertical();
        } else {
            this.recalculateAlignedBeamsHorizontal();
            this.recalculateCrossBeamsHorizontal();
        }
    }

    public getRenderObjects(): {alignedBeams: Renderable, crossBeams: Renderable} { // TODO ezt ki kell kukázni és értelmes megoldást találni
        return {
            alignedBeams: {
                render: () => this.drawAlignedBeamsFunc && this.drawAlignedBeamsFunc()
            },
            crossBeams: {
                render: () => this.drawCrossBeamsFunc && this.drawCrossBeamsFunc()
            }
        };
    }

    public getCd3060Amount(): number {
        const aligned = this.alignedBeams.map(beam => this.getLength(beam)).reduce((a, b) => a + b, 0);
        const crossed = this.crossBeams.map(beam => this.getLength(beam)).reduce((a, b) => a + b, 0);

        return aligned + crossed;
    }

    // private
    private recalculateAlignedBeamsHorizontal(): void {
        const roomTopLeft = this.getRoomTopLeftCornerCoordinates();
        const roomTopRight = this.getRoomTopRightCornerCoordinates();

        for (let p of this.panels) {
            const panelTopLeft = p.getTopLeftCornerCoordinates();
            const panelWidth = p.getSizeInPixels().width;

            for (let offset = 0; offset <= p.getNumberOfPanelsInGroup(); offset++) {
                const y = panelTopLeft.y + offset * panelWidth;
                const beamDefinition = this.createBeamDefinition(roomTopLeft.x, y, roomTopRight.x, y);
                this.alignedBeams.push(beamDefinition);
            }
        }
    }

    private recalculateCrossBeamsHorizontal(): void {
        const roomTopLeft = this.getRoomTopLeftCornerCoordinates();
        const roomBottomLeft = this.getRoomBottomLeftCornerCoordinates();
        const roomBottomRight = this.getRoomBottomRightCornerCoordinates();

        const ratio = scaleContext.pixelsPerMetersRatio || 0;
        const roomWidthPixels = roomBottomRight.x - roomBottomLeft.x;
        const pixelsBetweenBeams = Constants.METERS_BETWEEN_BEAMS * ratio;
        let initialOffset = (roomWidthPixels % pixelsBetweenBeams) / 2;
        const minimumOffset = Constants.BEAM_MINIMUM_OFFSET_METERS * ratio;
        if (initialOffset < minimumOffset) {
            initialOffset += pixelsBetweenBeams;
        }

        let x = roomTopLeft.x + initialOffset;
        const y1 = roomTopLeft.y;
        const y2 = roomBottomLeft.y;
        while (x < (roomBottomRight.x - minimumOffset)) {
            const beam = this.createBeamDefinition(x, y1, x, y2);
            this.crossBeams.push(beam);
            x += pixelsBetweenBeams;
        }
    }

    private recalculateAlignedBeamsVertical(): void {
        const roomTopLeft = this.getRoomTopLeftCornerCoordinates();
        const roomBottomLeft = this.getRoomBottomLeftCornerCoordinates();

        for (let p of this.panels) {
            const panelTopLeft = p.getTopLeftCornerCoordinates();
            const panelWidth = p.getSizeInPixels().width;

            for (let offset = 0; offset <= p.getNumberOfPanelsInGroup(); offset++) {
                const x = panelTopLeft.x - offset * panelWidth;
                const beamDefinition = this.createBeamDefinition(x, roomTopLeft.y, x, roomBottomLeft.y);
                this.alignedBeams.push(beamDefinition);
            }
        }
    }

    private recalculateCrossBeamsVertical(): void {
        const roomTopLeft = this.getRoomTopLeftCornerCoordinates();
        const roomBottomLeft = this.getRoomBottomLeftCornerCoordinates();
        const roomBottomRight = this.getRoomBottomRightCornerCoordinates();

        const ratio = scaleContext.pixelsPerMetersRatio || 0;
        const roomHeightPixels = roomBottomLeft.y - roomTopLeft.y;
        const pixelsBetweenBeams = Constants.METERS_BETWEEN_BEAMS * ratio;
        let initialOffset = (roomHeightPixels % pixelsBetweenBeams) / 2;
        const minimumOffset = Constants.BEAM_MINIMUM_OFFSET_METERS * ratio;
        if (initialOffset < minimumOffset) {
            initialOffset += pixelsBetweenBeams;
        }

        let y = roomTopLeft.y + initialOffset;
        const x1 = roomBottomLeft.x;
        const x2 = roomBottomRight.x;
        while (y < (roomBottomLeft.y - minimumOffset)) {
            const beam = this.createBeamDefinition(x1, y, x2, y);
            this.crossBeams.push(beam);
            y += pixelsBetweenBeams;
        }
    }

    private createBeamDefinition(x1: number, y1: number, x2: number, y2: number): BeamDefinition {
        return {
            p1: { x: x1, y: y1 },
            p2: { x: x2, y: y2 }
        };
    }

    private getRoomTopLeftCornerCoordinates(): Coordinates {
        return this.getRoomCornerCoordinates(minimumFunction, minimumFunction);
    }

    private getRoomTopRightCornerCoordinates(): Coordinates {
        return this.getRoomCornerCoordinates(maximumFunction, minimumFunction);
    }

    private getRoomBottomLeftCornerCoordinates(): Coordinates {
        return this.getRoomCornerCoordinates(minimumFunction, maximumFunction);
    }

    private getRoomBottomRightCornerCoordinates(): Coordinates {
        return this.getRoomCornerCoordinates(maximumFunction, maximumFunction);
    }

    private getRoomCornerCoordinates(xReducer: Reducer<number>, yReducer: Reducer<number>): Coordinates {
        const points = this.room.getPoints();
        const x = points.map(p => p.x).reduce(xReducer);
        const y = points.map(p => p.y).reduce(yReducer);
        return { x, y };
    }

    private setAlignment(alignment: number | null): void {
        this.alignment = alignment;
        if (alignment === 0) {
            this.drawAlignedBeamsFunc = () => this.alignedBeams.forEach(beam => this.drawHorizontalBeam(beam));
            this.drawCrossBeamsFunc = () => this.crossBeams.forEach(beam => this.drawVerticalBeam(beam));
        } else if (alignment === 1) {
            this.drawAlignedBeamsFunc = () => this.alignedBeams.forEach(beam => this.drawVerticalBeam(beam));
            this.drawCrossBeamsFunc = () => this.crossBeams.forEach(beam => this.drawHorizontalBeam(beam));
        } else {
            this.drawAlignedBeamsFunc = () => {};
            this.drawCrossBeamsFunc = () => {};
        }
    }

    private drawHorizontalBeam(beam: BeamDefinition): void {
        fill(Constants.BEAM_COLOR);
        stroke(this.lineWidth);

        const p1 = beam.p1;
        const p2 = beam.p2;

        rect(p1.x, p1.y - this.beamWidthPixel / 2, Math.abs(p2.x - p1.x), this.beamWidthPixel);
        this.drawHorizontalText(beam);
    }

    private drawVerticalBeam(beam: BeamDefinition): void {
        fill(Constants.BEAM_COLOR);
        stroke(this.lineWidth);

        const p1 = beam.p1;
        const p2 = beam.p2;

        rect(p1.x - this.beamWidthPixel / 2, p1.y, this.beamWidthPixel, Math.abs(p2.y - p1.y));
        this.drawVerticalText(beam);
    }

    private drawHorizontalText(beam: BeamDefinition): void {
        textAlign(CENTER, CENTER);
        textSize(this.textSize);
        noStroke();
        fill(Constants.DEFAULT_TEXT_COLOR);

        const centerP = {
            x: (beam.p1.x + beam.p2.x) / 2,
            y: (beam.p1.y + beam.p2.y) / 2,
        };

        const offset = Math.abs(beam.p1.x - beam.p2.x) / 4;
        const x1 = centerP.x - offset;
        const x2 = centerP.x + offset;
        text(Constants.BEAM_TYPE, x1, centerP.y);
        text(Constants.BEAM_TYPE, centerP.x, centerP.y);
        text(Constants.BEAM_TYPE, x2, centerP.y);
    }

    private drawVerticalText(beam: BeamDefinition): void {
        textAlign(CENTER, CENTER);
        textSize(this.textSize);
        noStroke();
        fill(Constants.DEFAULT_TEXT_COLOR);

        const centerP = {
            x: (beam.p1.x + beam.p2.x) / 2,
            y: (beam.p1.y + beam.p2.y) / 2,
        };

        push();
        translate(centerP.x, centerP.y);
        rotate(270);

        const offset = Math.abs(beam.p1.y - beam.p2.y) / 4;
        text(Constants.BEAM_TYPE, offset, 0);
        text(Constants.BEAM_TYPE, 0, 0);
        text(Constants.BEAM_TYPE, -offset, 0);
        pop();
    }

    private getLength(beam: BeamDefinition): number {
        const length = calculateDistance(beam.p1, beam.p2);
        const ratio = scaleContext.pixelsPerMetersRatio || 1;
        return length / ratio;
    }

    private calculateAdjustmentIfNecessary(panel: Panel): void {
        // TODO későbbre
        // if (this.#alignment === 0) {
        //     this.#calculateAdjustmentIfNecessaryHorizontal(panel);
        // } else {
        //     this.#calculateAdjustmentIfNecessaryVertical(panel);
        // }
    }

    // #calculateAdjustmentIfNecessaryHorizontal(panel) {

    // }

    
    // #calculateAdjustmentIfNecessaryVertical(panel) {

    // }
}
