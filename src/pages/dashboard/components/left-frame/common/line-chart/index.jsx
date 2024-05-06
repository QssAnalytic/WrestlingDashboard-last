import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const LineChart = (props) => {
  const chartRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const data = props.data;

    if (!Array.isArray(data)) {
      return;
    }

    const width = 340;
    const height = 140;
    const margin = { top: 5, right: 0, bottom: 40, left: 30 };

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.year))
      .range([margin.left, width - margin.right]) // Adjusted the range to include margins
      .padding(0);

    const y = d3
      .scaleLinear()
      .domain([0, props.max])
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((d) => x(d.year) + x.bandwidth() / 2)
      .y((d) => y(d.score));

    const svg = d3.select(chartRef.current).append("svg").attr("width", width).attr("height", height);

    svg
      .append("defs")
      .append("filter")
      .attr("id", "line-shadow")
      .append("feDropShadow")
      .attr("dx", "0")
      .attr("dy", "0")
      .attr("stdDeviation", "2")
      .attr("flood-color", "#DC8C45")
      .attr("flood-opacity", "3");

    const linePath = svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#ECC254")
      .attr("stroke-width", 3)
      .attr("d", line)
      .style("filter", "url(#line-shadow)")

    const ticks = svg
      .selectAll("circle.tick")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "tick")
      .attr("cx", (d) => x(d.year) + x.bandwidth() / 2)
      .attr("cy", (d) => y(d.score))
      .attr("r", 4)
      .attr("fill", "#ECC254")
      .style("cursor", "pointer")
      .on("mouseover", (event, d, i) => {
        const tooltipX = x(d.year) + margin.left + x.bandwidth() / 2; // Calculate the tooltip position
        const tooltipY = y(d.score) + margin.top; // Calculate the tooltip position

        d3.select(tooltipRef.current)
          .style("display", "block")
          .style("left", `${tooltipX - 70}px`)
          .style("top", `${tooltipY}px`)
          .html(`<strong>Year:</strong> ${d.year ? d.year : 0}<br/><strong>Score:</strong> ${d.score ? d.score : 0}`)
          .style("width", "90px")
          .style("text-color", "#DC8C45");
      })
      .on("mouseout", () => {
        d3.select(tooltipRef.current).style("display", "none");
      });

    d3.select(tooltipRef.current)
      .style("position", "absolute")
      .style("display", "none")
      .style("background-color", "#0E0F13")
      .style("padding", "5px")
      .style("border", "1px solid #DC8C45")
      .style("border-radius", "4px")
      .style("color", "#fff");

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("fill", "#ECC254")
      .style("font-weight", "bold")
      .style("font-size", "12px")
      .attr("dy", "2em");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left + 5}, 0)`)
      .call(d3.axisLeft(y).tickValues([props.start, props.medium, props.max]))
      .selectAll("text")
      .style("fill", "#ECC254")
      .style("font-weight", "bold")
      .style("font-size", "14px");

    svg
      .selectAll(".horizontal-line")
      .data([props.start, props.medium, props.max])
      .enter()
      .append("line")
      .attr("class", "horizontal-line")
      .attr("x1", margin.left + 5)
      .attr("x2", width - margin.right) // Adjusted the line length
      .attr("y1", (d) => y(d))
      .attr("y2", (d) => y(d))
      .attr("stroke", "#373A45")
      .attr("stroke-dotarray", "4")
      .attr("stroke-width", 1);

    svg.select(".domain").remove();
    svg.select(".domain").remove();
    svg.selectAll(".tick line").remove();

    return () => {
      svg.remove();
    };
  }, [props.data]);

  return (
    <div style={{ position: "relative" }}>
      <div ref={chartRef} className=""></div>
      <div ref={tooltipRef}></div>
    </div>
  );
};

export default LineChart;
