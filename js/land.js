AFRAME.registerComponent('land', {
	schema: {},
	init: function(){
		const element = this.el;
		element.setAttribute("rotation", "-90 0 0")
	},
	update: function () {},
	tick: function () {},
	remove: function () {},
	pause: function () {},
	play: function () {}
});

AFRAME.registerPrimitive('a-land', {
	defaultComponents: {
		land: {},
		geometry: {
			primitive: "trapezium",
			topWidth: 11.55,
			bottomWidth: 23.09,
			height: 10
		}
	}
});