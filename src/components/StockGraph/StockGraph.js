import React, { useEffect, useMemo, useRef }  from 'react'
import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

const StockGraph = ({ width, height, data,linecolor }) => {
const axesRef = useRef(null);
const boundsWidth = width - MARGIN.right - MARGIN.left;
const boundsHeight = height - MARGIN.top - MARGIN.bottom;

// Y axis
const [min, max] = d3.extent(data, (d) => d.y);
const yScale = useMemo(() => {
  return d3
    .scaleLinear()
    .domain([min, max || 0])
    .range([boundsHeight, 0]);
}, [data, height]);

// X axis
const [xMin, xMax] = d3.extent(data, (d) => new Date(d.x));
const xScale = useMemo(() => {
  // return d3
  //   .scaleLinear()
  //   .domain([0, xMax || 0])
  //   .range([0, boundsWidth]);

   return d3.scaleTime()
  .domain(d3.extent(data, function(d) { 
    return new Date(d.x); 
  }))
  .range([0, width]);
}, [data, width]);

  // Render the X and Y axis using d3.js, not react
  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();
    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .attr("class", "customaxis")
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale)
    svgElement.append("g")
    .attr("class", "customaxis")
    .call(yAxisGenerator);
  }, [xScale, yScale, boundsHeight]);

  // Build the line
  const lineBuilder = d3
    .line()
    .x((d) => xScale( new Date(d.x)))
    .y((d) => yScale(d.y));
  const linePath = lineBuilder(data);


  return (
    <div>
    <svg width={width} height={height}>
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      >
        <path
          d={linePath}
          opacity={1}
          stroke={linecolor}
          fill="none"
          strokeWidth={2}
        />
      </g>
      <g
        width={boundsWidth}
        height={boundsHeight}
        ref={axesRef}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      />
    </svg>
  </div>
  )
}

export default StockGraph;