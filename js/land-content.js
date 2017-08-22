AFRAME.registerComponent('land-content', {
	schema: {
		contents: {
			default: [],
			parse: function(value){
				const html = JSON.parse(value);
				return html;
			}
		}
	},
	init: function(){
		const contents 			= this.data.contents;
		const parentGeometry 	= this.el.parentElement.getAttribute("geometry");
		const height 			= parentGeometry.height;
		const pivot 			= parentGeometry.pivot;
		let offset 				= height/2;

		//add contents of land to new land-content entity
		this.el.innerHTML 	= contents;

		//offset content in the correct direction based on pivot location
		if(pivot = "bottom") offset = -offset;
		AFRAME.utils.entity.setComponentProperty(this.el, "position.z", offset);
	},
	update: function () {},
	tick: function () {},
	remove: function () {},
	pause: function () {},
	play: function () {}
});
AFRAME.registerPrimitive('a-land-content', {
	defaultComponents: {
		"land-content" : {}
	},
	mappings: {
		contents: "land-content.contents"
	}
});