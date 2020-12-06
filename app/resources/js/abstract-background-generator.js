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

    let size = Math.max(width, height);
    let luminance = 2000;
    let widthPositionPercentage = 50;
    let heightPositionPercentage = 50;
    let widthPosition = width * widthPositionPercentage / 100;
    let heightPosition = height * heightPositionPercentage / 100;
}