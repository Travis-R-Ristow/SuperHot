// $( document ).ready(() => {
//         var elem = document.documentElement;
//         console.log(elem);
//         if (elem.requestFullscreen) {
//             elem.requestFullscreen();
//         } else if (elem.mozRequestFullScreen) { /* Firefox */
//             elem.mozRequestFullScreen();
//         } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
//             elem.webkitRequestFullscreen();
//         } else if (elem.msRequestFullscreen) { /* IE/Edge */
//             elem.msRequestFullscreen();
//         }
// });


function setup() {
	size = windowWidth/1.2;
	aspectRatio = (displayWidth) / (displayHeight);
    createCanvas(size, (size/aspectRatio)).parent('game');
    textAlign(CENTER);

    //   SCENE   \\
    IamGOD();

    //   PLAYER   \\
    player = new Player();
    // setInterval(() => {
    //     cubeArr.push(new Block());
    // }, 100);
    var rando = random(15000,25000);
    setInterval(() => {
        addPowerUp();
        rando = random(15000,25000);
    }, rando);

    powerUp = {
        x: random(size/50, width-size/50),
        y: random(size/50, height-size/50),
        size: size/150,
        arr: [],
        type: 'none'
        // type: 'DoublePoints'
        // type: 'StarEater'
        // type: 'SpeedBooster'
    }
}



function draw() {
    //   SCENE   \\
        IamGOD();
    background(0);
    starFall();
    player.draw();
    drawCubes();
    drawScore();
    if(isDead){
        textAlign(CENTER);
        fill(255);
        textSize(size/10);
        text("Game Over", width/2, height/1.75);
    } else {
        runTimers();
        powerUps();
    }

}


function powerUps(){
    if(powerUp.type == 'DoublePoints'){    // GREEN
        for(var p of powerUp.arr){
            fill(102, 255, 51, p.fade);
            ellipseMode(CENTER);
            ellipse(powerUp.x+(powerUp.size/2), powerUp.y+(powerUp.size/2), p.size, p.size);
            p.size++;
            if(p.fade > 0){
                p.fade--;
            } else {
                arrPop(powerUp.arr, powerUp.arr.indexOf(p));
            }
        }
        fill(102, 255, 51);
        ellipseMode(CORNER);
        ellipse(powerUp.x, powerUp.y, powerUp.size, powerUp.size);
        if(collision(powerUp, player)) {
            powerUp.type = 'none';
            currentPower = 'DoublePoints';
            setTimeout(() => {
                currentPower = false;
            },5000);
        }
        powerUpTimer--;

    } else if(powerUp.type == 'StarEater'){    // GOLD
        for(var p of powerUp.arr){
            fill(255, 215, 0, p.fade)
            ellipseMode(CENTER);
            ellipse(powerUp.x+(powerUp.size/2), powerUp.y+(powerUp.size/2), p.size, p.size);
            p.size++;
            if(p.fade > 0){
                p.fade--;
            } else {
               arrPop(powerUp.arr, powerUp.arr.indexOf(p))
            }
        }
        fill(255, 215, 0);
        ellipseMode(CORNER);
        ellipse(powerUp.x, powerUp.y, powerUp.size, powerUp.size);
        if(collision(powerUp, player)) {
            powerUp.type = 'none';
            currentPower = 'StarEater';
            setTimeout(() => {
                currentPower = false;
            },5000);
        }
        powerUpTimer--;
    } else if(powerUp.type == 'SpeedBooster'){    // BLUE
        for(var p of powerUp.arr){
            fill(51, 153, 255, p.fade);
            ellipseMode(CENTER);
            ellipse(powerUp.x+(powerUp.size/2), powerUp.y+(powerUp.size/2), p.size, p.size);
            p.size++;
            if(p.fade > 0){
                p.fade--;
            } else {
               arrPop(powerUp.arr, powerUp.arr.indexOf(p))
            }
        }
        fill(51, 153, 255);
        ellipseMode(CORNER);
        ellipse(powerUp.x, powerUp.y, powerUp.size, powerUp.size);
        if(collision(powerUp, player)) {
            powerUp.type = 'none';
            currentPower = 'SpeedBooster';
            setTimeout(() => {
                currentPower = false;
            },5000);
        }
        powerUpTimer--;
    }

    if (powerUpTimer < 0) {
        powerUpTimer = 25;
        powerUp.arr.push({
            size: 0,
            fade: 100
        });
    }
}


function addPowerUp() {
    if (powerUp.type == 'none') {
        powerUp.x = random(size/50, width-size/50);
        powerUp.y = random(size/50, height-size/50);
        var rando = floor(random(3));
        if(rando == 0){
            powerUp.type = 'DoublePoints';
        }else if(rando == 1){
            powerUp.type = 'StarEater';
        }else if(rando == 2){
            powerUp.type = 'SpeedBooster';
        }
    }
}


function drawCubes(){
    for(var cube of cubeArr){
         cube.draw();
         if(cube.getY() > height){
             arrPop(cubeArr, cubeArr.indexOf(cube));
            if(currentPower=='DoublePoints'){
                score++;
            }
            score++;
         }
    }
}


    //  ~  SCENE   ~  \\
    //  ~  SCENE   ~  \\
function IamGOD(){  // CREATS STARS
    while(starsArr.length < size/15){
        starsArr.push(
            {
                x: random(width),
                y: random(height)*-1,
                size: size/75,
                speed: random(0.5)
            }
        );
    }
}


function starFall(){
    for (var star of starsArr) {
        textSize(star.size);
        fill(255);
        text('*', star.x, star.y);
        // noFill();
        // stroke(255);
        // rect(star.x+(star.size/3),star.y-(star.size/5), (-star.size/1.5), (-star.size/1.5))
        if(!isDead){
            star.y += star.speed*gravity;
        } else {
            star.y += star.speed*0.05;
        }
        if(star.y > height+star.size){
            star.y = -star.size;
            star.x = random(width);
        }

        if(currentPower=='StarEater'){
            if(collisionSE(star, player)){
                score++;
                arrPop(starsArr, starsArr.indexOf(star));
            }
        }
    }
}


function drawScore() {
    textSize(size/40);
    fill(255)
    text(floor(score), width-size/20,size/40);

    if (currentPower == 'DoublePoints') {
        text('DoublePoints', size/10,size/40);
    }
    if (currentPower == 'StarEater') {
        text('StarEater', size/10,size/40);
    }
    if (currentPower == 'SpeedBooster') {
        text('SpeedBooster', size/10,size/40);
    }
}


function runTimers() {
    if(cubeTimer > 10){
        cubeArr.push(new Block());
        cubeTimer = 0;
        // score += gravity;
    }
    cubeTimer += gravity;
}



function windowResized() {
  size = windowWidth/1.2;
    aspectRatio = (displayWidth) / (displayHeight);
  resizeCanvas(size, (size/aspectRatio));

    player.screenResize();
    for (var star of starsArr) {
        var offSetX = star.x/star.size;
        var offSetY = star.y/star.size;
        star.size = size/75;
        star.x = offSetX*star.size;
        star.y = offSetY*star.size;
    }

    for(var cube of cubeArr){
        cube.screenResize();
    }
}


/* View in fullscreen */
function openFullscreen() {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}