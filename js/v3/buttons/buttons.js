var helpButton;

function createButtons() {
    fileUploadButton = new ButtonWrapper({
        text: 'Alaprajz feltöltése',
        size: REGULAR_BUTTON_SIZE,
        position: topRibbonButtonPosition(1),
        onClick: () => upload(),
        shouldBeRendered: () => true
    });

    scaleButton = new ButtonWrapper({
        text: 'Méretarány felvétele',
        size: REGULAR_BUTTON_SIZE,
        position: topRibbonButtonPosition(2),
        onClick: () => scaleContext.startScaling(),
        shouldBeRendered: () => blueprintContext.blueprintDataIsPresent()
    });

    addRoomsButton = new ButtonWrapper({
        text: 'Helyiség felvétele',
        size: REGULAR_BUTTON_SIZE,
        position: topRibbonButtonPosition(3),
        onClick: () => showAddRoomDialog(),
        shouldBeRendered: () => scaleContext.ratioIsSet()
    });

    let row = 0;
    clearBlueprintsButton = new ButtonWrapper({
        text: 'Alaprajzok eltávolítása',
        size: TALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(row++),
        onClick: () => clearBlueprints(),
        shouldBeRendered: () => blueprintContext.blueprintDataIsPresent()
    });

    row+=0.5;
    for (let type in panelTypes) {
        addPanelButtons.push(new ButtonWrapper({
            text: type,
            size: SMALL_BUTTON_SIZE,
            position: sidePanelButtonPosition(row++),
            onClick: () => panelContext.createOrReplacePanel(type),
            shouldBeRendered: () => roomContext.thereAreRooms()
        }));
    }

    row+=0.5;
    editPanelButtons.rotate = new ButtonWrapper({
        text: 'Panel forgatása',
        size: TALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(row++),
        onClick: () => panelContext.tryToRotateSelected(),
        shouldBeRendered: () => panelContext.hasSelectedPanel()
    });

    editPanelButtons.subtract = new ButtonWrapper({
        text: '-',
        size: HALF_BUTTON_SIZE,
        position: sidePanelButtonPosition(row+=0.5),
        onClick: () => panelContext.removeFromSelectedGroup(),
        shouldBeRendered: () => panelContext.hasSelectedPanel()
    });

    const addButtonPosition = sidePanelButtonPosition(row++);
    addButtonPosition.x += HALF_BUTTON_SIZE.x;
    editPanelButtons.add = new ButtonWrapper({
        text: '+',
        size: HALF_BUTTON_SIZE,
        position: addButtonPosition,
        onClick: () => panelContext.tryToAddToSelectedGroup(),
        shouldBeRendered: () => panelContext.hasSelectedPanel()
    });

    editPanelButtons.delete = new ButtonWrapper({
        text: 'Panel törlése',
        size: TALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(row),
        onClick: () => selectionContext.removeSelected(),
        shouldBeRendered: () => panelContext.hasSelectedPanel()
    });

    deleteRoomButton = new ButtonWrapper({
        text: 'Helyiség törlése',
        size: TALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(row),
        onClick: () => selectionContext.removeSelected(),
        shouldBeRendered: () => roomContext.displayDeleteButton()
    });

    downloadSummaryButton = new ButtonWrapper({
        text: 'Árkalkuláció letöltése',
        size: TALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(row+=1.5),
        onClick: () => openTransportDialog(),
        shouldBeRendered: () => panelContext.thereArePanels()
    });

    helpButton = new ButtonWrapper({
        text: 'Segítség',
        size: SMALL_BUTTON_SIZE,
        position: bottomPosition(SMALL_BUTTON_SIZE),
        onClick: () => displayHelpData(),
        shouldBeRendered: () => true
    });

}