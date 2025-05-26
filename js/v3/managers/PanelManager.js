class PanelManager {

    static mouseCursorIsInsideText(panel) {
        const width = panel.textWidth;
        const height = panel.widthInPixels * panel.numberOfPanelsInGroup * PANEL_SELECTION_MULTIPLIER;
        return pointIsInside(
            screenContext.getMousePositionAbsolute(),
            PanelManager.getGroupCenterPositionAbsolute(panel),
            panel.alignment ? height : width,
            panel.alignment ? width : height
        );
    }

    static getTopLeftCornerCoordinates(panel, alignment = undefined) {
        alignment = alignment ?? panel.alignment;

        if (alignment === panel.alignment) {
            return panel.topLeftCoordinates;
        }

        const offsetX = (panel.lengthInPixels + panel.widthInPixels * panel.numberOfPanelsInGroup) / 2;
        const offsetY = (panel.widthInPixels * panel.numberOfPanelsInGroup - panel.lengthInPixels) / 2;
        const alignmentMultiplier = -1 * ((-1) ** alignment);

        return {
            x: panel.topLeftCoordinates.x + alignmentMultiplier * offsetX,
            y: panel.topLeftCoordinates.y + alignmentMultiplier * offsetY
        };
    }

    static getGroupCenterPositionAbsolute(panel) {
        const position = panel.topLeftCoordinates;
        if (panel.alignment) {
            return {
                x: position.x - panel.widthInPixels * 0.5 * panel.numberOfPanelsInGroup,
                y: position.y + panel.lengthInPixels * 0.5
            };
        }
        return {
            x: position.x + panel.lengthInPixels * 0.5,
            y: position.y + panel.widthInPixels * 0.5 * panel.numberOfPanelsInGroup
        };
    }

    static mousePositionAsCenterOfPanel(panel) {
        const mousePosition = screenContext.getMousePosition();
        const mousePositionAbsolute = screenContext.getMousePositionAbsolute();

        if (panel.alignment) {
            const xT = panel.widthInPixels * 0.5 * panel.numberOfPanelsInGroup;
            const yT = panel.lengthInPixels / 2;
            const xCorrection = PanelManager.calculateCorrector(LEFT_RIBBON_WIDTH + (PANEL_CORRECTION_OFFSET_NO_PIPE + xT) * screenContext.zoom, mousePosition.x);
            const yCorrection = PanelManager.calculateCorrector(TOP_RIBBON_HEIGHT + (PANEL_CORRECTION_OFFSET_PIPE + yT) * screenContext.zoom, mousePosition.y);
            
            return {
                x: mousePositionAbsolute.x + xT + xCorrection,
                y: mousePositionAbsolute.y - yT + yCorrection
            };
        }

        const xT = panel.lengthInPixels / 2;
        const yT = panel.widthInPixels * 0.5 * panel.numberOfPanelsInGroup
        const xCorrection = PanelManager.calculateCorrector(LEFT_RIBBON_WIDTH + (PANEL_CORRECTION_OFFSET_PIPE + xT) * screenContext.zoom, mousePosition.x);
        const yCorrection = PanelManager.calculateCorrector(TOP_RIBBON_HEIGHT + (PANEL_CORRECTION_OFFSET_NO_PIPE + yT) * screenContext.zoom, mousePosition.y);

        return {
            x: mousePositionAbsolute.x - xT + xCorrection,
            y: mousePositionAbsolute.y - yT + yCorrection
        };
    }

    static rotate(panel) {
        const newAlignment = (panel.alignment + 1) % 2;
        const boundaryPoints = PanelManager.getBoundaryPoints(panel, panel.numberOfPanelsInGroup, newAlignment);
        if (PanelManager.validateBoundaryPoints(panel, boundaryPoints)) {
            if ((!panel.room) || (panel.room && RoomManager.registerRotation(panel.room, panel))) {
                panel.topLeftCoordinates = PanelManager.getTopLeftCornerCoordinates(panel, newAlignment);
                panel.alignment = newAlignment;
                panel.room && RoomManager.recalculateBeams(panel.room);
            }
        } else {
            displayMessage('A forgatás hatására a panelcsoport egy része szobán kívülre kerülne!<br/>Helyezze át, mielőtt elforgatja!');
        }
    }

    static addToGroup(panel) {
        const newGroupNumber = (panel.numberOfPanelsInGroup + 1);
        const boundaryPoints = PanelManager.getBoundaryPoints(panel, newGroupNumber, panel.alignment);
        if (PanelManager.validateBoundaryPoints(panel, boundaryPoints)) {
            panel.numberOfPanelsInGroup = newGroupNumber;
            panel.room && RoomManager.recalculateBeams(panel.room);
        } else {
            displayMessage('Újabb panel hozzáadásának hatására a panelcsoport egy része szobán kívülre kerülne!<br/>Helyezze át, mielőtt hozzáad a csoporthoz!');
        }
    }

    static removeFromGroup(panel) {
        panel.numberOfPanelsInGroup = Math.max(panel.numberOfPanelsInGroup - 1, 1);
        panel.room && RoomManager.recalculateBeams(panel.room);
    }

    static getSizeInPixels(panel) {
        return { length: panel.lengthInPixels, width: panel.widthInPixels };
    }

    static getFirstCenterPositionAbsolute(panel) {
        const position = panel.topLeftCoordinates;
        if (panel.alignment) {
            return {
                x: position.x - panel.widthInPixels * 0.5,
                y: position.y + panel.lengthInPixels * 0.5
            };
        }
        return {
            x: position.x + panel.lengthInPixels * 0.5,
            y: position.y + panel.widthInPixels * 0.5
        };
    }

    static getBoundaryPoints(panel, numberOfPanels = undefined, alignment = undefined) {
        numberOfPanels = numberOfPanels || panel.numberOfPanelsInGroup;
        alignment = alignment ?? panel.alignment;

        const coordinates = panel.isSelectedForDrag ? PanelManager.mousePositionAsCenterOfPanel(panel) : PanelManager.getTopLeftCornerCoordinates(panel, alignment);
        const extraLength = PANEL_TUBE_EXTRA_LENGTH_PER_SIDE * scaleContext.pixelsPerMetersRatio;

        let p1;
        let p2;
        if (!alignment) {
            p1 = {
                x: coordinates.x - extraLength,
                y: coordinates.y
            };
            p2 = {
                x: coordinates.x + panel.lengthInPixels + extraLength,
                y: coordinates.y + panel.widthInPixels * numberOfPanels
            };
        } else {
            p1 = {
                x: coordinates.x,
                y: coordinates.y - extraLength
            };
            p2 = {
                x: coordinates.x - panel.widthInPixels * numberOfPanels,
                y: coordinates.y + panel.lengthInPixels + extraLength
            };
        }
               
        return {p1, p2};
    }

    static setType(panel, type) {
        const ratio = scaleContext.pixelsPerMetersRatio;

        panel.details = panelTypes[type];
        if (!panel.details) {
            throw new Error(`Unknown panel type: ${type}`);
        }
        
        panel.textSize = PANEL_TEXT_SIZE_IN_METERS * ratio;
        if (type === 'F100') {
            panel.textSize /= 2;
        }
        
        panel.type = type;
        textSize(panel.textSize);
        panel.textWidth = textWidth(panel.type);
        panel.topLeftCoordinates = screenContext.getMousePositionAbsolute();
        panel.lengthInPixels = panel.details.length * ratio;
        panel.widthInPixels = panel.details.width * ratio;
    }

    static validateBoundaryPoints(panel, boundaryPoints) {
        if (!panel.room || panel.isSelectedForDrag) {
            return true;
        }
        return RoomManager.pointIsInsideRoom(panel.room, boundaryPoints.p1) && RoomManager.pointIsInsideRoom(panel.room, boundaryPoints.p2);
    }

    static calculateCorrector(lim, coord) {
        return (Math.abs(lim - coord) + lim - coord) / (2 * screenContext.zoom);
    }
}