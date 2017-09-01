var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var wW;
var wH;
var camX = 0;
var camY = 0;
var tiles;
var size = 4;
var sizeX = 256;
var sizeY = 128;
function resize() {
	wW = window.innerWidth;
	wH = window.innerHeight;
	canvas.width = wW;
	canvas.height = wH;
	render();
}
window.addEventListener("resize",resize,false)

var mouse = {
	x: 0,
	y: 0
}
var keyboard = {};
window.addEventListener("mousemove",function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
	console.log(mouse.x,mouse.y);
})
window.addEventListener("click",function (event) {

})
window.addEventListener("keydown",function(event) {
	keyboard[event.key] = true;
})
window.addEventListener("keyup",function(event) {
	keyboard[event.key] = false;
})

resetTiles();
function resetTiles() {
	tiles = [];
	for(var y=0; y<sizeY; y++) {
		var row = [];
		for(var x=0; x<sizeX; x++) {
			if(Math.random()>0.9) {
				row.push(true);
			}	else	{
				row.push(false);
			}
		}
		tiles.push(row);
	}
}

function renderFloor() {
	for(var y=0; y<sizeY; y++) {
		for(var x=0; x<sizeX; x++) {
			c.beginPath();
			c.fillStyle = "#777777";
			c.strokeStyle = "#444444";
			c.rect(x*size,y*size,size,size);
			c.closePath();
			c.fill();
			c.stroke();
		}
	}
}
function renderLight(lightX,lightY,lightR) {
	var edges = [];
	for(var y=0; y<sizeY; y++) {
		for(var x=0; x<sizeX; x++) {
			if(tiles[y][x]) {
				edges.push([[x*size,y*size],[x*size+size,y*size],[x*size+size,y*size+size],[x*size,y*size+size]]);
			}
		}
	}
	for(var i=0; i<edges.length; i++) {
		var tile = edges[i];

		c.fillStyle = "rgba(0, 0, 0, 1)";
		for(var p=0; p<4; p++) {
			var edge = tile[p];
			var x = edge[0];
			var y = edge[1];
			var xoff = (x)-lightX;
			var yoff = (y)-lightY;
			xoff *= lightR;
			yoff *= lightR;

			for(var o=0; o<4; o++) {
				if(o!=p) {
					c.beginPath();
					c.moveTo(x+xoff,y+yoff);
					c.lineTo(x,y);

					var tedge = tile[o];
					var tx = tedge[0];
					var ty = tedge[1];
					var txoff = (tx)-lightX;
					var tyoff = (ty)-lightY;
					txoff *= lightR;
					tyoff *= lightR;

					c.lineTo(tx,ty);
					c.lineTo(tx+txoff,ty+tyoff);
					c.closePath();
					c.fill();
				}
			}

			/*c.strokeStyle = "rgba(0, 0, 0, 0.5)";
			c.lineTo(x,y);
			c.lineTo(x+xoff,y+yoff);
			c.stroke();*/
		}
	}
}
function renderTiles() {
	for(var y=0; y<sizeY; y++) {
		for(var x=0; x<sizeX; x++) {
			if(tiles[y][x]) {
				c.beginPath();
				c.fillStyle = "#999999";
				c.strokeStyle = "#666666";
				c.rect(x*size,y*size,size,size);
				c.closePath();
				c.fill();
				c.stroke();
			}
		}
	}
}
function render() {
	c.fillStyle = "#000000";
	c.fillRect(0,0,wW,wH);

	renderFloor();

	//renderLight(128,128,64);
	renderLight(mouse.x,mouse.y,64);

	renderTiles();
}
function animate() {
	requestAnimationFrame(animate);
	
	render();
}
resize();
animate();