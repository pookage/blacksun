AFRAME.registerComponent('land', {
	schema: {},
	init: function(data){},
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
			bottomWidth: 23.10,
			height: 10,
			flat: true,
			pivot: "top"
		}
	}
});