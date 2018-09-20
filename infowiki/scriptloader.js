let content = document.querySelector("#wikipage-inner").innerHTML;
let interactions = [];

interactions.push({
	name:/Interaction#1/g,
	html:`
		<div id="interaction-Zahlendarstellung">
			Binär:<input id="input-binaer"><br>
			Positiv:<input id="input-positiv"><br>
			Zweierkomplement:<input id="input-zweierkomplement">
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
});

for (let i = 0; i < interactions.length; i++) {
	let interaction = interactions[i];
	content = content.replace(interaction.name,interaction.html);
	setTimeout(interaction.script,0);
}

document.querySelector("#wikipage-inner").innerHTML = content;