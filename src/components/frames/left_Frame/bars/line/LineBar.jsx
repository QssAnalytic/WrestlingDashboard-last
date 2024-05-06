import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const LineBar = ({ percent, successfulCount, totalCount }) => {
  const progressBarRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const width = 240;

    const svg = d3
      .select(progressBarRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", 8)
      .style("background-color", "#2B2D33")
      .style("border-radius", "10px");

    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "bar-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    gradient.append("stop").attr("offset", "0%").style("stop-color", "#D05834");

    gradient.append("stop").attr("offset", "100%").style("stop-color", "#E5B453");

    const progress = svg
      .append("rect")
      .attr("width", 0)
      .attr("height", 7)
      .attr("fill", "url(#bar-gradient)")
      .style("opacity", 0.8)
      .style("border-radius", "10px")
      .style("cursor", "pointer")
      .attr("rx", 5)
      .attr("ry", 5);

    if (successfulCount || totalCount) {
      const tooltip = d3
        .select(progressBarRef.current)
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "#333")
        .style("color", "#fff")
        .style("padding", "10px")
        .style("border-radius", "5px")
        .style("box-shadow", "0 2px 4px rgba(0,0,0,0.2)")
        .style("font-size", "12px")
        .style("pointer-events", "none");

      progress
        .on("mouseover", () => {
          tooltip.style("visibility", "visible");
        })
        .on("mousemove", (event) => {
          const mouseX = event.pageX;
          tooltip.html(
            `<strong>Successful Count:</strong> ${successfulCount} <br/> <strong>Total Count:</strong> ${totalCount}`,
          );
          tooltip.style("left", `${mouseX}px`).style("top", `${event.pageY - 30}px`);
        })
        .on("mouseout", () => {
          tooltip.style("visibility", "hidden");
        });
    }

    progress
      .transition()
      .duration(1000)
      .attr("width", percent ? percent * width : 0);

    return () => {
      svg.remove();
      // tooltip.remove();
    };
  }, [percent]);

  return <div ref={progressBarRef}></div>;
};

export default LineBar;
