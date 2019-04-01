


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
}



function draw() {
    background(0);
    starFall();
    player.draw();
    drawCubes();
    drawScore();
    if(isDead){
        textAlign(CENTER);
        fill(255,0,0);
        textSize(size/10);
        text("Game Over", width/2, height/1.75);
    } else {
        runTimers();
        score += gravity;
    }

}


function drawCubes(){
    for(var cube of cubeArr){
         cube.draw();
         if(cube.getY() > height){
             arrPop(cubeArr, cubeArr.indexOf(cube));
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

