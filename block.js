
class Block{
	constructor(){
		this.x = random(0, width);
		this.y = -size/100;
		this.sz = size/100;
		this.spd = 2;
	}

	draw(){
		rect(this.x, this.y, this.sz, this.sz);
	}


	move(){
		this.y += this.spd*gravity;
		if(collision(this, player)){
			isDead = true;
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
}