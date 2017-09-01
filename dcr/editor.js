function Editor() {
	this.nodeController = new NodeController();
	this.init = function () {
	}
	this.click = function(event) {
		editor.nodeController.addNode(event.x+camX-wW/2,camY-event.y+wH/2,"node",[]);
	}
	this.render = function() {
		c.beginPath();
		c.fillStyle = "rgba(105, 210, 231, 1)";
		c.fillRect(0,0,wW,wH);

		this.nodeController.render();

		c.fillStyle = "#000000";
		c.fillText(camX+" "+camY,3,10);
	}
}