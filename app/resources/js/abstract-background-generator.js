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
    //TODO
}