declare class SelectionContext {
    searchSelectableObject(): void;
    selectObject(obj: any): void;
    deselect(selectedObject: any): void;
    removeSelected(): void;
    isAnyThingSelected(): boolean;
    clearSelectionCache(): void;
    checkForSelection(): void;
    #private;
}
declare const selectionContext: SelectionContext;
