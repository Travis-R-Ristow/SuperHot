// //	GLOBAL VARIABLES	\\
// width - gets canvas.width
// height - gets canvas.height
// frameCount - gets canvas.frameCount
var aspectRatio;
var size;

var gravity = 0.1;

var starsArr = [];

var player;
var playerImg;

var isDead = false;

function preload() {
	playerImg = loadImage("http://d14nx13ylsx7x8.cloudfront.net/repo_assets/assets/000/031/172/original/spaceship.png");
}