setTimeout(
    () => document.getElementById(startScaling).addEventListener('click', startScalingFunc),
    1_000
);

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
            
            while (!this.referenceLength > 0) {
                const referenceLength = prompt('Adja meg a kijelölt szakasz hosszát, méter mértékegységben:');
                this.referenceLength = Number(referenceLength.replace(",", "."));
            }
            this.scalingInProgress = false;

            const referencePointDistance = distance(this.referencePoints.beginning, this.referencePoints.end);
            this.pixelsPerMetersRatio = referencePointDistance / this.referenceLength / displayContext.zoom;
        }
    },

    draw: function() {
        if (!this.scalingInProgress) {
            return;
        }

        const beginningPoint = this.referencePoints.beginning;
        if (!beginningPoint.set) {
            return;
        }

        line(beginningPoint.x, beginningPoint.y, mouseX, mouseY);
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