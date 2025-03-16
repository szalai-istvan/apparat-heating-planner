declare class ScaleContext {
    scalingInProgress: boolean;
    pixelsPerMetersRatio: null;
    startScaling(): void;
    addReferencePoint(): void;
    processScalingValue(scalingValue: any): void;
    draw(): void;
    ratioIsSet(): boolean;
    clear(): void;
    #private;
}
declare const scaleContext: ScaleContext;
