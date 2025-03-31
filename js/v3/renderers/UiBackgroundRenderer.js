let apparatLogo;
let cicisNeni;
let showCicisNeni = false;
let timeoutId = undefined;

class UiBackgroundRenderer {
    
    static drawUiBackground() {
        push();
        fill('lightgrey');
        noStroke();
        rect(0, 0, docSize.vw, 60);
        rect(0, 60, 100, docSize.vh - 60);
        stroke(3);
        line(100, 60, docSize.vw, 60);
        line(100, 60, 100, docSize.vh);
    
        line(450, 0, 450, 60);
    
        if (selectionContext.selectedObject) {
            line(0, 425, 100, 425);
        }

        image(apparatLogo, docSize.vw - 293, 5, 287, 49.5);
        
        const hoverApparat = pointIsInside(screenContext.getMousePosition(), {x: docSize.vw - 293 + 287/2, y: 5 + 49.5/2}, 287, 49.5);
        if (hoverApparat && !timeoutId) {
            timeoutId = setTimeout(() => showCicisNeni = true, 2_000);
        } else if (!hoverApparat && timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = undefined;
            showCicisNeni = false;
        }

        if (showCicisNeni) {
            image(cicisNeni, docSize.vw - 293-38, 48, 316/2, 762/2);
        }

        pop();
    }
}