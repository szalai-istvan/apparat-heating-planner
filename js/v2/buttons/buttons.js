function createButtons() {
    fileUploadButton = new ButtonWrapper({
        text: 'Fájl feltöltése',
        size: regularButtonSize,
        position: topRibbonButtonPosition(1),
        onClick: () => upload(),
        shouldBeRendered: () => true
    });

    scaleButton = new ButtonWrapper({
        text: 'Méretarány felvétele',
        size: regularButtonSize,
        position: topRibbonButtonPosition(2),
        onClick: () => scaleContext.startScaling(),
        shouldBeRendered: () => blueprint.dataIsPresent()
    });

    addRoomsButton = new ButtonWrapper({
        text: 'Szoba felvétele',
        size: regularButtonSize,
        position: topRibbonButtonPosition(3),
        onClick: () => showAddRoomDialog(),
        shouldBeRendered: () => scaleContext.ratioIsSet()
    });

    deleteRoomButton = new ButtonWrapper({
        text: 'Szoba törl.',
        size: smallButtonSize,
        position: sidePanelButtonPosition(9),
        onClick: () => roomContext.removeSelected(),
        shouldBeRendered: () => roomContext.displayDeleteButton()
    });
    
    let row = 0;
    for (let type in panelTypes) {
        addPanelButtons.push(new ButtonWrapper({
            text: type,
            size: smallButtonSize,
            position: sidePanelButtonPosition(row++),
            onClick: () => panelContext.addPanel(type),
            shouldBeRendered: () => roomContext.thereAreRooms()
        }));
    }

    row+=2;
    editPanelButtons.rotate = new ButtonWrapper({
        text: 'Forgatás',
        size: smallButtonSize,
        position: sidePanelButtonPosition(row++),
        onClick: () => panelContext.rotateSelected(),
        shouldBeRendered: () => panelContext.hasSelectedPanel()
    });

    editPanelButtons.subtract = new ButtonWrapper({
        text: '-',
        size: {x: 40, y: 30},
        position: sidePanelButtonPosition(row),
        onClick: () => panelContext.removeFromSelectedGroup(),
        shouldBeRendered: () => panelContext.hasSelectedPanel()
    });

    editPanelButtons.add = new ButtonWrapper({
        text: '+',
        size: {x: 40, y: 30},
        position: {x: 50, y: 70 + row++ * (smallButtonSize.y + 5)},
        onClick: () => panelContext.addToSelectedGroup(),
        shouldBeRendered: () => panelContext.hasSelectedPanel()
    });

    editPanelButtons.delete = new ButtonWrapper({
        text: 'Törlés',
        size: smallButtonSize,
        position: sidePanelButtonPosition(row++),
        onClick: () => panelContext.removeSelected(),
        shouldBeRendered: () => panelContext.hasSelectedPanel()
    });

}