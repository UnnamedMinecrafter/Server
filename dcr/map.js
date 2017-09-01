function Map() {
	this.height = []
	this.min = 0;
	this.max = 0;

	this.getHeight = function(x) {
		if(x>this.max) {
			this.generate(1000);
		}
		if(x<this.min) {
			this.generate(-1000);
		}
		return this.height[x];
	}

	this.generate = function(x) {
		if(x>0) {
			for(var i=0; i<x; i++) {
				if((this.max+i)%100==0) {
					this.height.push(203);
				}	else	{
					this.height.push(200);
				}
			}
			this.max += x;
		}
		if(x<0) {
			for(var i=0; i>x; i--) {
				if((this.min+i)%100==0) {
					this.height[this.min+i] = 203;
				}	else	{
					this.height[this.min+i] = 200;
				}
				this.height[this.min+i] = Math.sin((this.min+i)/100)*100+200;
			}
			this.min += x;
		}
		console.log("Map changed",this);
	}

	this.render = function() {
		c.beginPath();
		c.fillStyle = "rgba(119, 79, 56, 1)";
		c.strokeStyle = "rgba(138, 155, 15, 1)";
		c.moveTo(-10,wH);
		c.lineTo(-10,0-[0+Math.round(camX-wW/2)]+camY+wH/2);
		for(var x=0; x<wW; x++) {
			c.lineTo(x,0-this.getHeight(x+Math.round(camX-wW/2))+camY+wH/2);
		}
		c.lineTo(wW+10,0-this.getHeight(wW+Math.round(camX-wW/2))+camY+wH/2);
		c.lineTo(wW+10,wH);
		c.fill();
		c.stroke();
	}
	console.log("Map initialised");
}