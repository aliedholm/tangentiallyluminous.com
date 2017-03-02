//defining linegen function
var lineGen = d3.svg.line()
	.x(function(d) {
		return xScale(timeParser(d.time));
	})
	.y(function(d) {
		return yScale(d.reading);
	});

//draw line function
function drawLine(dateChoice){
	if (dateChoice){
		currentDateShort = dateChoice;
	}

	for (var i = 0; i < sensorNames.length; i++){
		if (dataByDate[sensorNames[i]][currentDateShort]){
			var graphSet = dataByDate[sensorNames[i]][currentDateShort];
				canvas.append('svg:path')
					.attr('d', lineGen(graphSet))
					.attr("class", sensorNames[i] + " lines")
					.attr("id", sensorNames[i])
					.attr('stroke', sensColors[i])
					.attr('stroke-width', lineStroke)
					.attr('fill', "none");
		}
	}
}

function drawDots(dateChoice){
	if (dateChoice){
		currentDateShort = dateChoice;
	}
	for (var i = 0; i < sensorNames.length; i++){
		if (dataByDate[sensorNames[i]][currentDateShort]){
			var graphSet = dataByDate[sensorNames[i]][currentDateShort];
				var dots = canvas.selectAll("circle.points" + i)
					.data(graphSet)
					.enter()
					.append("circle")
					.attr("class", "points" + i + " points")
					.style("fill", sensColors[i])
					.attr("cx", function(d){
						return xScale(timeParser(d.time));
					})
					.attr("cy", function(d){
						return yScale(d.reading);
					})
					.attr("r", circleSize)
		}
	}
}					
