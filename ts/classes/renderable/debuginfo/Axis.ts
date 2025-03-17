import { CENTER, fill, LEFT, line, noStroke, stroke, strokeWeight, text, textAlign, textSize } from "../../../declarations/declarations";
import { Renderable } from "../../../types/types";

export class Axis implements Renderable { // TODO renderer managelje
    
    constructor() {}

    public render(): void {
        textSize(12);
        for (let i = -10_000; i < 10_000; i+=50) {
            strokeWeight(1);
            stroke('black');
            line(i, -5, i, 5);
            line(-5, i, 5, i);
            if (i !== 0) {
                noStroke();
                fill('black');
                textAlign(CENTER, CENTER);
                text(i, i, 15);
                textAlign(LEFT, CENTER);
                text(i, 15, i);
            }
        }
    
        stroke(1);
        stroke('black');
        line(0, 10_000, 0, -10_000);
        line(-10_000, 0, 10_000, 0);
    }
}