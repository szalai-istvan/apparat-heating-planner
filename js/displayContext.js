const zoomStep = 1.1;
const minimumZoom = 0.1;

var displayContext = {
    zoom: 1,

    zoomIn: function() {
        this.zoom *= zoomStep;
    },

    zoomOut: function() {
        this.zoom = Math.max(minimumZoom, this.zoom / zoomStep);
    },

    withDragOffsetAdded: function(coordinates) {
        return {
            x: coordinates.x + dragContext.offset.x * displayContext.zoom,
            y: coordinates.y + dragContext.offset.y * displayContext.zoom
        };
    },

    calculateAdjustedCenterCoordinates: function(obj) {
        const canvasCenter = {x: canvas.width / 2, y: canvas.height / 2};
        const objCenter = obj.centerPosition;

        const difference = {
            x: objCenter.x - canvasCenter.x,
            y: objCenter.y - canvasCenter.y
        };
        
        return {
            x: canvasCenter.x + difference.x * this.zoom,
            y: canvasCenter.y + difference.y * this.zoom
        };
    }
};