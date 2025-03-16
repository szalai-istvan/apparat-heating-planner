declare class StructureElementsInRoom {
    constructor(room: any);
    draw(): void;
    addPanelGroup(panel: any): boolean;
    removePanelGroup(panel: any): void;
    registerRotation(panel: any): boolean;
    clear(): void;
    recalculateBeams(): void;
    getRenderObjects(): {
        alignedBeams: {
            draw: () => any;
        };
        crossBeams: {
            draw: () => any;
        };
    };
    getCd3060Amount(): number;
    #private;
}
