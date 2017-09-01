var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var wW;
var wH;
var camX = 0;
var camY = 0;
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
function shadowCast(lightX,lightY,lightR,edgeX,edgeY) {
	var xoff = edgeX-lightX;
	var yoff = edgeY-lightY;
	xoff *= lightR;
	yoff *= lightR;
	return [edgeX+xoff,edgeY+yoff];
}
function renderLight(lightX,lightY,lightR) {
	var edges = [];
	for(var y=0; y<sizeY; y++) {
		for(var x=0; x<sizeX; x++) {
			if(tiles[y][x]) {
				var tile = [];
				tile.push([x*size,y*size]);
				tile.push([x*size+size,y*size]);
				tile.push([x*size+size,y*size+size]);
				tile.push([x*size,y*size+size]);

				tile.push(shadowCast(lightX,lightY,lightR,[x*size,y*size]))
				tile.push(shadowCast(lightX,lightY,lightR,[x*size+size,y*size]))
				tile.push(shadowCast(lightX,lightY,lightR,[x*size+size,y*size+size]))
				tile.push(shadowCast(lightX,lightY,lightR,[x*size,y*size+size]))
				edges.push(tile);
			}
		}
	}
	console.log(edges);
	for(var i=0; i<edges.length; i++) {
		var tile = edges[i];

		c.fillStyle = "rgba(0, 0, 0, 1)";
		for(var p=0; p<4; p++) {
			var edge = tile[p];
			var edgeCast = tile[p+4]

			for(var o=0; o<4; o++) {//o=p!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				if(o!=p) {
					c.beginPath();
					c.moveTo(edgeCast[0],edgeCast[1]);
					c.lineTo(edge[0],edge[1]);

					var tedge = tile[o];
					var tedgeCast = tile[o+4];

					c.lineTo(tedge[0],tedge[1]);
					c.lineTo(tedgeCast[0],tedgeCast[1]);
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