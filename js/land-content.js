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
		const offset 			= height/2;



		this.el.innerHTML 	= contents;

		switch(pivot){
			case "top":
				AFRAME.utils.entity.setComponentProperty(this.el, "position.z", offset);
				break;
			case "bottom":
				AFRAME.utils.entity.setComponentProperty(this.el, "position.z", -offset);
				break;
		}

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