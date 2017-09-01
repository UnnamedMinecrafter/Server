function World() {
	this.nodeController = new NodeController();
	this.terrain = new Terrain();
	this.init = function() {
		this.terrain.init();
	}
	this.update = function() {
		this.nodeController.update();
	}
	this.render = function() {
		c.beginPath();
		c.fillStyle = "rgba(105, 210, 231, 1)";
		c.fillRect(0,0,wW,wH);

		camX = this.nodeController.getX();
		camY = this.nodeController.getY();
		
		this.nodeController.render();
		this.terrain.render();

		c.fillStyle = "#000000";
		c.fillText(Math.round(this.nodeController.getX())+" "+Math.round(this.nodeController.getY()),3,10);
		c.fillText(Math.round(this.nodeController.getVelX())+" "+Math.round(this.nodeController.getVelY()),wW-250,10);
	}
}