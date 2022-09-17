let rows = 20;
let snakeBody = [];
let blockSize = 400;
let snakeheadP = 110;
let direction = 'up';
let foodP;
let speed = 2000;
let gameOver = false;
let container = document.querySelector(".container");
let boxes = container.getElementsByTagName('div');
window.onload = function() {

    placeFood();
    boxes[snakeheadP].classList.add('head');
    document.addEventListener("keydown", changeDirection);

    setInterval(update, speed/10);
}

function update() {
    if (gameOver) {
        return;
    }

    boxes[snakeheadP].classList.remove('head');
    for (let i = 0; i < snakeBody.length; i++){
        boxes[snakeBody[i]].classList.remove('body');
    }

    var temp = snakeheadP;
    if (direction == 'up'){
        snakeheadP -= rows;
    } 
    else if (direction == 'left'){
        snakeheadP -= 1;
    }
    else if (direction == 'right'){
        snakeheadP += 1;
    }
    else {
        snakeheadP += rows;
    }

    if (snakeheadP < 0 || snakeheadP > (blockSize - 1) || (snakeheadP % rows == 0 && temp % rows == 19) || (snakeheadP % rows == 19 && temp % rows == 0)){
        gameOver = true;
        alert("Game Over");
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeheadP == snakeBody[i]) {
            gameOver = true;
            alert("Game Over");
        }
    }


    if (foodP == snakeheadP) {
        boxes[foodP].classList.remove('food');
        snakeBody.push(temp);
        placeFood();
    }
    else if(snakeBody.length > 0){
        snakeBody.shift();
        snakeBody.push(temp);
    }

    boxes[snakeheadP].classList.add('head');
    for (let i = 0; i < snakeBody.length; i++){
        boxes[snakeBody[i]].classList.add('body');
    }

    speed = 2000;
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && direction != 'down' && direction != 'up') {
        direction = 'up';
        update();
        speed = speed * 2;
    }
    else if (e.code == "ArrowDown" && direction != 'up' && direction != 'down') {
        direction = 'down';
        update();
        speed = speed * 2;
    }
    else if (e.code == "ArrowLeft" && direction != 'right' && direction != 'left') {
        direction = 'left';
        update();
        speed = speed * 2;
    }
    else if (e.code == "ArrowRight" && direction != 'left' && direction != 'right') {
        direction = 'right';
        update();
        speed = speed * 2;
    }
}


function placeFood() {
    
    foodP = Math.floor(Math.random() * blockSize);
    boxes[foodP].classList.add('food');
}