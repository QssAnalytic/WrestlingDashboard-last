import { useEffect, useRef } from "react";
import * as d3 from "d3";

const WinLineBar = ({ percent, colors }) => {
  const progressBarRef = useRef();

  useEffect(() => {
    const width = 300;

    const svg = d3
      .select(progressBarRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", 8)
      .style("background-color", `${colors?.bgColor}`)
      .style("border-radius", "10px");

    const gradientId = `gradient-${colors?.stopColor[0].slice(1)}`;

    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", gradientId)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", colors?.stopColor[0]);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", colors?.stopColor[1]);

    const progress = svg
      .append("rect")
      .attr("width", 0)
      .attr("height", 7)
      .attr("fill", `url(#${gradientId})`)
      .style("opacity", 0.8)
      .style("border-radius", "10px")
      .attr("rx", 5)
      .attr("ry", 5);

    progress
      .transition()
      .duration(1000)
      .attr("width", percent * (width / 10));

    return () => {
      svg.remove();
    };
  }, [percent]);

  return <div ref={progressBarRef}></div>;
};

export default WinLineBar;
