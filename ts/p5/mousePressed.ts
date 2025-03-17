import { screenContext } from "../classes/context/ScreenContext";
import { scaleContext } from "../classes/renderable/ScaleContext";
import { roomSelector } from "../classes/selector/RoomSelector";
import { selectionContext } from "../classes/selector/SelectionContext";
import { mouseButton } from "../declarations/declarations";

export function mousePressed(): void {
  if (!screenContext.getControlsAreEnabled()) {
    return;
  }
  
  if (mouseButton === 'right') {
    if (scaleContext.scalingInProgress) {
      scaleContext.addReferencePoint();
    }
    roomSelector.addPoint();
    selectionContext.deselect();
    
  } else if (mouseButton === 'left') {
    screenContext.startDragging();
    selectionContext.searchSelectableObject();
  }
}
