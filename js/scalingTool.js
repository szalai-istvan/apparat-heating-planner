startScaling.addEventListener('click', startScalingFunc);

var scalingContext = {
    scalingInProgress: false,
    referencePoints: {},
    referenceLength: null,
    pixelsPerMetersRatio: null,
    addReferencePoint: function() {
        const referencePoint = {
            x: mouseX,
            y: mouseY,
            set: true
        };

        if (!this.referencePoints.beginning.set) {
            this.referencePoints.beginning = referencePoint;
        } else if (!this.referencePoints.end.set) {
            this.referencePoints.end = referencePoint;
            showScalingDialog();
        }
    },

    draw: function() {
        if (!this.scalingInProgress) {
            return;
        }

        const beginningPoint = this.referencePoints.beginning;
        const endPoint = this.referencePoints.end;
        if (!beginningPoint.set) {
            return;
        }
        
        if (!endPoint.set) {
            line(beginningPoint.x, beginningPoint.y, mouseX, mouseY);
        } else {
            line(beginningPoint.x, beginningPoint.y, endPoint.x, endPoint.y);
        }
    },

    processScalingValue: function(scalingValue) {
        const scalingValueNumber = Number(scalingValue);
        if (scalingValueNumber > 0) {
            this.referenceLength = scalingValueNumber;
            this.scalingInProgress = false;
            const referencePointDistance = distance(this.referencePoints.beginning, this.referencePoints.end);
            scalingContext.pixelsPerMetersRatio = referencePointDistance / this.referenceLength / displayContext.zoom;
            scalingDialog.close();
        } else {
            displayErrorMessage('Érvénytelen méretarány. Csak pozitív szám adható meg!');
        }
    }
};

function startScalingFunc() {
    scalingContext.scalingInProgress = true;
    scalingContext.referenceLength = null;
    scalingContext.pixelsPerMetersRatio = null;
    scalingContext.referencePoints = {
        beginning: {
            x: 0,
            y: 0,
            set: false
        },
        end: {
            x: 0,
            y: 0,
            set: false
        }
    };
}