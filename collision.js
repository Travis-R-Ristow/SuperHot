function collision(obj1, player) {
	if(obj1 instanceof Block){
		if ( obj1.getX() + obj1.getW() > player.getX() &&
		     obj1.getX() < player.getX() + player.getW() &&
		     player.getY() + player.getH() > obj1.getY() &&
		     player.getY() < obj1.getY() + obj1.getH() ) {
			return true;
		} else {
			return false;
		}
	} else {
		if ( obj1.x + obj1.size > player.getX() &&
	         obj1.x < player.getX() + player.getW() &&
	         player.getY() + player.getH() > obj1.y &&
	         player.getY() < obj1.y + obj1.size ) {
		    return true;
		} else {
			return false;
		}
	}
}

function collisionSE(star, player) {
	var obj1 = {x: star.x+(star.size/3), y: star.y-(star.size/5), size: (-star.size/1.5)};
	if ( obj1.x + obj1.size > player.getX() &&
	     obj1.x < player.getX() + player.getW() &&
	     player.getY() + player.getH() > obj1.y &&
	     player.getY() < obj1.y + obj1.size ) {
	    return true;
	} else {
		return false;
	}
}