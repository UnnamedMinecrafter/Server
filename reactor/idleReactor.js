var Heat = 0;
var HeatMax = 1000;
var Power = 0;
var PowerMax = 100;
var Money = 0;
var reactor = new Reactor();

window.addEventListener("resize",resize);
function resize() {
	var chamber = document.getElementsByClassName("reactor_chamber")[0];
	var reactor = document.getElementsByClassName("reactor")[0];
	chamber.style.width = (reactor.clientWidth)+"px";
	chamber.style.height = (reactor.clientHeight)+"px";
	chamber.style["grid-auto-rows"] = "minmax(0px,"+reactor.clientHeight/16+"px)";
	reactor.style.height = reactor.clientWidth+"px";
}

function main() {
	setTimeout(main,250);
	
	reactor.update();

	resize();//chrome broke resize event
}

window.onload = function() {
	reactor.init();
	
	resize();
	main();
	resize();//force firefox to update
}