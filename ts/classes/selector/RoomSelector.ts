import { displayErrorMessage } from "../../helpers/errordialog";
import { summaryFunction } from "../../helpers/helpers";
import { Coordinates, Selector } from "../../types/types";
import { Panel } from "../renderable/Panel";
import { Room } from "../renderable/Room";
import { tooltip } from "../renderable/Tooltip";
import { panelSelector } from "./PanelSelector";
import { selectionContext } from "./SelectionContext";

class RoomSelector implements Selector<Room> {
    private cachedSelection: Room | null;
    private selectedRoom: Room | null;
    private rooms: Room[] = [];

    constructor() {
        selectionContext.registerSelector(this);
    }

    public create(name: string): boolean {
        name = name.trim();

        if (this.roomNameAlreadyExists(name)) {
            displayErrorMessage(`${name} nevű szoba már létezik. Egyedi nevet kell megadni.`);
            return false;
        }
        const room = new Room(name);
        this.rooms.push(room);

        tooltip.roomAddingStarted();
        selectionContext.selectObject(room);
        return true;
    }
    
    public select(room?: Room): void {
        room = room || this.checkForSelection() || undefined;
        if (!room) return;

        this.tryToDeselect();
        room.select();
        this.selectedRoom = room;

        if (room.roomIsConfigured()) {
            tooltip.roomSelected();
        }
    }
    
    public tryToDeselect(): boolean {
        if (this.selectedRoom && this.selectedRoom.roomIsConfigured()) {
            this.selectedRoom.tryToDeselect();
            this.selectedRoom = null;
            tooltip.roomDeselected();
        }
        return true;
    }
    
    public removeSelected(): void {
        const room = this.selectedRoom;
        if (room) {
            room.remove();
            this.rooms = this.rooms.filter(r => r !== room);
            this.selectedRoom = null;
        }
        if (this.rooms.length === 0) {
            tooltip.scalingFinished();
        }
    }

    public checkForSelection(): Room | null {
        if (this.cachedSelection) {
            return this.cachedSelection;
        }

        const selection = this.rooms.filter(r => r.pointIsInsideText());
        const room = selection[0];
        if (room) {
            if (room !== this.selectedRoom) {
                tooltip.roomNameHovered();
            }
            this.cachedSelection = room;
            return room;
        }

        tooltip.roomNameUnhovered();
        return null;
    }

    public clearSelectionCache(): void {
        this.cachedSelection = null;
    }

    public clear(): void {
        this.rooms.forEach(room => room.remove());
        this.rooms = [];
        selectionContext.deselect();
        panelSelector.clear();
    }

    public addPoint(): void {
        const selectedRoom = this.selectedRoom;
        if (selectedRoom) {
            if (this.pointIsValid()) {
                selectedRoom.addPoint();
            } else {
                displayErrorMessage('A pont felvétele átfedést okozna a szobák között. Válasszon másik pontot.');
            }    
        }
    }

    public selectedRoomIsConfiguredOrNoRoomIsSelected(): boolean {
        if (!this.selectedRoom) {
            return true;
        }

        return this.selectedRoom.roomIsConfigured();
    }

    public displayDeleteButton(): boolean {
        if (this.selectedRoom) {
            return this.selectedRoom.roomIsConfigured();
        }
        return false;
    }

    public thereAreRooms(): boolean {
        return this.rooms.length > 0 && this.rooms[0].roomIsConfigured();
    }

    public getRoomContainingPoint(point: Coordinates): string | null {
        const room = this.rooms.filter(r => r.pointIsInsideRoom(point))[0];
        if (room) {
            return room.getName();
        }
        return null;
    }

    public getRoomNames(): string[] {
        return this.rooms.map(r => r.getName());
    }

    public registerRelocatedPanelGroup(panel: Panel): Room | null {
        const boundaryPoints = panel.getBoundaryPoints();
        const p1 = boundaryPoints.p1;
        const p2 = boundaryPoints.p2;

        const room = this.rooms.filter(room => room.pointIsInsideRoom(p1) && room.pointIsInsideRoom(p2))[0];
        if (!room) {
            displayErrorMessage('A panelcsoport része vagy egésze szobán kívül van!<br/>Helyezze el a panelt máshová, vagy csökkentse a panelek hosszát a baloldali gombok segítségével!');    
            return null;
        }

        const successfulRegister = room.tryToRegisterPanel(panel);
        if (!successfulRegister) {
            displayErrorMessage('Egy adott szobában nem helyezhet el különböző irányban álló paneleket!');
            return null;
        }

        return room;
    }

    public calculateUd30Amount(): number {
        return this.rooms.map(room => room.getCircumference()).reduce(summaryFunction, 0);
    }

    public calculateCd3060Amount(): number {
        return this.rooms.map(room => room.getCd3060Amount()).reduce(summaryFunction, 0);
    }

    // private
    private roomNameAlreadyExists(name: string): boolean {
        return this.rooms.map(room => room.getName().toLowerCase()).includes(name.toLowerCase());
    }

    private pointIsValid(): boolean {
        if (this.rooms.length < 2) {
            return true;
        }

        const pointIsNotInAnyRooms = this.rooms.filter(r => r.pointIsInsideRoom()).length === 0;
        if (!pointIsNotInAnyRooms) {
            return false;
        }
        const pointsToValidate = this.rooms.map(room => room.getPoints());
        if (this.selectedRoom) {
            return this.selectedRoom.validatePoints(pointsToValidate);
        }
        return true;
    }
}

export const roomSelector = new RoomSelector();