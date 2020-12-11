let speed = 1000;

let width = 1000;
let height = 1000;

let canvas = document.getElementById("background-result");
let context = canvas.getContext('2d');

canvas.width = width;
canvas.height = height;

canvas.addEventListener("click", generator);
generator();

function generator() {
    context.clearRect(0, 0, width, height);

    let size = 500; //Math.max(width, height);
    let luminance = randomInteger(1000, 2000);
    let widthPositionPercentage = 50;
    let heightPositionPercentage = 50;
    let widthPosition = width * widthPositionPercentage / 100;
    let heightPosition = height * heightPositionPercentage / 100;
    let thickness = randomDouble(0.05, 0.1);
    let colorNumber = randomInteger(0, 250);
}

function abstractBackground(widthPosition, heightPosition, size, luminance, thickness, colorNumber) {
    let waves = randomInteger(5, 15);
    let mediumDistance = randomDouble(0.7, 1);
}

function randomDouble(min, max) {
    return min + Math.random() * (max - min);
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}