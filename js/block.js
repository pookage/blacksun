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
			const halfWidth 	= topWidth/2;
			const halfWing 		= (topWidth/2) + ((bottomWidth/2) - (topWidth/2))/2;
			const angleRot 		= 120;
			const halfRot 		= 180;

			let rotation 	= 0;
			let x 			= 0;
			let y 			= 0;
			let pivot 		= "";

			console.log("ring : ", ring, "index : ", ringIndex);

			switch(ring){
				case 0:
					switch(ringIndex){
						case 0:
						 	x 		= 0;
						 	y 		= -height;
							break;
						case 1:
							x 			= 0;
							y 			= height;
							rotation 	= 180;
							break;
					}
					break;
				case 1:
					switch(ringIndex){
						case 0:
							x 			= 0;
							y 			= -height;
							rotation 	= halfRot
							break;
						case 1:
							x 			= halfWing
							y 			= -halfHeight;
							rotation 	= angleRot;
							break;
						case 2:
							x 			= halfWing;
							y 			= halfHeight;
							rotation 	= angleRot/2;
							break;
						case 3:
							x 			= 0;
							y 			= height;
							rotation 	= 0;
							break;
						case 4:
							x 			= -halfWing;
							y 			= halfHeight;
							rotation 	= -angleRot/2;
							break;
						case 5:
							x 			= -halfWing;
							y 			= -halfHeight;
							rotation 	= -angleRot;
							break;
					}	
					break;
				case 2:
					switch(ringIndex){
						case 0:
							y 			= -height*2;
							x 			= -halfWidth;
							rotation 	= halfRot;
							break;
						case 1:
							y 			= -height*3;
							x 			= topWidth;
							rotation 	= 0;
							break;
						case 2:
							rotation 	= -angleRot/2;
							y 			= -height;
							x 			= (topWidth/2) + (bottomWidth/2);
							pivot 		= "bottom";
							break;
						case 3:
							rotation 	= -angleRot;
							x			= bottomWidth;
							pivot 		= "bottom";
							break;		
					}
					break;
			}
			

			if(!!pivot) 	AFRAME.utils.entity.setComponentProperty(plot, "geometry.pivot", pivot);
			if(!!rotation) 	AFRAME.utils.entity.setComponentProperty(plot, "rotation.y", rotation);
			plot.setAttribute("position", `${x} 0 ${y}`);
		}//positionPlot
		function calcRingIndex(plotIndex){
			const rings		= Math.sqrt(plotIndex/2);
			const rounded 	= Math.ceil(rings);
			return rounded-1;
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