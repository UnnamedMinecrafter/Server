function Tile(x,y) {
	this.part = "none";
	this.tier = 0;
	this.durability = 0;
	this.durabilityMax = 0;
	this.powerOutput = 0;

	this.delete = function() {
		reactorPowerOutput -= this.powerOutput;

		this.part = "none";
		this.tier = 0;
		this.durability = 0;
		this.durabilityMax = 0;
	}
	this.replace = function(part,tier) {
		this.delete()

		if(part=="cell") {
			this.part = part;
			this.tier = tier;
			this.durabilityMax = 16;
			this.durability = this.durabilityMax;
			this.powerOutput = 1*tier;
		}

		reactorPowerOutput += this.powerOutput;
	}

	this.update = function() {
	}
}