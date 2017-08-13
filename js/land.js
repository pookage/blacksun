AFRAME.registerComponent('land', {
	schema: {},
	init: function(data){},
	update: function () {},
	tick: function () {},
	remove: function () {},
	pause: function () {},
	play: function () {

		const geom 	= this.el.getAttribute("geometry")
		const angle = calculateWingAngle(geom.height, geom.bottomWidth, geom.topWidth)

		this.el.angle = angle;


		function calculateWingAngle(height, bottomWidth, topWidth){

			const opposite 		= height;
			const adjacent 		= (bottomWidth - topWidth) / 2;
			const hypotenuse 	= Math.sqrt(adjacent*adjacent + opposite*opposite);
			const angleRad 		= Math.atan(opposite/adjacent);
			const angleDeg 		= angleRad * (180 / Math.PI);

			return angleDeg;
		}//calculateWingAngle
	}
});

AFRAME.registerPrimitive('a-land', {
	defaultComponents: {
		land: {},
		geometry: {
			primitive: "trapezium",
			topWidth: 11.55,
			bottomWidth: 23.09,
			height: 10,
			flat: true
		}
	}
});