function randomColor() {

    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const [min, max] = [0, 255];
    let r = randomNum(min, max),
        g = randomNum(min, max),
        b = randomNum(min, max);

    return color = `rgb(${r},${g},${b})`
}



const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
document.body.style.margin = 0;

var height = canvas.height = window.innerHeight,
    width = canvas.width = window.innerWidth,
    ctx = canvas.getContext('2d');


function createPlane() {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.setLineDash([1, 1]);
    ctx.moveTo(width, height / 2)
    ctx.lineTo(0, height / 2)
    ctx.moveTo(width / 2, height)
    ctx.lineTo(width / 2, 0)
    ctx.stroke();
    ctx.closePath()


    let quantity = 5;
    let distance = ((height / 2) / quantity);
    let line = 0;
    let heightt = 0;

    for (let i = 0; i < quantity * 2; i++) {

        ctx.lineWidth = 4;
        ctx.strokeStyle = "#ff00006b";
        ctx.beginPath();
        ctx.setLineDash([0, 0]);
        ctx.moveTo((width / 2) - 10, heightt + line);
        ctx.lineTo((width / 2) + 10, line);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.setLineDash([0, 0]);
        ctx.fillRect((width / 2) + 15, (heightt + line) - 2.5, 5, 5);
        ctx.closePath();

        line += distance;
    }

    let quantityX = 10;
    let distanceX = (width / 2) / quantityX;
    let lineX = 0;
    let widthh = 0;

    for (let i = 0; i < quantityX * 2; i++) {

        ctx.lineWidth = 4;
        ctx.strokeStyle = "#ff00006b";
        ctx.beginPath();
        ctx.moveTo(widthh + lineX, (height / 2) - 10);
        ctx.lineTo(lineX, (height / 2) + 10);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillText(1, (widthh + lineX) - 2.5, (height / 2) + 25)
        ctx.closePath();

        lineX += distanceX;
    }


    // se crea el circulo del centro
    var color = "#ff00006b",
        size = 50,
        x = (width / 2),
        y = (height / 2);

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.arc(x, y, size, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.closePath();
}

function mouseLocation(clientX, clientY) {

    let y = (height / 2) - clientY,
        x = clientX - (width / 2);

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillText(`X:${x}px, Y:${y}px`, clientX - 20, clientY + -10)
    ctx.closePath();
}


createPlane()

let startX = null,
    startY = null,
    endX = 0,
    endY = 0,
    vectors = [],
    color = 'red';

function helpLines(pageX, pageY) {

    // linea de ayuda que se ubica al inicio de cada eje
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ff00006b";
    ctx.beginPath();
    ctx.setLineDash([5, 7]);
    ctx.moveTo(pageX, pageY);
    ctx.lineTo(pageX, height / 2);
    ctx.moveTo(pageX, pageY);
    ctx.lineTo(width / 2, pageY);
    ctx.stroke();
    ctx.closePath();

    // linea de ayuda para hacer las rectas derechas
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ff00006b";
    ctx.beginPath();
    ctx.setLineDash([5, 15]);
    ctx.moveTo(startX, 0);
    ctx.lineTo(startX, height);
    ctx.moveTo(0, startY);
    ctx.lineTo(width, startY);
    ctx.stroke();
    ctx.closePath();
}

window.addEventListener('mousedown', draw);
function draw({ pageX, pageY }) {
    startX = pageX;
    startY = pageY;
    color = randomColor(0, 255);
    helpLines(pageX, pageY);
    drawTo();
}

function drawTo() {
    window.addEventListener('mousemove', mouseMoveDraw)
}

function mouseMoveDraw({ pageX, pageY }) {

    ctx.clearRect(0, 0, width, height);
    drawVectors();
    helpLines(pageX, pageY);
    // segmento de recta dibujado por el cliente
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.setLineDash([0, 0]);
    ctx.moveTo(startX, startY);
    ctx.lineTo(pageX, pageY);
    ctx.stroke();
    ctx.closePath();

    // se crea el plano para actualizar el render del dom y se ubican las medidas de cada coordenada
    createPlane();
    mouseLocation(startX, startY);
    mouseLocation(pageX, pageY);

}


window.addEventListener('mouseup', ({ pageX, pageY }) => {
    removeListeners();
    const vector = {
        startX, startY,
        endX: pageX,
        endY: pageY,
        color: color,
    }
    vectors.push(vector);
})

function removeListeners() {
    window.removeEventListener('mousemove', mouseMoveDraw)
}

function drawVectors() {
    for (const { startX, startY, endX, endY, color } of vectors) {
        ctx.lineWidth = 4;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.setLineDash([0, 0]);
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.closePath();
    }
}

window.addEventListener('mousemove', function ({ pageX, pageY }) {

    ctx.clearRect(0, 0, width, height);
    drawVectors();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(pageX, pageY);
    ctx.setLineDash([5, 15]);
    ctx.lineTo(pageX, height / 2);
    ctx.moveTo(pageX, pageY);
    ctx.lineTo(width / 2, pageY);
    ctx.stroke();
    ctx.closePath();

    mouseLocation(pageX, pageY);
    createPlane();
})
