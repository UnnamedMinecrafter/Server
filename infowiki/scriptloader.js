console.log("running");
let content = document.querySelector("#wikipage-inner").innerHTML;
let interactions = [];

interactions.push({name:/Interaction#1/g,html:`
	<div id="interaction-test">
		<button>HTML Injected</button>
	</div>
`});

for (let i = 0; i < interactions.length; i++) {
	let interaction = interactions[i];
	content = content.replace(interaction.name,interaction.html);
}

document.querySelector("#wikipage-inner").innerHTML = content;