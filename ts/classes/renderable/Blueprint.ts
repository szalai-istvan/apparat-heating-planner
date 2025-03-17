import { image } from "../../declarations/declarations";
import { isDefined, isNullOrUndefined } from "../../helpers/helpers";
import { BlueprintSizeData, Coordinates, Renderable } from "../../types/types";
import { renderer } from "../Renderer";
import { tooltip } from "./Tooltip";

export class Blueprint implements Renderable {
    private data: any; // TODO any?

    constructor() {
        renderer.register(this);
    }

    public setBlueprintData(data: any): void {
        this.data = data;
        tooltip.fileIsUploaded();
    }

    public render(): void {
        const data = this.data;
        if (isNullOrUndefined(data)) {
            return;
        }

        const topLeftCoordinates = this.getTopLeftCoordinates();

        image(data,
            topLeftCoordinates.x,
            topLeftCoordinates.y,
            data.width,
            data.height
        );
    }

    dataIsPresent(): boolean {
        return isDefined(this.data);
    }

    public getSizeData(): BlueprintSizeData {
        const data = this.data;
        if (isNullOrUndefined(data)) {
            return {x: 0, y: 0, w: 0, h: 0};
        }

        const p = this.getTopLeftCoordinates();
        return { x: p.x, y: p.y, w: data.width, h: data.height };
    }

    // private
    private getTopLeftCoordinates(): Coordinates {
        const data = this.data;
        if (isNullOrUndefined(data)) {
            return {x: 0, y: 0};
        }

        return {
            x: - 0.5 * data.width,
            y: - 0.5 * data.height
        };
    }
}

export const blueprint = new Blueprint();