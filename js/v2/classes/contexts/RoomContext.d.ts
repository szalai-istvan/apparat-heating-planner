declare class RoomContext {
    createRoom(name: any): boolean;
    select(room?: undefined): void;
    deselect(): void;
    removeSelected(): void;
    checkForSelection(): any;
    clearSelectionCache(): void;
    clear(): void;
    addPoint(): void;
    selectedRoomIsConfiguredOrNoRoomIsSelected(): any;
    displayDeleteButton(): null;
    thereAreRooms(): any;
    getRoomContainingPoint(point: any): any;
    getRoomNames(): any[];
    registerRelocatedPanelGroup(panel: any): any;
    calculateUd30Amount(): any;
    calculateCd3060Amount(): any;
    #private;
}
declare const roomContext: RoomContext;
