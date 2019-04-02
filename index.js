


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
    setInterval(() => {
        powerUpArr.push({
        x: 400,
        y: 400,
        size: 1,
        fade: 150
    });
    }, 500);

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
        powerUps()
    }

}


function powerUps(){
    for(var p of powerUpArr){
        fill(51, 153, 255, p.fade)
        ellipse(p.x, p.y, p.size, p.size);
        p.size+=0.5;
        if(p.fade > 0){
            p.fade--;
        } else {
            arrPop(powerUpArr, powerUpArr.indexOf(p));
        }
    }
}



function drawCubes(){
    for(var cube of cubeArr){
         cube.draw();
         if(cube.getY() > height){
             arrPop(cubeArr, cubeArr.indexOf(cube));
             score ++;
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
        if(!isDead){
            star.y += star.speed*gravity;
        } else {
            star.y += star.speed*0.05;
        }
        if(star.y > height+star.size){
            star.y = -star.size;
            star.x = random(width);
        }

        if(score > 300){
            if(collision(star, player)){
                score++;
                arrPop(starsArr, starsArr.indexOf(star))
            }
        }
    }
}


function drawScore() {
    textSize(size/40);
    fill(255)
    text(floor(score), size/10,size/25);
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

