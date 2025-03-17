import { screenContext } from "../classes/context/ScreenContext";

export function mouseReleased(): void {
  screenContext.stopDragging();
}