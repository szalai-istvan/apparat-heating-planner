declare const LEFT: string;
declare const RIGHT: string;
declare const CENTER: string;
declare const TOP: string;
declare let mouseX: number;
declare let mouseY: number;

declare function arc(x: number, y: number, d1: number, d2: number, a1: number, a2: number);
declare function createButton(text: string): P5Button;
declare function fill(color: string): void;
declare function image(data: any, x: number, y: number, width: number, height: number): void;
declare function line(x1: number, y1: number, x2: number, y2: number): void;
declare function noFill();
declare function pop();
declare function push();
declare function rect(x: number, y: number, width: number, height: number): void;
declare function rotate(angle: number);
declare function stroke(color: string);
declare function strokeWeight(weight: number);
declare function text(text: string, x: number, y: number): void;
declare function translate(x: number, y: number);
declare function textAlign(verticalAlignment: string, horizontalAlignment: string): void;
declare function textSize(size: number): void;
declare function textWidth(text: string): number;

export interface P5Button {
    size: (x: number, y: number) => void,
    position: (x: number, y: number) => void,
    mouseClicked: (Function) => void,
    show: Supplier<void>,
    hide: Supplier<void>
}