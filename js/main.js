const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const window_height = 300;
const window_width = 500;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.backgroundColor = "#b7f7ed";

const coordinatesDisplay = document.getElementById('coordinatesDisplay'); // Elemento para mostrar las coordenadas

class Circle {
    constructor(x, y, radius, color, text, backcolor, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.backcolor = backcolor;
        this.speed = speed;
        this.dx = 0.02 * this.speed;
        this.dy = 0.02 * this.speed;
    }

    draw(context) {
        // Rellena el objeto
        context.beginPath();
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.backcolor;
        context.fill();
        // Dibuja la línea del objeto
        context.lineWidth = 5;
        context.strokeStyle = this.color;
        context.stroke();
        // Dibuja el texto al centro del objeto
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "bold 20px cursive";
        context.fillStyle = "white";
        context.fillText(this.text, this.posX, this.posY);
        context.closePath();
    }

    update(context) {
        this.draw(context);
        // Si el círculo supera el margen derecho entonces se mueve a la izquierda
        if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
            this.dx = -this.dx;
        }
        // Si el círculo supera el margen superior entonces se mueve hacia abajo
        if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.posX += this.dx;
        this.posY += this.dy;
    }
}

const nCircles = 10;

let circles = [];

for (let i = 0; i < nCircles; i++) {
    let randomRadius = Math.floor(Math.random() * 30 + 20);
    let randomX = Math.random() * window_width;
    let randomY = Math.random() * window_height;
    let randomBackcolor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    let randomStrokecolor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

    randomX = randomX < randomRadius ? randomRadius : randomX > window_width - randomRadius ? window_width - randomRadius : randomX;
    randomY = randomY < randomRadius ? randomRadius : randomY > window_height - randomRadius ? window_height - randomRadius : randomY;

    let miCirculo = new Circle(randomX, randomY, randomRadius, randomStrokecolor, i + 1, randomBackcolor, 2);
    circles.push(miCirculo);
}

function updateCircle() {
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, window_width, window_height);
    circles.forEach((circle) => {
        circle.update(ctx);
    });
    updateCoordinatesDisplay();
}

function updateCoordinatesDisplay() {
    let coordinatesText = circles.map((circle, index) => `Circle ${index + 1}: X=${Math.floor(circle.posX)}, Y=${Math.floor(circle.posY)}`).join('\n');
    coordinatesDisplay.textContent = coordinatesText;
}

updateCircle();
