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
        this.panelBlocks.forEach(panelBlock => this.drawPanelBlock(panelBlock));
    },

    drawPanelBlock: function(panelBlock) {
        const centerPosition = displayContext.adjustCenterCoordinates(panelBlock);

        const topLeftPosition = {
            x: centerPosition.x - 0.5 * panelBlock.dimensions.length * displayContext.zoom,
            y: centerPosition.y - 0.5 * panelBlock.dimensions.width * displayContext.zoom
        };
        const screenCoordinates = displayContext.withDragOffsetAdded(topLeftPosition);

        for (let i = 0; i < panelBlock.pieces; i++) {
            drawPanel(panelBlock, screenCoordinates, i);
        }
    },

    offsetCenterPosition: function(offset) {
        this.panelBlocks.forEach(panelBlock => {
            panelBlock.centerPosition = {
                x: panelBlock.centerPosition.x + offset.x,
                y: panelBlock.centerPosition.y + offset.y,
            };
        });
    }
};

function drawPanel(panelBlock, screenCoordinates, i) {
    const zoomTimesRatio = displayContext.zoom * scalingContext.pixelsPerMetersRatio;
    const length = panelBlock.dimensions.length * zoomTimesRatio;
    const width = panelBlock.dimensions.width * zoomTimesRatio;

    const coordinates = {
        x: screenCoordinates.x, 
        y: screenCoordinates.y + width * i
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
        }
    }
}

var panelTypes = {
    'AP100': {
        length: 1,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP150': {
        length: 1.5,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP200': {
        length: 2,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP250': {
        length: 2.5,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP300': {
        length: 3,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP350': {
        length: 3.5,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP400': {
        length: 4,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP450': {
        length: 4.5,
        width: 0.4,
        tubeAmount: 'todo'
    }
};

for (let type in panelTypes) {
    var option = document.createElement("option");
    option.text = type;
    option.value = type;
    addPanelTypeSelect.appendChild(option);
}