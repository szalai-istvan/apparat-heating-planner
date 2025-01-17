var PANEL_SELECTION_THRESHOLD = 12.5;

var panelSelectionContext = {
    selectedPanelBlock: null,

    selectPanel: function() {
        if (calculateDistance({x: 0, y: 0}, dragContext.offset) > 5) {
            return;
        }

        if (panelInformation.panelBlocks.length === 0) {
            return;
        }

        if (this.selectedPanelBlock) {
            panelDragContext.stopDragging();
            this.selectedPanelBlock
            this.selectedPanelBlock = null;
            return;
        }

        let mousePosition = getMousePosition();
        let adjustedMousePosition = displayContext.calculateAdjustedCenterCoordinates({centerPosition: mousePosition});

        const sortedByDistance = [...panelInformation.panelBlocks].sort((b1, b2) => {
            const d1 = calculateDistance(mousePosition, b1.centerPosition);
            const d2 = calculateDistance(mousePosition, b2.centerPosition);
            if (d1 < d2) {
                return -1;
            }
            return 1;
        });

        const min = sortedByDistance[0];
        const adjustedCenter = displayContext.calculateAdjustedCenterCoordinates(min);

        if (min && (calculateDistance(mousePosition, adjustedCenter) < PANEL_SELECTION_THRESHOLD * displayContext.zoom)) {
            this.selectedPanelBlock = min;
            panelDragContext.startDragging();
        }
    },

    drawSelected: function() {
        if (this.selectedPanelBlock) {
            push();
            stroke('red');
            drawPanelBlock(this.selectedPanelBlock);
            pop();
        }
    },

    offsetCenterPosition: function(offset) {
        this.selectedPanelBlock.centerPosition = {
            x: this.selectedPanelBlock.centerPosition.x + offset.x,
            y: this.selectedPanelBlock.centerPosition.y + offset.y,
        };
    }
};