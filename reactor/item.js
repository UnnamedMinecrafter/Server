class item {
	static create(args) {
		var item = document.createElement("div");
		item.className = "item";
		item.addEventListener("dragstart",dragstart,false);

		return item;
	}
}