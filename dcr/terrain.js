function Terrain() {
	this.height = []
	this.start = 0;
	this.end = 0;
	this.stepPow = 10;
	this.stepSize = Math.pow(2,this.stepPow);
	this.min = 250;
	this.max = 750;
	this.roughness = 250;
	this.roughnessMult = 0.5;

	this.init = function() {
		//this.height[0] = Math.random()*(this.max-this.min)+this.min;
		this.height[0] = 200;
	}
	this.getHeight = function(x) {
		if(x>this.end) {
			this.generate(this.stepPow);
		}
		if(x<this.start) {
			this.generate(-this.stepPow);
		}
		return this.height[x];
	}

	this.generate = function(stepPow) {
		if(stepPow>0) {
			var gen = generate(this.height[this.height.length-1],Math.random()*(this.max-this.min)+this.min,stepPow,this.roughness,this.roughnessMult);
			gen.shift();
			//this.height = this.height.concat(gen);
			for(var i=0; i<gen.length;i++) {
				this.height.push(gen[i]);
			}
			this.end += Math.pow(2,this.stepPow);
		}
		if(stepPow<0) {
			for(var i=0; i>-Math.pow(2,this.stepPow); i--) {
				if((this.start+i)%100==0) {
					this.height[this.start+i] = 203;
				}	else	{
					this.height[this.start+i] = 200;
				}
			}
			this.start += -Math.pow(2,this.stepPow);
		}
		console.log("Terrain changed",this);
	}

	this.render = function() {
		c.beginPath();
		c.fillStyle = "rgba(119, 79, 56, 1)";
		c.strokeStyle = "rgba(138, 155, 15, 1)";
		c.lineWidth = 3;
		c.moveTo(-10,wH);
		c.lineTo(-10,0-this.getHeight(0+Math.round(camX-wW/2))+camY+wH/2);
		for(var x=0; x<wW; x++) {
			c.lineTo(x,0-this.getHeight(x+Math.round(camX-wW/2))+camY+wH/2);
		}
		c.lineTo(wW+10,0-this.getHeight(wW+Math.round(camX-wW/2))+camY+wH/2);
		c.lineTo(wW+10,wH);
		c.fill();
		c.stroke();
	}
	console.log("Terrain initialised");
}