var circleAnimaArr = [];
var circleTimer = false;
var circleTimerInterval = setInterval( ()=>{circleTimer=!circleTimer;},250 );

class Player {
	constructor(){
		this.x = width/2;
		this.y = height/2;
		this.size = size/50;
		this.spd = 1;
		this.img = playerImg;
	}

	draw(){
		// imageMode(CENTER);
		image(this.img, this.x, this.y, this.size*1.5, this.size);
		// noFill();
		// stroke(255);
		// rect(this.x, this.y, this.size*1.5, this.size);
		drawCircleAnima()
		// fill(0,255,0);
		// textSize(this.size);
		// text("^", this.x, this.y-12);
		// text("@", this.x, this.y);
		// text("/", this.x-17, this.y+12);
		// text("\\", this.x+17, this.y+12);
		// text("_", this.x, this.y+7);
		if(!isDead){
			this.move();
		}
	}

	move(){
		if (keyIsDown(68) || keyIsDown(39)) {	// RIGHT
			if(this.x >= width-(this.size*1.5)){
				this.x = width-(this.size*1.5);
				if(circleTimer || circleAnimaArr.length === 0){
					circleAnimaArr.push({x: this.x+(this.size*1.5), y: this.y+(this.size/2), sz: 2, fade: 100});
					circleTimer= false;
				}
			}else{
				this.x += this.spd*gravity;
			}
		}
		if (keyIsDown(65) || keyIsDown(37)) {	// LEFT
			if(this.x <= 0){
				this.x = 0;
				if(circleTimer || circleAnimaArr.length === 0){
					circleAnimaArr.push({x: this.x, y: this.y+(this.size/2), sz: 2, fade: 100});
					circleTimer= false;
				}
			} else {
				this.x -= this.spd*gravity;
			}
		}
		if (keyIsDown(83) || keyIsDown(40)) {	// DOWN
			if(this.y >= height-this.size){
				this.y = height-this.size;
				if(circleTimer || circleAnimaArr.length === 0){
					circleAnimaArr.push({x: this.x+((this.size*1.5)/2), y: this.y+this.size, sz: 2, fade: 100});
					circleTimer= false;
				}
			} else {
				this.y += this.spd*gravity;
			}
		}
		if (keyIsDown(87) || keyIsDown(38)) {	// UP
			if(this.y <= 0){
				this.y = 0;
				if(circleTimer || circleAnimaArr.length === 0){
					circleAnimaArr.push({x: this.x+((this.size*1.5)/2), y: this.y, sz: 2, fade: 100});
					circleTimer= false;
				}
			} else {
				this.y -= this.spd*gravity;
			}
		}
		if (keyIsDown(32)) {	// SPACEBAR
			// SHOOT MAYBE
		}

		if(keyIsPressed){
			gravity < 1.5 ? gravity += 0.01 : gravity = 1.5;
		} else {
			gravity > 0.1 ? gravity -= 0.0175 : gravity = 0.1;
		}
	}


	getX(){
		return this.x;
	}
		setX(x){
			this.x = x;
		}

	getY(){
		return this.y;
	}
		setY(y){
			this.y = y;
		}

	getW(){
		return this.size*1.5;
	}
		setSz(sz){
			this.size = sz;
		}

	getH(){
		return this.size;
	}

	screenResize(){
		var offSetX = this.x/this.size;
		var offSetY = this.y/this.size;

		this.size = size/50;

		this.x = offSetX*this.size;
		this.y = offSetY*this.size;

	}

}


function drawCircleAnima(){
	stroke(0,0,0,0);
	for(var c of circleAnimaArr){
		fill(204, 204, 255, c.fade);
		ellipse(c.x, c.y, c.sz, c.sz);
		c.sz+=0.5;
		c.fade-=0.5;
		if(c.fade < 0){
			arrPop(circleAnimaArr, circleAnimaArr.indexOf(c));
		}
	}
}




window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);