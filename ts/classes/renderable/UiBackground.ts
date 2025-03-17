import { fill, line, noStroke, pop, push, rect, stroke } from "../../declarations/declarations";
import { getDocumentDimensions } from "../../helpers/helpers";
import { Renderable } from "../../types/types";
import { renderer } from "../Renderer";
import { selectionContext } from "../selector/SelectionContext";

export class UiBackground implements Renderable {
    
    constructor() {
        renderer.register(this);
    }

    public render(): void {
        const docSize = getDocumentDimensions();

        push();
        fill('lightgrey');
        noStroke();
        rect(0, 0, docSize.vw, 60);
        rect(0, 60, 100, docSize.vh - 60);
        stroke(3);
        line(100, 60, docSize.vw, 60);
        line(100, 60, 100, docSize.vh);
    
        line(450, 0, 450, 60);
    
        if (selectionContext.isAnyThingSelected()) {
            line(0, 370, 100, 370);
        }
        
        pop();
    }
}

export const uiBackground = new UiBackground();