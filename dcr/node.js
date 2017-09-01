function Node (x,y,type,nodes,connections) {
	this.index = 0;
	this.type = type;
	this.nodes = nodes;
	this.connections = connections;
	this.grip = 1;
	if(this.type=="node") {this.grip = 20;}
	if(this.type=="wheel") {this.grip = 5;}
	this.radius = 10
	if(this.type=="wheel") {this.radius = 25;}
	this.rotation = 0;
	this.x = x;
	this.y = y;
	this.xp = 0;
	this.yp = 0;
	this.velX = 0;
	this.velY = 0;
	this.velXp = 0;
	this.velYp = 0;
	delete x,y,type,connections;

	this.addVel = function(velX,velY) {
		this.velXp += velX;
		this.velYp += velY;
	}

	this.gravity = function() {
		if(keyboard["ArrowUp"]) {
			this.velY++;
		}	else    {
			this.velY--;
		}
	}

	this.wheel = function() {
		if(this.type=="wheel") {
			//var count = 0;
			var strength = 5;
			var increment = 0.1;
			var points = this.radius*2/increment;
			for(var xoff=-this.radius; xoff<=this.radius; xoff+=increment) {
				var yoff = -Math.sqrt( 25*25 - xoff*xoff );
				var x = this.x+xoff
				var y = this.y+yoff;

				if(y<=world.terrain.getHeight(Math.round(x))) {
					var depth = world.terrain.getHeight(Math.round(x))-y;
					depth *= 0.5;
					if(xoff>0) {
						this.addVel(-(1+(yoff/this.radius))/points*strength*depth,-(yoff/this.radius)/points*strength*depth);
					}	else	{
						this.addVel((1+(yoff/this.radius))/points*strength*depth,-(yoff/this.radius)/points*strength*depth);
					}
					//count++;
				}
			}
			//console.log("node:",this.index,"count:",count);
		}
	}

	this.hitDetection = function() {
		if(this.y==world.terrain.getHeight(Math.round(this.x))+this.radius) {
			if(world.terrain.getHeight(Math.round(this.x)-1)<world.terrain.getHeight(Math.round(this.x))) {
				this.velX -= ( world.terrain.getHeight(Math.round(this.x))-world.terrain.getHeight(Math.round(this.x)-1) )/this.grip;
			}
			if(world.terrain.getHeight(Math.round(this.x)+1)<world.terrain.getHeight(Math.round(this.x))) {
				this.velX += ( world.terrain.getHeight(Math.round(this.x))-world.terrain.getHeight(Math.round(this.x)+1) )/this.grip;
			}
		}
	}

	this.distance = function() {
		for(var i=0; i<this.connections.length; i++) {
			var connection = this.connections[i];
			var node = this.nodes[connection.node];
			if(this.connections[i].type=="frame") {
				var nodeDist = connection.dist;
				var xoff = node.x-this.x;
				var yoff = node.y-this.y;
				var conDist = Math.sqrt(xoff*xoff+yoff*yoff);
				this.xp += (xoff/conDist)*(conDist-nodeDist)/2;
				this.yp += (yoff/conDist)*(conDist-nodeDist)/2;
				this.velXp += (xoff/conDist)*(conDist-nodeDist)/2;
				this.velYp += (yoff/conDist)*(conDist-nodeDist)/2;
				if(Math.abs((xoff/conDist)*(conDist-nodeDist))>10) {this.velX /= 1.25;}
				if(Math.abs((yoff/conDist)*(conDist-nodeDist))>10) {this.velY /= 1.25;}
			}
			if(this.connections[i].type=="suspension") {
				var nodeDist = connection.dist;
				var maxNodeDist = connection.maxDist;
				var minNodeDist = connection.minDist;
				var xoff = node.x-this.x;
				var yoff = node.y-this.y;
				var conDist = Math.sqrt(xoff*xoff+yoff*yoff);
				if(conDist>maxNodeDist) {
					this.xp += (xoff/conDist)*(conDist-maxNodeDist);
					this.yp += (yoff/conDist)*(conDist-maxNodeDist);
				}
				if(conDist<minNodeDist) {
					this.xp += (xoff/conDist)*(conDist-minNodeDist);
					this.yp += (yoff/conDist)*(conDist-minNodeDist);
				}
				this.xp += (xoff/conDist)*(conDist-nodeDist)/5;
				this.yp += (yoff/conDist)*(conDist-nodeDist)/5;	
				if(Math.abs((xoff/conDist)*(conDist-nodeDist))>10) {this.velX /= 1.25;}
				if(Math.abs((yoff/conDist)*(conDist-nodeDist))>10) {this.velY /= 1.25;}
			}
		}
	}

	this.calcVel = function() {
		this.gravity();
		this.wheel();
		if(this.type=="wheel") {
			if(keyboard["w"]) {this.addVel(1,0);}
			if(keyboard["s"]) {this.addVel(-1,0)}
		}
		//this.hitDetection();
		
		this.rotation += this.velX;
	}
	this.setVel = function() {
		this.x += this.xp;
		this.y += this.yp;
		this.xp = 0;
		this.yp = 0;

		this.velX += this.velXp;
		this.velY += this.velYp;
		this.velXp = 0;
		this.velYp = 0;

		this.x += this.velX;
		this.y += this.velY;

		this.velX *= 0.95;
		this.velY *= 0.95;
	}
	this.calcPos = function() {
		this.distance();
	}
	this.setPos = function() {
		this.x += this.xp;
		this.y += this.yp;
		this.xp = 0;
		this.yp = 0;

		/*if(this.y<=world.terrain.getHeight(Math.round(this.x))+this.radius) {
			this.y = world.terrain.getHeight(Math.round(this.x))+this.radius;
			this.velY = 0;
		}*/
	}

	this.drawNode = function(id) {
		this.index = id;
		if(true||this.type=="node") {
			c.beginPath();
			c.fillStyle = "rgba(203, 112, 39, 1)";
			c.strokeStyle = "rgba(116, 56, 26, 1)";
			c.lineWidth = 3;
			c.arc(wW/2+this.x-camX,wH/2-this.y+camY,10,0,Math.PI * 2,false);
			c.fill();
			c.stroke();
		}

		if(this.type=="wheel") {
			/*c.beginPath();
			c.fillStyle = "rgba(130, 131, 126, 1)";
			c.strokeStyle = "rgba(43, 43, 43, 1)";
			c.lineWidth = 5;
			c.arc(wW/2+this.x-camX,wH/2-this.y+camY,25,0,Math.PI * 2,false);
			c.fill();
			c.stroke();*/

		    c.save();
		    c.translate(wW/2+this.x-camX,wH/2-this.y+camY);
		    c.rotate(this.rotation*Math.PI/180);

		    c.beginPath();
			c.strokeStyle = "rgba(130, 131, 126, 1)";
			c.lineWidth = 5;
			for(var i=0; i<3; i++) {
				c.moveTo(0,0);
				c.lineTo(25,0);
				c.rotate(360/3*Math.PI/180);
			}
			c.fill();
			c.stroke();

		    c.beginPath();
			c.fillStyle = "rgba(130, 131, 126, 0.5)";
			c.strokeStyle = "rgba(43, 43, 43, 1)";
			c.lineWidth = 5;
			c.arc(0,0,25,0,Math.PI * 2,false);
			c.fill();
			c.stroke();

		    c.restore();
		}

		c.fillStyle = "rgba(0,0,0,0.75)";
		c.fillText(this.index,wW/2+this.x-camX,wH/2-this.y+camY);
	}
	this.drawConnection = function() {
		for(var i=0; i<this.connections.length; i++) {
			var connection = this.connections[i];
			var node = this.nodes[connection.node];
			if(connection.type=="frame") {
				c.beginPath();
				c.moveTo(wW/2+this.x-camX,wH/2-this.y+camY);
				c.lineTo(wW/2+node.x-camX,wH/2-node.y+camY);
				c.lineWidth = 10;
				c.strokeStyle = "rgba(116, 56, 26, 1)";
				c.stroke();
				c.lineTo(wW/2+this.x-camX,wH/2-this.y+camY);
				c.lineWidth = 6;
				c.strokeStyle = "rgba(203, 112, 39, 1)";
				c.stroke();
			}
			if(connection.type=="suspension") {
				c.beginPath();
				c.moveTo(wW/2+this.x-camX,wH/2-this.y+camY);
				c.lineTo(wW/2+node.x-camX,wH/2-node.y+camY);
				c.lineWidth = 10;
				c.strokeStyle = "rgba(43, 43, 43, 1)";
				c.stroke();
				c.lineTo(wW/2+this.x-camX,wH/2-this.y+camY);
				c.lineWidth = 6;
				c.strokeStyle = "rgba(130, 131, 126, 1)";
				c.stroke();
			}
		}
	}
	console.log("Node created",this);
}