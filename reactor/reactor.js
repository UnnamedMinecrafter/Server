var reactorWidth = 16;
var reactorHeight = 16;
var reactorSize = 16;
var reactor;

var reactorHeat = 0;
var reactorHeatMax = 1000;
var reactorPower = 0;
var reactorPowerOutput = 0;
var reactorPowerMax = 100;
var reactorMoney = 0;
function reactorReset() {
	reactor = [];
	document.getElementsByClassName("reactor_chamber")[0].style["grid-template-columns"]="repeat("+reactorWidth+",1fr)"
	for(var y=0; y<reactorHeight; y++) {
		var temp = []
		for(var x=0; x<reactorWidth; x++) {
			temp.push(new Tile(x,y));

			var tile = document.createElement("div");
			tile.className = "tile "+x+"_"+y;
			var img = document.createElement("img");
			img.src = "img/border.png";
			tile.appendChild(img);
			document.getElementsByClassName("reactor_chamber")[0].appendChild(tile);
		}
		reactor.push(temp);
	}
}


function update() {
	reactorPower += reactorPowerOutput;
	document.getElementsByClassName("heat_percent")[0].style.width = reactorHeat/reactorHeatMax*100+"%";
	document.getElementsByClassName("power_percent")[0].style.width = reactorPower/reactorPowerMax*100+"%";
	document.getElementsByClassName("money_percent")[0].style.width = reactorMoney*100+"%";
}

function main() {
	setTimeout(main,250);
	
	update();
}
reactorReset()
main();
