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
			const wingWidth 	= topWidth/2;
			const angleRot 		= 120;
			const halfRot 		= 180;


			let rotation 	= 0;
			let x 			= 0;
			let y 			= 0;
			let pivot 		= "";

			//fully procedural
			//------------------------------
			if(ring > 0){
				switch(ringIndex){
					case 0:
						y 			= -(height*ring);
						x 			= -(wingWidth * (ring-1));
						rotation 	= halfRot;
				}
			}

			//hard-coded
			//------------------------------
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
						case 1:
							x 			= (wingWidth) + (wingWidth/2);
							y 			= -(height/2);
							rotation 	= angleRot;
							break;
						case 2:
							x 			= (wingWidth) + (wingWidth / 2);
							y 			= (height/2);
							rotation 	= angleRot/2;
							break;
						case 3:
							y 			= height;
							break;
						case 4:
							x 			= -((wingWidth) + (wingWidth / 2));
							y 			= height/2;
							rotation 	= -angleRot/2;
							break;
						case 5:
							x 			= -((wingWidth) + (wingWidth / 2));
							y 			= -height/2;
							rotation 	= -angleRot;
							break;
					}	
					break;
				case 2:
					switch(ringIndex){
						case 1:
							y 			= -height*2;
							x 			= topWidth;
							pivot 		= "bottom";
							break;
						case 2:
							rotation 	= -angleRot/2;
							y 			= -height;
							x 			= (wingWidth) + (topWidth);
							pivot 		= "bottom";
							break;
						case 3:
							x			= bottomWidth;
							rotation 	= -angleRot;
							pivot 		= "bottom";
							break;
						case 4:
							x 			= bottomWidth;
							y			= height*2;
							rotation 	= angleRot/2;
							pivot 		= "bottom";
							break;
						case 5:
							x 			= wingWidth;
							y 			= height*2;
							break;
						case 6:
							x 			= -topWidth;
							y 			= height*3;
							rotation 	= halfRot;
							break;
						case 7:
							x 			= -((wingWidth) + (bottomWidth/2));
							y 			= height;
							rotation 	= angleRot;
							pivot 		= "bottom";
							break;
						case 8:
							x 			= -bottomWidth;
							rotation 	= angleRot/2;
							pivot 		= "bottom";
							break;
						case 9:
							x 			= -(topWidth + (wingWidth / 2));
							y 			= -(height*1.5);
							rotation 	= -angleRot;
							break;	
					}
					break;
				case 3:
					switch(ringIndex){
						case 1:
							pivot		= "bottom"
							x 			= wingWidth;
							y 			= -height*ring;
							break;
						case 2:
							x 			= wingWidth + topWidth;
							y 			= -height*ring;
							rotation 	= -angleRot/2;
							pivot 		= "bottom";
							break;
						case 3:
							x 			= bottomWidth + (wingWidth/2);
							y 			= -(height*(ring/2));
							rotation 	= angleRot;
							break;
						case 4:
							x 			= bottomWidth + topWidth;
							rotation 	= -angleRot/2;
							pivot 		= "bottom";
							break;
						case 5:
							rotation 	= -angleRot;
							y 			= height;
							x 			= topWidth*0.5 + bottomWidth;
							pivot 		= "bottom";
							break;
						case 6:
							rotation 	= angleRot/2;
							x 			= (topWidth*2) - (wingWidth/2);
							y 			= height*(ring - 0.5);
							break;
						case 7:
							x 			= topWidth;
							y 			= height*ring;
							break;
						case 8:
							y 			= height*ring;
							x 			= -wingWidth;
							rotation 	= halfRot;
							pivot 		= "bottom";
							break;
						case 9:
							y 			= height*ring;
							x 			= -topWidth - wingWidth;
							rotation 	= angleRot;
							pivot 		= "bottom";
							break;
						case 10:
							x 			= -(bottomWidth + wingWidth/2);
							y 			= height*(ring/2);
							rotation 	= -angleRot/2;
							break;
						case 11:
							x 			= -topWidth*3;
							rotation 	= angleRot;
							pivot 		= "bottom";
							break;
						case 12:
							x 			= -(wingWidth + topWidth*(ring-1))
							y 			= -height;
							rotation 	= angleRot/2;
							pivot 		= "bottom";
							break;
						case 13:
							x 			= -(bottomWidth - (wingWidth/2));
							y 			= -(height * (ring-1)) - (height/2)
							rotation 	= -angleRot;
							break;
					}
					break;
				case 4:
					switch(ringIndex){
						case 1:
							y 			= -(height*ring);
							pivot 		= "bottom";
							break;
						case 2:
							x 			= topWidth + wingWidth;
							y	 		= -(height*ring);
							rotation 	= halfRot;
							break;
						case 3:
							x 			= (topWidth*(ring/2)) + (wingWidth/2);
							y 			= -(height*(ring - 0.5)) 
							rotation 	= angleRot;
							break;
						case 4:
							x 			= topWidth * (ring-1);
							y 			= -(height * (ring/2))
							pivot 		= "bottom";
							rotation 	= -angleRot/2;
							break;
						case 5:

							y 			= -(height / 2);
							rotation 	= angleRot;
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