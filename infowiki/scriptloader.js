let content = document.querySelector("#wikipage-inner").innerHTML;
let interactions = [];

interactions.push({
	name:/Interaction#1/g,
	html:`
		<div id="interaction-Zahlendarstellung" style="
				border: 5px solid #d5e7f0; border-radius: 10px; padding: 5px;
				background-color: #e9f2f5;
				display: grid;
				grid-template-columns: auto 1fr;
			">
			<div>Binär: </div>				<div><input id="input-binaer"></div>
			<div>Positiv: </div>			<div><input id="input-positiv"></div>
			<div>Zweierkomplement: </div>	<div><input id="input-zweierkomplement"></div>
		</div>
	`,
	script:()=>{
		console.log("interaction#1 loading");
		let input1 = document.querySelector("#input-binaer");
		let input2 = document.querySelector("#input-positiv");
		let input3 = document.querySelector("#input-zweierkomplement");
		input1.addEventListener("change",()=>{
			let value = input1.value;
			let int = 0;
			for (let i = 0; i < value.length; i++) {
				let letter = value[value.length-1-i];
				if(letter == "1") {
					int += 1<<i;
				}
			}
			setNumber(int);
		});
		input2.addEventListener("input",()=>{
			setNumber(parseInt(input2.value));
		});
		input3.addEventListener("input",()=>{
			let v = parseInt(input3.value);
			setNumber(v<0?256+v:v);
		});
		function setNumber(n) {
			if(isNaN(n)) {
				return;
			}
			console.log("setting n to",n);

			let out = "";
			for (let i = 0; i < 8; i++) {
				if(n>>i&1) {
					out = "1" + out;
				}  else  {
					out = "0" + out;
				}
			}
			input1.value = out;

			input2.value = n<0?256+n:n;

			input3.value = n>127?-256+n:n;
		}
		console.log("interaction#1 loaded");
	}
});interactions.push({
	name:/Interaction#2/g,
	html:`
		<div id="interaction-sieb-des-erathostenes" style="
				border: 5px solid #d5e7f0; border-radius: 10px; padding: 5px;
				background-color: #e9f2f5;
			">
			<div id="controls">
				<button id="input-step">Step</button>
			</div>
			<div id="output-numbers" style="overflow: auto;"></div>
		</div>
	`,
	script:()=>{
		let step = document.querySelector("#input-step");
		let numbers = document.querySelector("#output-numbers");

		let array = [];
		for (let i = 2; i < 1000; i++) {
			array.push({n:i,prime:false,notprime:false});
		}

		step.addEventListener("click",()=>{
			let n = {n:0};
			for (let i = 0; i < array.length; i++) {
				if(n.n<1) {
					if(!array[i].notprime && !array[i].prime) {
						array[i].prime = true;
						n = array[i];
					}
				}  else  {
					if(array[i].n%n.n==0) {
						array[i].notprime = true;
					}
				}
			}
			console.log(n,array);

			numbers.innerHTML = "";
			for (let i = 0; i < array.length; i++) {
				let n = array[i];
				let div = document.createElement("div");
				div.innerHTML = n.n;
				div.style.display = "inline";
				div.style.margin = "2px 3px 2px 0px";
				div.style["background-color"] = n.prime?"#00ff00":(n.notprime?"#ff0000":"#eeeeee");
				numbers.appendChild(div);
			}
		});
	}
});

for (let i = 0; i < interactions.length; i++) {
	let interaction = interactions[i];
	let r = content.replace(interaction.name,interaction.html);
	if(r!=content) {
		setTimeout(interaction.script,0);
	}
	content = r;
}

document.querySelector("#wikipage-inner").innerHTML = content;