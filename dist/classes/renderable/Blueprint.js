import { image } from "../../declarations/declarations";
import { isDefined, isNullOrUndefined } from "../../helpers/helpers";
import { renderer } from "../Renderer";
import { tooltip } from "./Tooltip";
export class Blueprint {
    constructor() {
        renderer.register(this);
    }
    setBlueprintData(data) {
        this.data = data;
        tooltip.fileIsUploaded();
    }
    render() {
        const data = this.data;
        if (isNullOrUndefined(data)) {
            return;
        }
        const topLeftCoordinates = this.getTopLeftCoordinates();
        image(data, topLeftCoordinates.x, topLeftCoordinates.y, data.width, data.height);
    }
    dataIsPresent() {
        return isDefined(this.data);
    }
    getSizeData() {
        const data = this.data;
        if (isNullOrUndefined(data)) {
            return { x: 0, y: 0, w: 0, h: 0 };
        }
        const p = this.getTopLeftCoordinates();
        return { x: p.x, y: p.y, w: data.width, h: data.height };
    }
    getTopLeftCoordinates() {
        const data = this.data;
        if (isNullOrUndefined(data)) {
            return { x: 0, y: 0 };
        }
        return {
            x: -0.5 * data.width,
            y: -0.5 * data.height
        };
    }
}
export const blueprint = new Blueprint();
