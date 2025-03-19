class PanelSelector {

    static select(panel) {
        panel.isSelected = true;
    }

    static selectForDrag(panel) {
        panel.isSelectedForDrag = true;
        panel.room && panel.room.removePanelFromRoom(panel);
        panel.room = undefined;
    }

    static tryToDeselect(panel) {
        if (panel.isSelectedForDrag) {
            panel.topLeftCoordinates = panel.mousePositionAsCenterOfPanel();
        }

        const destinationRoom = roomContext.registerRelocatedPanelGroupAndReturnContainingRoom(panel);
        if (!destinationRoom) {
            return false;
        }
        panel.room = destinationRoom;

        panel.isSelected = false;
        panel.isSelectedForDrag = false;

        return true;
    }

    static remove(panel) {
        renderer.remove(panel);
        panel.room && panel.room.removePanelFromRoom(panel);
        panel.room = undefined;
    }
}