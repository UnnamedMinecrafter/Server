var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var wW;
var wH;
var editor = new Editor();
editor.init();
var world = new World();
world.init();
var camX = 0;
var camY = 0;
resize();
function resize() {
	wW = window.innerWidth;
	wH = window.innerHeight;
	canvas.width = wW;
	canvas.height = wH;
	render();
}
window.addEventListener("resize",resize,false)

var mouse = {
	x: undefined,
	y: undefined
}
var keyboard = {};
window.addEventListener("mousemove",function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
})
window.addEventListener("click",function (event) {
	if(running=="world") {
		world.click(event);
	}	else if(running=="editor") {
		editor.click(event);
	}
})
window.addEventListener("keydown",function(event) {
	keyboard[event.key] = true;
	//console.log(event.key);
})
window.addEventListener("keyup",function(event) {
	keyboard[event.key] = false;
})

world.nodeController.addNode(100,500,"wheel",[{node: 1, type: "frame", dist: 100}]);
world.nodeController.addNode(200,500,"wheel",[{node: 0, type: "frame", dist: 100}]);

function camera() {
	camX = nodeController.getX();
	camY = nodeController.getY();

	//console.log("camera pos:",camX,camY);
}
var running = "world";
function update() {
	if(running=="world") {
		world.update();
	}	else if(running=="editor") {
		//editor.update();
	}
}
function render() {
	if(running=="world") {
		world.render();
	}	else if(running=="editor") {
		editor.render();
	}
}

function animate() {
	requestAnimationFrame(animate);
	
	update();

	render();
}
animate();
