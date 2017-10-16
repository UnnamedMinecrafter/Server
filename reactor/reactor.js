function Reactor() {
	this.chamberWidth = 16;
	this.chamberHeight = 16;
	this.chamber;

	this.PowerOutput = 0;

	this.init = function() {
		/*this.chamber = [];
		document.getElementsByClassName("reactor_chamber")[0].style["grid-template-columns"]="repeat("+this.chamberWidth+",1fr)"
		for(var y=0; y<this.chamberHeight; y++) {
			var temp = []
			for(var x=0; x<this.chamberWidth; x++) {
				temp.push(new Tile(this,x,y));

				var tile = document.createElement("div");
				tile.className = "itemContainer "+x+"_"+y;
				var img = document.createElement("img");
				img.src = "img/border.png";
				img.className = "partImg";
				tile.appendChild(img);
				document.getElementsByClassName("reactor_chamber")[0].appendChild(tile);
			}
			this.chamber.push(temp);
		}*/

		this.chamber = [];
		document.getElementsByClassName("reactor_chamber")[0].style["grid-template-columns"]="repeat("+this.chamberWidth+",1fr)";
		var reactor_chamber = document.getElementsByClassName("reactor_chamber")[0];
		for(var y=0; y<this.chamberHeight; y++) {
			for(var x=0; x<this.chamberWidth; x++) {
				var itemContainer = document.createElement("div");
				itemContainer.className = "itemContainer";
				itemContainer.addEventListener("drop",drop,false);
				itemContainer.addEventListener("dragover",dragover,false);
				reactor_chamber.appendChild(itemContainer);
			}
		}
	}


	this.update = function() {
		parent.Power += this.PowerOutput;
		document.getElementsByClassName("heat_percent")[0].style.width = parent.Heat/parent.HeatMax*100+"%";
		document.getElementsByClassName("power_percent")[0].style.width = parent.Power/parent.PowerMax*100+"%";
		document.getElementsByClassName("money_percent")[0].style.width = parent.Money*100+"%";
	}
}



function dragover(ev) {
	//console.log("dragover",ev);
	ev.preventDefault();
}

function dragstart(ev) {
	//console.log("dragstart",ev);
	//ev.dataTransfer.setData("text", ev.target.id);
	ev.target.id = "drag";
}

function drop(ev) {
	//console.log("ondrop",ev);
	ev.preventDefault();
	//var id = ev.dataTransfer.getData("text");
	var item = document.getElementById("drag");
	item.id = "";

	if(ev.target.className=="itemContainer") {
		ev.target.appendChild(item);
	}

	ev.dataTransfer.clearData();
}