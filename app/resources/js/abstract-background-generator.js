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
    let luminance = randomInteger(1000, 2000);
    let widthPositionPercentage = 50;
    let heightPositionPercentage = 50;
    let widthPosition = width * widthPositionPercentage / 100;
    let heightPosition = height * heightPositionPercentage / 100;
    let thickness = randomDouble(0.05, 0.1);
    let colorNumber = randomInteger(0, 360);

    abstractBackground(widthPosition, heightPosition, size, luminance, thickness, colorNumber);
}

function abstractBackground(widthPosition, heightPosition, size, luminance, thickness, colorNumber) {
    let waves = randomInteger(5, 15);
    let wavesDistance = randomDouble(0.3, 1);
    let mediumDistance = randomDouble(0.7, 1);
    let corner = randomInteger(200, 2000);
    let space = randomInteger(200, 500);

    let noises = getNoises(waves, space, wavesDistance, mediumDistance, corner);
    draw(luminance, waves, noises, size, widthPosition, heightPosition, thickness, colorNumber);
}

function randomDouble(min, max) {
    return min + Math.random() * (max - min);
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNoise(epoch, min, max) {
    let rise = randomDouble(0.5, 1.5) / epoch;
    let offset = Math.random();
    let before = randomDouble(min, max);
    let next = randomDouble(min, max);

    let noise = function () {
        offset = offset + rise;
        return offset * next + rise * before;
    }

    return noise;
}

function getNoises(waves, space, wavesDistance, mediumDistance, corner) {
    let noises = [];

    for (let wave = 0; wave < waves; wave++) {
        let minDistance = getDistance(mediumDistance, wave, wavesDistance, true);
        let maxDistance = getDistance(mediumDistance, wave, wavesDistance, false);

        noises[wave] = {
            spaceNoise: getNoise(space, wavesDistance, mediumDistance),
            cornerNoise: getNoise(corner, minDistance, maxDistance)
        };
    }

    return noises;
}

function getDistance(mediumDistance, wave, wavesDistance, isMin) {
    if (isMin) {
        return mediumDistance * (wave - wavesDistance);
    }

    return mediumDistance * (wave + wavesDistance);
}

function draw(luminance, waves, noises, size, widthPosition, heightPosition, thickness, colorNumber) {
    let arrows = [];
    for (lum = 0; lum < luminance; lum++) {
        setArrows(waves, noises, size, luminance, arrows, widthPosition, heightPosition);

        context.beginPath();
        context.moveTo(arrows[0][0], arrows[1][1]);

        let [arrowFirst, arrowSecond, arrowThird] = getArrows(waves);

        for (i = 0; i < waves; i++) {
            bezierCurve(arrows[arrowFirst], arrows[arrowSecond], arrows[arrowThird]);
            [arrowFirst, arrowSecond, arrowThird] = updateArrows(arrowFirst, arrowSecond, arrowThird, waves);
        }

        context.lineWidth = thickness;
        context.strokeStyle = `hsl(${colorNumber}, 100%, 50%)`;
        context.stroke();
    }
}

function setArrows(waves, noises, size, luminance, arrows, widthPosition, heightPosition) {
    for (let wave = 0; wave < waves; ++wave) {
        let noise = noises[wave];
        let space = getSpace(noise, size, luminance);
        let corner = noise.cornerNoise();

        arrows[wave] = [getSpaceWidth(widthPosition, space, corner), getSpaceHeight(heightPosition, space, corner)];
    }
}

function getSpace(noise, size, luminance) {
    return (noise.spaceNoise() * size * luminance) / luminance;
}

function getSpaceWidth(widthPosition, space, corner) {
    return Math.sin(corner) * space + widthPosition;
}

function getSpaceHeight(heightPosition, space, corner) {
    return Math.cos(corner) * space + heightPosition;
}

function getArrows(waves) {
    let arrowFirst = Math.floor(waves / 4);
    let arrowSecond = Math.floor(waves / 3);
    let arrowThird = Math.floor(waves / 2);

    return [arrowFirst, arrowSecond, arrowThird];
}

function updateArrows(arrowFirst, arrowSecond, arrowThird, waves) {
    arrowFirst = updateArrow(arrowFirst, waves);
    arrowSecond = updateArrow(arrowSecond, waves);
    arrowThird = updateArrow(arrowThird, waves);

    return [arrowFirst, arrowSecond, arrowThird];
}

function updateArrow(arrow, waves) {
    arrow = arrow + 1;
    if (arrow >= waves) {
        return arrow -= waves;
    }

    return arrow;
}

function bezierCurve(arrowFirst, arrowSecond, arrowThird) {
    context.bezierCurveTo(
        arrowFirst[0], arrowFirst[1],
        arrowSecond[0], arrowSecond[1],
        arrowThird[0], arrowThird[1]
    );
}