function createButtons() {
    fileUploadButton = new ButtonWrapper({
        text: 'Tervrajz feltöltése',
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
        text: 'Szoba felvétele',
        size: REGULAR_BUTTON_SIZE,
        position: topRibbonButtonPosition(3),
        onClick: () => showAddRoomDialog(),
        shouldBeRendered: () => scaleContext.ratioIsSet()
    });

    let row = 0;
    for (let type in panelTypes) {
        addPanelButtons.push(new ButtonWrapper({
            text: type,
            size: SMALL_BUTTON_SIZE,
            position: sidePanelButtonPosition(row++),
            onClick: () => panelContext.createOrReplacePanel(type),
            shouldBeRendered: () => roomContext.thereAreRooms()
        }));
    }

    row+=2;
    editPanelButtons.rotate = new ButtonWrapper({
        text: 'Panel forgatása',
        size: SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(row++),
        onClick: () => panelContext.tryToRotateSelected(),
        shouldBeRendered: () => panelContext.hasSelectedPanel()
    });

    editPanelButtons.subtract = new ButtonWrapper({
        text: '-',
        size: HALF_BUTTON_SIZE,
        position: sidePanelButtonPosition(row),
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
        text: 'Törlés',
        size: SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(row),
        onClick: () => selectionContext.removeSelected(),
        shouldBeRendered: () => panelContext.hasSelectedPanel()
    });

    deleteRoomButton = new ButtonWrapper({
        text: 'Szoba törl.',
        size: SMALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(row++),
        onClick: () => selectionContext.removeSelected(),
        shouldBeRendered: () => roomContext.displayDeleteButton()
    });

    downloadSummaryButton = new ButtonWrapper({
        text: 'Árkalkuláció letöltése',
        size: TALL_BUTTON_SIZE,
        position: sidePanelButtonPosition(row++),
        onClick: () => openTransportDialog(),
        shouldBeRendered: () => panelContext.thereArePanels()
    });

    new ButtonWrapper({
        text: 'Készítő névjegye',
        size: TALL_BUTTON_SIZE,
        position: bottomPosition(TALL_BUTTON_SIZE),
        onClick: () => displayDeveloperData(),
        shouldBeRendered: () => true
    });

}