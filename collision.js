function collision(obj1, player) {
	if(obj1 instanceof Block){
		if ( obj1.getX() + obj1.getW() > player.getX()+size/200 &&
		     obj1.getX() < player.getX() + player.getW()-size/200 &&
		     player.getY() + player.getH()-size/200 > obj1.getY() &&
		     player.getY()+size/200 < obj1.getY() + obj1.getH() ) {
			return true;
		} else {
			return false;
		}
	} else {
		if ( obj1.x + obj1.size > player.getX()+size/200 &&
	         obj1.x < player.getX() + player.getW()-size/200 &&
	         player.getY() + player.getH()-size/200 > obj1.y &&
	         player.getY()+size/200 < obj1.y + obj1.size ) {
		    return true;
		} else {
			return false;
		}
	}
}