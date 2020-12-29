let input = document.getElementById("input");
input.addEventListener("change", engine);

engine();

function engine() {
    let width = Number(document.getElementById("width").value);
    let height = Number(document.getElementById("height").value);
    
    let canvas = getCanvas();
    let context = canvas.getContext('2d');

    let luminance = 2000;
    let positionPercentage = 50;
    let size = Math.max(width, height);    
    let widthPosition = getPosition(width);
    let heightPosition = getPosition(height);

    let thickness = randomDouble(0.05, 0.1);
    let waves = randomInteger(5, 15);
    let wavesDistance = randomDouble(0.3, 1);
    let mediumDistance = randomDouble(0.7, 1);
    let corner = randomInteger(200, 2000);
    let space = randomInteger(200, 500);

    generator();

    function getCanvas() {
        let canvas = document.getElementById("background-result");

        canvas.width = width;
        canvas.height = height;

        return canvas;
    }

    function generator() {
        context.clearRect(0, 0, width, height);
        abstractBackground();
    }

    function abstractBackground() {
        let noises = getNoises();
        draw(noises);
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

    function getNoises() {
        let noises = [];

        for (let wave = 0; wave < waves; wave++) {
            let minDistance = getDistance(wave, true);
            let maxDistance = getDistance(wave, false);

            noises[wave] = {
                spaceNoise: getNoise(space, wavesDistance, mediumDistance),
                cornerNoise: getNoise(corner, minDistance, maxDistance)
            };
        }

        return noises;
    }

    function getDistance(wave, isMin) {
        if (isMin) {
            return mediumDistance * (wave - wavesDistance);
        }

        return mediumDistance * (wave + wavesDistance);
    }

    function draw(noises) {
        let arrows = [];
        let colorNumber = randomInteger(0, 360);
        for (lum = 0; lum < luminance; lum++) {
            setArrows(noises, arrows);

            context.beginPath();
            context.moveTo(arrows[0][0], arrows[1][1]);

            let [arrowFirst, arrowSecond, arrowThird] = getArrows();

            for (i = 0; i < waves; i++) {
                bezierCurve(arrows[arrowFirst], arrows[arrowSecond], arrows[arrowThird]);
                [arrowFirst, arrowSecond, arrowThird] = updateArrows(arrowFirst, arrowSecond, arrowThird);
            }

            context.lineWidth = thickness;
            context.strokeStyle = `hsl(${colorNumber}, 100%, 50%)`;
            context.stroke();
        }
    }

    function setArrows(noises, arrows) {
        for (let wave = 0; wave < waves; ++wave) {
            let noise = noises[wave];
            let spaceArrow = getSpace(noise);
            let cornerArrow = noise.cornerNoise();

            arrows[wave] = [
                getSpaceWidth(widthPosition, spaceArrow, cornerArrow),
                getSpaceHeight(heightPosition, spaceArrow, cornerArrow)
            ];
        }
    }

    function getSpace(noise) {
        return (noise.spaceNoise() * size * luminance) / luminance;
    }

    function getSpaceWidth(position, spaceArrow, cornerArrow) {
        return Math.sin(cornerArrow) * spaceArrow + position;
    }

    function getSpaceHeight(position, spaceArrow, cornerArrow) {
        return Math.cos(cornerArrow) * spaceArrow + position;
    }

    function getArrows() {
        let arrowFirst = Math.floor(waves / 4);
        let arrowSecond = Math.floor(waves / 3);
        let arrowThird = Math.floor(waves / 2);

        return [arrowFirst, arrowSecond, arrowThird];
    }

    function updateArrows(arrowFirst, arrowSecond, arrowThird) {
        arrowFirst = updateArrow(arrowFirst);
        arrowSecond = updateArrow(arrowSecond);
        arrowThird = updateArrow(arrowThird);

        return [arrowFirst, arrowSecond, arrowThird];
    }

    function updateArrow(arrow) {
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

    function getPosition(length) {
        return length * positionPercentage / 100;
    }
}