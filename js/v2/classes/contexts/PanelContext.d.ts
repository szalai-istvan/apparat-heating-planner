declare class PanelContext {
    createOrReplacePanel(type: any): void;
    select(panel?: undefined): void;
    deselect(): void;
    removeSelected(): void;
    checkForSelection(): any;
    clearSelectionCache(): void;
    clear(): void;
    rotateSelected(): void;
    addToSelectedGroup(): void;
    removeFromSelectedGroup(): void;
    hasSelectedPanel(): boolean;
    calculateQuotePanelArray(): any[];
    thereArePanels(): boolean;
    #private;
}
declare const panelContext: PanelContext;
