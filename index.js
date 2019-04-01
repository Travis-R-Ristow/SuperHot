


function setup() {
	size = windowWidth/1.2;
	aspectRatio = (displayWidth) / (displayHeight);
    createCanvas(size, (size/aspectRatio)).parent('game');
    textAlign(CENTER);

    //   SCENE   \\
    IamGOD();

    //   PLAYER   \\
    player = new Player();
    cube = new Block();
}


var cube;

function draw() {
  background(0);
  starFall();
  player.draw();
  player.move();

  cube.draw();
  cube.move();
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
                speed: 0.5
            }
        );
    }
}


function starFall(){
    for (var star of starsArr) {
        textSize(star.size);
        fill(255);
        text('*', star.x, star.y);
        star.y += star.speed*gravity;
        if(star.y > height+star.size){
            star.y = -star.size;
            star.x = random(width);
        }
    }
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
}

