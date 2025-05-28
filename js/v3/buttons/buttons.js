var helpButton;

function createButtons() {
    const topRibbonButtonSizes = [];

    fileUploadButton = new ButtonWrapper({
        text: 'Alaprajz feltöltése',
        size: REGULAR_BUTTON_SIZE,
        position: topRibbonButtonPosition(topRibbonButtonSizes),
        onClick: () => upload(),
        shouldBeRendered: () => true
    });
    topRibbonButtonSizes.push(REGULAR_BUTTON_SIZE);

    scaleButton = new ButtonWrapper({
        text: 'Méretarány felvétele',
        size: REGULAR_BUTTON_SIZE,
        position: topRibbonButtonPosition(topRibbonButtonSizes),
        onClick: () => scaleContext.startScaling(),
        shouldBeRendered: () => blueprintContext.blueprintDataIsPresent()
    });
    topRibbonButtonSizes.push(REGULAR_BUTTON_SIZE);

    addRoomsButton = new ButtonWrapper({
        text: 'Helyiség felvétele',
        size: REGULAR_BUTTON_SIZE,
        position: topRibbonButtonPosition(topRibbonButtonSizes),
        onClick: () => showAddRoomDialog(),
        shouldBeRendered: () => scaleContext.ratioIsSet()
    });
    topRibbonButtonSizes.push(REGULAR_BUTTON_SIZE);

    addTopRibbonDelimeter(topRibbonButtonPosition(topRibbonButtonSizes).x);
    topRibbonButtonSizes.push(REGULAR_BUTTON_SIZE);

    const leftRibbonButtonSizes = [];

    new ButtonWrapper({
        text: 'Projekt mentése',
        size: TALL_SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => downloadProjectState(),
        shouldBeRendered: () => true
    });
    leftRibbonButtonSizes.push(TALL_SMALL_BUTTON_SIZE);

    new ButtonWrapper({
        text: 'Projekt betöltése',
        size: TALL_SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => uploadProject(),
        shouldBeRendered: () => true
    });
    leftRibbonButtonSizes.push(TALL_SMALL_BUTTON_SIZE);

    addLeftRibbonDelimeter(sidePanelButtonPosition(leftRibbonButtonSizes).y);

    clearBlueprintsButton = new ButtonWrapper({
        text: 'Alaprajzok eltávolítása',
        size: TALL_SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => clearBlueprints(),
        shouldBeRendered: () => blueprintContext.blueprintDataIsPresent()
    });
    leftRibbonButtonSizes.push(TALL_SMALL_BUTTON_SIZE);

    for (let type in panelTypes) {
        addPanelButtons.push(new ButtonWrapper({
            text: type,
            size: SMALL_BUTTON_SIZE,
            position: sidePanelButtonPosition(leftRibbonButtonSizes),
            onClick: () => panelContext.createOrReplacePanel(type),
            shouldBeRendered: () => roomContext.thereAreRooms()
        }));
        leftRibbonButtonSizes.push(SMALL_BUTTON_SIZE);
    }

    addLeftRibbonDelimeter(sidePanelButtonPosition(leftRibbonButtonSizes).y);

    editPanelButtons.rotate = new ButtonWrapper({
        text: 'Panel forgatása',
        size: TALL_SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => panelContext.tryToRotateSelected(),
        shouldBeRendered: () => panelContext.hasSelectedPanel()
    });
    leftRibbonButtonSizes.push(TALL_SMALL_BUTTON_SIZE);

    const addButtonPosition = sidePanelButtonPosition(leftRibbonButtonSizes);
    editPanelButtons.subtract = new ButtonWrapper({
        text: '-',
        size: HALF_WIDTH_BUTTON_SIZE,
        position: addButtonPosition,
        onClick: () => panelContext.removeFromSelectedGroup(),
        shouldBeRendered: () => panelContext.hasSelectedPanel()
    });
    
    addButtonPosition.x += HALF_WIDTH_BUTTON_SIZE.x;
    editPanelButtons.add = new ButtonWrapper({
        text: '+',
        size: HALF_WIDTH_BUTTON_SIZE,
        position: addButtonPosition,
        onClick: () => panelContext.tryToAddToSelectedGroup(),
        shouldBeRendered: () => panelContext.hasSelectedPanel()
    });
    leftRibbonButtonSizes.push(HALF_WIDTH_BUTTON_SIZE);

    editPanelButtons.delete = new ButtonWrapper({
        text: 'Panel törlése',
        size: TALL_SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => selectionContext.removeSelected(),
        shouldBeRendered: () => panelContext.hasSelectedPanel()
    });
    
    deleteRoomButton = new ButtonWrapper({
        text: 'Helyiség törlése',
        size: TALL_SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(leftRibbonButtonSizes),
        onClick: () => selectionContext.removeSelected(),
        shouldBeRendered: () => roomContext.displayDeleteButton()
    });
    leftRibbonButtonSizes.push(TALL_SMALL_BUTTON_SIZE);

    const downloadButtonPos = sidePanelButtonPosition(leftRibbonButtonSizes);
    downloadButtonPos.y += SMALL_BUTTON_SIZE.y + BUTTON_GAP_Y;
    downloadSummaryButton = new ButtonWrapper({
        text: 'Árkalkuláció letöltése',
        size: TALL_SMALL_BUTTON_SIZE,
        position: downloadButtonPos,
        onClick: () => openTransportDialog(),
        shouldBeRendered: () => panelContext.thereArePanels()
    });
    leftRibbonButtonSizes.push(TALL_SMALL_BUTTON_SIZE);

    helpButton = new ButtonWrapper({
        text: 'Segítség',
        size: SMALL_BUTTON_SIZE,
        position: bottomPosition(SMALL_BUTTON_SIZE),
        onClick: () => displayHelpData(),
        shouldBeRendered: () => true
    });

}