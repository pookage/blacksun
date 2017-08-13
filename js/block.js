AFRAME.registerComponent('block', {
	schema: {},
	init: function(){
		const element 	= this.el;
		const land 		= element.children;

		arrangePlots(land);

		function arrangePlots(plots){

			const plotCount = plots.length;

			let index, currentPlot, lastPlot, ring, nextRing, ringIndex;
			for(index = 0; index < plotCount; index++){
				currentPlot = plots[index];
				lastPlot 	= index > 0 ? plots[index-1] : plots[index];
				nextRing 	= calcRingIndex(index+1);

				//reset the internal counter for ring index if we have started a new ring
				if(nextRing !== ring){
					ringIndex 	= 0;
					ring 		= nextRing;
				} else {
					ringIndex++;
				}

				//position the plot in the hexagon pattern
				positionPlot(currentPlot, lastPlot, ring, ringIndex);

			}

		}//arrangePlots
		function positionPlot(plot, lastPlot, ring, ringIndex){

			const geometry 		= plot.getAttribute("geometry");
			const height 		= geometry.height;
			const topWidth 		= geometry.topWidth;
			const bottomWidth 	= geometry.bottomWidth;
			const halfHeight 	= height / 2;

			let xOffset 	= 0
			let yOffset 	= 0;
			let yRotation 	= 0;
			let position 	= "";

			switch(ring){
				case 0:
					switch(ringIndex){
						case 0:
							yOffset = -halfHeight;
							break;
						case 1:
							yOffset 	= halfHeight;
							yRotation 	= 180;
							break;
					}
					break;
				case 1:
					switch(ringIndex){
						case 0:
							let thing = (height + halfHeight) / 2;
							let otherThing = (topWidth - height);
							position 	= `-${bottomWidth/2} ${0} ${0}`
							yRotation 	= -120;

							console.log("trsfadf", ((topWidth + bottomWidth) / 2));
							/*
							yOffset 	= -height;
							xOffset 	= -((topWidth + bottomWidth) / 2);
							yRotation 	= 240;
							AFRAME.utils.entity.setComponentProperty(plot, "rotation.y", "240");
							plot.setAttribute("position", `${xOffset} 0 ${yOffset}`);
							*/
							break;
						case 1:
							/*yOffset 	= -(height*2);
							yRotation 	= 180
							AFRAME.utils.entity.setComponentProperty(plot, "position.z", yOffset);
							AFRAME.utils.entity.setComponentProperty(plot, "rotation.y", yRotation);*/
							break;
						case 2:
							break;
					}
					break;
			}
			if(!!position) 	plot.setAttribute("position", position);
			if(!!yOffset) 	AFRAME.utils.entity.setComponentProperty(plot, "position.z", yOffset);
			if(!!xOffset)	AFRAME.utils.entity.setComponentProperty(plot, "position.x", xOffset);
			if(!!yRotation) AFRAME.utils.entity.setComponentProperty(plot, "rotation.y", yRotation);
		}//positionPlot
		function calcRingIndex(plotIndex){
			const rings	= (plotIndex - 2) / 4;
			const rounded 	= Math.ceil(rings);
			return rounded;
		}//calcRingIndex
		
	},
	update: function () {},
	tick: function () {},
	remove: function () {},
	pause: function () {},
	play: function () {}
});

AFRAME.registerPrimitive('a-block', {
	defaultComponents: {
		block: {},
	}
});