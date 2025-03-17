import { Constants } from "../appdata/constants";
import { PANEL_TYPES } from "../appdata/panelTypes";
import { blueprint } from "../classes/renderable/Blueprint";
import { ButtonWrapper } from "../classes/renderable/ButtonWrapper";
import { scaleContext } from "../classes/renderable/ScaleContext";
import { panelSelector } from "../classes/selector/PanelSelector";
import { roomSelector } from "../classes/selector/RoomSelector";
import { selectionContext } from "../classes/selector/SelectionContext";
import { bottomPosition, displayDeveloperData, sidePanelButtonPosition, topRibbonButtonPosition } from "../helpers/helpers";
import { EditPanelButtons } from "../types/types";
import { addPanelButtons } from "./addPanelButtons";
import { showAddRoomDialog } from "./addRoomsButton";
import { openTransportDialog } from "./downloadSummaryButton";
import { upload } from "./fileUploadButton";

export let deleteRoomButton: ButtonWrapper;
export let fileUploadButton: ButtonWrapper;
export let addRoomsButton: ButtonWrapper;
export let downloadSummaryButton: ButtonWrapper;
export const editPanelButtons: EditPanelButtons = {
    rotate: null,
    add: null,
    subtract: null,
    delete: null
};
export let scaleButton: ButtonWrapper;

export function createButtons(): void {
    fileUploadButton = new ButtonWrapper({
        text: 'Fájl feltöltése',
        size: Constants.REGULAR_BUTTON_SIZE,
        position: topRibbonButtonPosition(1),
        onClick: () => upload(),
        shouldBeRendered: () => true
    });

    scaleButton = new ButtonWrapper({
        text: 'Méretarány felvétele',
        size: Constants.REGULAR_BUTTON_SIZE,
        position: topRibbonButtonPosition(2),
        onClick: () => scaleContext.startScaling(),
        shouldBeRendered: () => blueprint.dataIsPresent()
    });

    addRoomsButton = new ButtonWrapper({
        text: 'Szoba felvétele',
        size: Constants.REGULAR_BUTTON_SIZE,
        position: topRibbonButtonPosition(3),
        onClick: () => showAddRoomDialog(),
        shouldBeRendered: () => scaleContext.ratioIsSet()
    });

    let row = 0;
    for (let type in PANEL_TYPES) {
        addPanelButtons.push(new ButtonWrapper({
            text: type,
            size: Constants.SMALL_BUTTON_SIZE,
            position: sidePanelButtonPosition(row++),
            onClick: () => panelSelector.create(type),
            shouldBeRendered: () => roomSelector.thereAreRooms()
        }));
    }

    row+=2;
    editPanelButtons.rotate = new ButtonWrapper({
        text: 'Forgatás',
        size: Constants.SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(row++),
        onClick: () => panelSelector.rotateSelected(),
        shouldBeRendered: () => panelSelector.hasSelectedPanel()
    });

    editPanelButtons.subtract = new ButtonWrapper({
        text: '-',
        size: Constants.HALF_BUTTON_SIZE,
        position: sidePanelButtonPosition(row),
        onClick: () => panelSelector.removeFromSelectedGroup(),
        shouldBeRendered: () => panelSelector.hasSelectedPanel()
    });

    const addButtonPosition = sidePanelButtonPosition(row++);
    addButtonPosition.x += Constants.HALF_BUTTON_SIZE.x;
    editPanelButtons.add = new ButtonWrapper({
        text: '+',
        size: Constants.HALF_BUTTON_SIZE,
        position: addButtonPosition,
        onClick: () => panelSelector.addToSelectedGroup(),
        shouldBeRendered: () => panelSelector.hasSelectedPanel()
    });

    editPanelButtons.delete = new ButtonWrapper({
        text: 'Törlés',
        size: Constants.SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(row),
        onClick: () => selectionContext.removeSelected(),
        shouldBeRendered: () => panelSelector.hasSelectedPanel()
    });

    deleteRoomButton = new ButtonWrapper({
        text: 'Szoba törl.',
        size: Constants.SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(row++),
        onClick: () => selectionContext.removeSelected(),
        shouldBeRendered: () => roomSelector.displayDeleteButton()
    });

    downloadSummaryButton = new ButtonWrapper({
        text: 'Árkalkuláció letöltése',
        size: Constants.TALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(row++),
        onClick: () => openTransportDialog(),
        shouldBeRendered: () => panelSelector.thereArePanels()
    });

    new ButtonWrapper({
        text: 'Készítő névjegye',
        size: Constants.TALL_BUTTON_SIZE,
        position: bottomPosition(Constants.TALL_BUTTON_SIZE),
        onClick: () => displayDeveloperData(),
        shouldBeRendered: () => true
    });

}