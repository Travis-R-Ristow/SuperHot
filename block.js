
class Block{
	constructor(){
		this.x = random(0, width);
		this.y = -size/100;
		this.sz = size/100;
		this.spd = random(2,5);
	}

	draw(){
		fill(255,0,0);
		rect(this.x, this.y, this.sz, this.sz);
		if(!isDead){
			this.move();
		}
	}


	move(){
		if(!isDead){
			this.y += this.spd*gravity;
			if(collision(this, player)){
				isDead = true;
			}
			// if(this.y > height){
				// this = null;
			// }
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
		return this.sz*1.5;
	}
		setSz(sz){
			this.sz = sz;
		}

	getH(){
		return this.sz;
	}

	screenResize(){
		var offSetX = this.x/this.sz;
		var offSetY = this.y/this.sz;

		this.sz = size/100;

		this.x = offSetX*this.sz;
		this.y = offSetY*this.sz;
	}
}