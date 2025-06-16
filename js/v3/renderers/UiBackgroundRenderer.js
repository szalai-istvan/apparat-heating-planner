let apparatLogo;
let cicisNeni;
let showCicisNeni = false;
let timeoutId = undefined;

class UiBackgroundRenderer {
    
    static drawUiBackground() {
        push();
        fill('lightgrey');
        noStroke();
        rect(0, 0, docSize.vw, TOP_RIBBON_HEIGHT);
        rect(0, TOP_RIBBON_HEIGHT, LEFT_RIBBON_WIDTH, docSize.vh - TOP_RIBBON_HEIGHT);
        stroke(3);
        line(LEFT_RIBBON_WIDTH, TOP_RIBBON_HEIGHT, docSize.vw, TOP_RIBBON_HEIGHT);
        line(LEFT_RIBBON_WIDTH, TOP_RIBBON_HEIGHT, LEFT_RIBBON_WIDTH, docSize.vh);
    
        for (let del of DELIMITER_POSITIONS) {
            line(del.p1.x, del.p1.y, del.p2.x, del.p2.y);
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
            censor();
        }

        pop();
    }
}

let UNCENSOR_BOOBS = false;
function censor() {
    if (!UNCENSOR_BOOBS) {
            push();
            fill('#FF007F');
            star(docSize.vw - 245, 190, 5, 10);
            star(docSize.vw - 270, 200, 5, 10);
            pop();
    }
}

function star(x, y, radius1, radius2) {
  let angle = 72;
  let halfAngle = angle / 2.0;
  beginShape();
  const beginAngle = frameCount * -4;
  for (let a = beginAngle; a < beginAngle + 360; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}