const zoomStep = 1.1;

var displayContext = {
    zoom: 1,

    zoomIn: function() {
        this.zoom *= zoomStep;
    },

    zoomOut: function() {
        this.zoom = Math.max(zoomStep, this.zoom / zoomStep);
    },

    withDragOffsetAdded: function(coordinates) {
        return {
            x: coordinates.x + dragContext.offset.x,
            y: coordinates.y + dragContext.offset.y
        };
    }
};


var dragContext = {
    dragStartPosition: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    drag: false,

    startDragging: function() {
        this.drag = true;
        this.dragStartPosition.x = mouseX;
        this.dragStartPosition.y = mouseY;
    },

    stopDragging: function() {
        this.drag = false;
        this.dragStartPosition.x = 0;
        this.dragStartPosition.y = 0;
        
        blueprintImageData.offsetCenterPosition(this.offset);
        panelInformation.offsetCenterPosition(this.offset);
        
        this.offset = {x: 0, y: 0};
    },

    recalculateDragOffset: function() {
        if (this.drag) {
            this.offset = {
                x: mouseX - this.dragStartPosition.x, 
                y: mouseY - this.dragStartPosition.y
            };
        }
    }
};