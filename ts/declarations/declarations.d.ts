declare const LEFT: string;
declare const RIGHT: string;
declare const CENTER: string;
declare const TOP: string;
declare let mouseX: number;
declare let mouseY: number;
declare let mouseButton: 'left' | 'right';
declare let DEGREES: string;
declare let pdfjsLib: any;

declare function angleMode(type: string): void;
declare function arc(x: number, y: number, d1: number, d2: number, a1: number, a2: number): void;
declare function background(shade: number): void;
declare function createButton(text: string): P5Button;
declare function createCanvas(w: number, h: number): any;
declare function fill(color: string): void;
declare function frameRate(): number;
declare function image(data: any, x: number, y: number, width: number, height: number): void;
declare function line(x1: number, y1: number, x2: number, y2: number): void;
declare function loadImage(src: string): void;
declare function noFill(): void;
declare function noStroke(): void;
declare function pop(): void;
declare function push(): void;
declare function rect(x: number, y: number, width: number, height: number): void;
declare function resizeCanvas(w: number, h: number): void;
declare function rotate(angle: number): void;
declare function scale(param: number): void;
declare function stroke(param: string | number): void;
declare function strokeWeight(weight: number): void;
declare function text(text: string | number, x: number, y: number): void;
declare function translate(x: number, y: number): void;
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