import { scalingDialog, scalingDialogConfirm, showScalingDialog } from "../../buttons/scaleButton";
import { line } from "../../declarations/declarations";
import { displayErrorMessage } from "../../helpers/errordialog";
import { calculateDistance } from "../../helpers/helpers";
import { Coordinates, Renderable } from "../../types/types";
import { screenContext } from "../context/ScreenContext";
import { renderer } from "../Renderer";
import { roomSelector } from "../selector/RoomSelector";
import { tooltip } from "./Tooltip";

export class ScaleContext implements Renderable {
    public scalingInProgress: boolean = false;
    public pixelsPerMetersRatio: number | null = null;
    private firstPoint: Coordinates | null = null;
    private secondPoint: Coordinates | null = null;
    private referenceLength: number | null = null;

    constructor() {
        renderer.register(this);
    }

    public render(): void {
        const scalingInProgress = this.scalingInProgress;
        if (!scalingInProgress) {
            return;
        }

        const firstPoint = this.firstPoint;
        const secondPoint = this.secondPoint;

        if (!firstPoint) {
            return;
        }

        if (secondPoint) {
            line(firstPoint.x, firstPoint.y, secondPoint.x, secondPoint.y);
        } else {
            const mousePosition = screenContext.getMousePositionAbsolute();
            line(firstPoint.x, firstPoint.y, mousePosition.x, mousePosition.y);
        }
        
    }

    public startScaling(): void {
        if (!roomSelector.thereAreRooms()) {
            this.scalingInProgress = true;
            this.clear();
            tooltip.scalingStarted();
        } else {
            scalingDialogConfirm.showModal();
            screenContext.disableControls();
        }
    }

    public addReferencePoint(): void {
        const point = screenContext.getMousePositionAbsolute();
        if (!this.firstPoint) {
            this.firstPoint = point;
            tooltip.firstReferencePointAdded();
        } else if (!this.secondPoint) {
            this.secondPoint = point;
            tooltip.clearCursorTooltip();
            showScalingDialog();
        }
    }

    public processScalingValue(scalingValue: number | string): void {
        const firstPoint = this.firstPoint;
        const secondPoint = this.secondPoint;

        const scalingValueNumber = Number(scalingValue);
        if (scalingValueNumber > 0) {
            this.referenceLength = scalingValueNumber;
            this.scalingInProgress = false;
            if (firstPoint && secondPoint) {
                const referencePointDistance = calculateDistance(firstPoint, secondPoint);
                this.pixelsPerMetersRatio = referencePointDistance / this.referenceLength;    
            }
            
            scalingDialog.close();
            screenContext.enableControls();
            tooltip.scalingFinished();
        } else {
            displayErrorMessage('Érvénytelen méretarány. Csak pozitív szám adható meg!');
        }
    }

    public ratioIsSet(): boolean {
        return Boolean(this.pixelsPerMetersRatio);
    }
    
    public clear(): void {
        this.firstPoint = null;
        this.secondPoint = null;
        this.pixelsPerMetersRatio = null;
        roomSelector.clear();
    }

}

export const scaleContext = new ScaleContext();