var ellipseRadius = 0.24;

var panelInformation = {
    panelBlocks: [],

    addToPanels: function(type, room, pieces) {
        if (!scalingContext.pixelsPerMetersRatio) {
            displayErrorMessage('Panelek hozzáadása előtt fel kell venni a méretarányt!');
            return;
        }
        this.panelBlocks.push(createPanelBlock(type, room, pieces));
    },

    drawPanels: function() {
        this.panelBlocks.filter(block => block !== panelSelectionContext.selectedPanelBlock).forEach(panelBlock => drawPanelBlock(panelBlock));
        panelSelectionContext.drawSelected();
    },

    offsetCenterPosition: function(offset) {
        this.panelBlocks.filter(block => block !== panelSelectionContext.selectedPanelBlock).forEach(panelBlock => {
            panelBlock.centerPosition = {
                x: panelBlock.centerPosition.x + offset.x,
                y: panelBlock.centerPosition.y + offset.y,
            };
        });
    }
};

function createPanelBlock(type, room, pieces) {
    return {
        type: type,
        room: room,
        pieces: pieces,
        alignment: 0,
        centerPosition: {
            x: canvas.width / 2,
            y: canvas.height / 2
        },
        dimensions: {
            length: panelTypes[type].length,
            width: panelTypes[type].width
        },
        getInformation: function() {
            return this.type + "\n" +  this.pieces + ' db' + '\n' + this.room;
        }
    }
}

function drawPanelBlock(panelBlock) {
    let centerPosition = displayContext.calculateAdjustedCenterCoordinates(panelBlock);
    centerPosition = displayContext.withDragOffsetAdded(centerPosition);

    if (panelSelectionContext.selectedPanelBlock && panelBlock === panelSelectionContext.selectedPanelBlock) {
        centerPosition = {
            x: centerPosition.x + panelDragContext.offset.x * displayContext.zoom,
            y: centerPosition.y + panelDragContext.offset.y * displayContext.zoom
        };
    }

    const zoomTimesRatio = displayContext.zoom * scalingContext.pixelsPerMetersRatio;
    const topLeftPosition = {
        x: centerPosition.x - 0.5 * panelBlock.dimensions.length * zoomTimesRatio,
        y: centerPosition.y - 0.5 * panelBlock.dimensions.width * zoomTimesRatio
    };
    const screenCoordinates = topLeftPosition;


    let heightOffset = panelBlock.pieces * -0.5 + 0.5;
    for (let i = 0; i < panelBlock.pieces; i++) {
        drawPanel(panelBlock, screenCoordinates, heightOffset++);
    }

    circle(centerPosition, 25);
    textAlign(CENTER, CENTER);
    textSize(5 * displayContext.zoom);
    text(panelBlock.getInformation(), centerPosition.x, centerPosition.y);
}

function drawPanel(panelBlock, screenCoordinates, heightOffset) {
    const zoomTimesRatio = displayContext.zoom * scalingContext.pixelsPerMetersRatio;
    const length = panelBlock.dimensions.length * zoomTimesRatio;
    const width = panelBlock.dimensions.width * zoomTimesRatio;

    const coordinates = {
        x: screenCoordinates.x, 
        y: screenCoordinates.y + width * heightOffset
    };

    
    strokeWeight(3);
    rect(
        coordinates.x,
        coordinates.y, 
        length,
        width);
    
    strokeWeight(0.5);
    const step = width / 9;
    for (let tube = step; tube < width; tube += step) {
        line(coordinates.x, coordinates.y + tube, coordinates.x + length, coordinates.y + tube);
    }

    arc(
        coordinates.x, 
        coordinates.y + width * 0.5, 
        2 * ellipseRadius * zoomTimesRatio, 
        width * 7/9, 
        90, 
        270
    );

    arc(
        coordinates.x + length, 
        coordinates.y + width * 0.5, 
        2 * ellipseRadius * zoomTimesRatio, 
        width * 7/9, 
        -90, 
        90
    );
}