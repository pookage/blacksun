AFRAME.registerComponent('land', {
	schema: {
		debug: {
			type: "boolean",
			default: true
		}
	},
	init: function(data){
		const land 		= this.el;
		const debug 	= this.data.debug;
		const content 	= land.children;


		//SETUP
		//--------------------------------------------
		if(content.length > 0){ wrapContentInOffset(content); }


		//FUNCTION DEFINITIONS
		//----------------------------------------------
		function wrapContentInOffset(html){
			new Promise(convertContentsToString.bind(true, html))
			.then(createLandContent)
			.catch(recordError);	
		}//wrapContentInOffset
		function convertContentsToString(html, resolve, reject){
			const stringContent = [];
			for(let child of html){
				stringContent.push(child.outerHTML);
			}
			try {
				const jsonContent = JSON.stringify(stringContent);	
				if(!!jsonContent) resolve(jsonContent);
				else reject("No content in LAND to stringify.");
			} catch(error){ resolve(error); }
		}//convertContentsToString
		function createLandContent(HTMLString){

			console.log("create land content!")

			const fragment 		= document.createDocumentFragment();
			const container 	= document.createElement("a-land-content");
			container.setAttribute("contents", HTMLString);

			land.innerHTML = "";
			land.appendChild(container);
		}//createLandContent
		function recordError(error){
			if(debug){
				console.log(error);
			}
		}//recordError
	},
	update: function () {},
	tick: function () {},
	remove: function () {},
	pause: function () {},
	play: function () {

	}
});

AFRAME.registerPrimitive('a-land', {
	defaultComponents: {
		land: {},
		geometry: {
			primitive: "trapezium",
			topWidth: 11.55,
			bottomWidth: 23.10,
			height: 10,
			flat: true,
			pivot: "top"
		}
	}
});