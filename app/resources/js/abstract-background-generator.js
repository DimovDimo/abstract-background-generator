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
    let luminance = 2000;
    let widthPositionPercentage = 50;
    let heightPositionPercentage = 50;
    let widthPosition = width * widthPositionPercentage / 100;
    let heightPosition = height * heightPositionPercentage / 100;
    let thickness = 0.05;
    let colorNumber = 100;
}

function abstractBackground (widthPosition, heightPosition, size, luminance, thickness, colorNumber) {
    let waves = 7;//between 5 and 15
}