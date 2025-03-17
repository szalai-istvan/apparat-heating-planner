import { getClassName } from "../helpers/helpers";
import { Renderable } from "../types/types";
import { Blueprint } from "./renderable/Blueprint";
import { ButtonWrapper } from "./renderable/ButtonWrapper";
import { Panel } from "./renderable/Panel";
import { Room } from "./renderable/Room";
import { ScaleContext } from "./renderable/ScaleContext";
import { StructureElementsInRoom } from "./renderable/StructureElementsInRoom";
import { Tooltip } from "./renderable/Tooltip";

export class Renderer {
    private bluePrint: Blueprint | null = null;
    private scaleContext: ScaleContext | null = null;
    private tooltip: Tooltip | null = null;
    private panels: Panel[] = [];
    private rooms: Room[] = [];
    private buttons: ButtonWrapper[] = [];
    private beams: StructureElementsInRoom[] = [];

    constructor() { }

    public register(renderable: Renderable): void {
        const className = getClassName(renderable);
        if (!className) {
            return;
        }

        if (className === 'Blueprint') {
            this.bluePrint = renderable as Blueprint;
        } else if (className === 'Panel') {
            this.panels.push(renderable as Panel);
        } else if (className === 'Room') {
            this.rooms.push(renderable as Room);
        } else if (className === 'ScaleContext') {
            this.scaleContext = renderable as ScaleContext;
        } else if (className === 'ButtonWrapper') {
            this.buttons.push(renderable as ButtonWrapper);
        } else if (className === 'Tooltip') {
            this.tooltip = renderable as Tooltip;
        } else if (className === 'StructureElementsInRoom') {
            this.beams.push(renderable as StructureElementsInRoom);
        } else {
            throw new Error(`Attempt to register unexpected render type: ${className}`);
        }
    }

    public renderTranslatedObjects(): void {
        const renderObjects: Renderable[] = this.getTranslatedRenderObjects();
        renderObjects.filter(x => x).forEach(x => x.render());
    }

    public renderAbsolutePositionObjects(): void {
        const renderObjects: Renderable[] = this.getAbsoluteRenderObjects();
        renderObjects.filter(x => x).forEach(x => x.render());
    }

    public remove(renderable: Renderable): void {
        const className = getClassName(renderable);
        if (!className) {
            return;
        }

        if (className === 'Panel') {
            this.panels = this.panels.filter(x => x !== renderable);
        } else if (className === 'Room') {
            this.rooms = this.rooms.filter(x => x !== renderable);
        } else if (className === 'StructureElementsInRoom') {
            this.beams = this.beams.filter(x => x !== renderable);
        } else {
            throw new Error(`Deleting render object of type ${className} is unspecified.`);
        }
    }

    private getTranslatedRenderObjects(): Renderable[] {
        const StructureElementsRenderObjects = this.rooms.map(room => room.getStructuralElementRenderObjects());
        const alignedRenders = StructureElementsRenderObjects.map(x => x.alignedBeams);
        const crossedRenders = StructureElementsRenderObjects.map(x => x.crossBeams);

        return [this.bluePrint, ...this.panels, ...alignedRenders, ...crossedRenders, ...this.rooms, this.scaleContext, ...this.buttons];
    }

    private getAbsoluteRenderObjects(): Renderable[] {
        if (this.tooltip) {
            return [this.tooltip];
        }
        return [];
    }
}

export const renderer = new Renderer();