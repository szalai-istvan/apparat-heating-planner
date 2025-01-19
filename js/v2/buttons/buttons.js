const regularButtonSize = {x: 100, y: 40};
const smallButtonSize = {x: 80, y: 30};

function topRibbonButtonPosition(col) {
    return {x: -20 + col * (20 + regularButtonSize.x), y: 10};
}

function sidePanelButtonPosition(row) {
    return {x: 10, y: 70 + row * (smallButtonSize.y + 5)};
}

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
}