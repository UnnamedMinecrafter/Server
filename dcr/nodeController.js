function NodeController() {
	this.nodes = [];

	this.addNode = function(x,y,type,connections) {
		this.nodes.push(new Node(x,y,type,this.nodes,connections));
	}
	this.deleteNode = function(index) {
		var node = this.nodes[index];
		var cons = node.connections;
		for(var i=0; i<cons.length; i++) {
			cnode = this.nodes[cons[i].node];
			ccons = cnode.connections;
			for(var p=0; p<ccons.length; p++) {
				if(ccons[p].node==index) {
					for(var o=p; o<ccons.length-1; o++) {
						ccons[o] = ccons[o+1];
					}
					ccons.pop();
				}
			}
		}
		for(var i=index; i<this.nodes.length-1; i++) {
			this.nodes[i] = this.nodes[i+1]
		}
		this.nodes.pop();
	}
	this.connect = function(index1,index2,type,dist) {
		this.nodes[index1].connections.push({node: index2, type: type, dist: dist});
		console.log(this.nodes[index1].connections);
		this.nodes[index2].connections.push({node: index1, type: type, dist: dist});
		console.log(this.nodes[index2].connections);
	}
	this.deconnect = function(index1,index2) {
		var cons = this.nodes[index1].connections;
		for(var i=0; i<cons.length; i++) {
			if(cons[i].node == index2) {
				for(var o=i; o<cons.length; o++) {
					cons[o] = cons[o+1];
				}
				cons.pop();
				i--;
			}
		}

		var cons = this.nodes[index2].connections;
		for(var i=0; i<cons.length; i++) {
			if(cons[i].node == index1) {
				for(var o=i; o<cons.length; o++) {
					cons[o] = cons[o+1];
				}
				cons.pop();
				i--;
			}
		}
	}

	this.getX = function() {
		var x = 0;
		for(var i=0; i<this.nodes.length; i++) {
			x += this.nodes[i].x;
		}
		return x/this.nodes.length;
	}
	this.getY = function() {
		var y = 0;
		for(var i=0; i<this.nodes.length; i++) {
			y += this.nodes[i].y;
		}
		return y/this.nodes.length;
	}
	this.getVelX = function() {
		var velX = 0;
		for(var i=0; i<this.nodes.length; i++) {
			velX += this.nodes[i].velX;
		}
		return velX/this.nodes.length;
	}
	this.getVelY = function() {
		var velY = 0;
		for(var i=0; i<this.nodes.length; i++) {
			velY += this.nodes[i].velY;
		}
		return velY/this.nodes.length;
	}




	this.update = function() {
		for(var i=0; i<this.nodes.length; i++) {
			this.nodes[i].calcVel();
		}
		for(var i=0; i<this.nodes.length; i++) {
			this.nodes[i].setVel();
		}
		for(var i=0; i<this.nodes.length; i++) {
			this.nodes[i].calcPos();
		}
		for(var i=0; i<this.nodes.length; i++) {
			this.nodes[i].setPos();
		}
	}
	this.render = function() {
		for(var i=0; i<this.nodes.length; i++) {
			this.nodes[i].drawConnection();
		}
		for(var i=0; i<this.nodes.length; i++) {
			this.nodes[i].drawNode(i);
		}
	}
	console.log("Node Controller intialised",this);
}