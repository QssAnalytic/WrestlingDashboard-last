import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = () => {
    const chartRef = useRef();
// test
    useEffect(() => {
        const createChart = () => {
            const data = [
                { year: 2018, score: 90 }, 
                { year: 2019, score: 87 },
                { year: 2020, score: 75 },
                { year: 2021, score: 79 },
                { year: 2022, score: 90 },
            ];

            const width = 340;
            const height = 132;
            const margin = { top: 5, right: 0, bottom: 40, left: 30 };

            const x = d3
                .scaleBand()
                .domain(data.map(d => d.year))
                .range([0, 360])
                .padding(0); 

            const y = d3
                .scaleLinear()
                .domain([70, 90])
                .range([height - margin.bottom, margin.top]);

            const line = d3
                .line()
                .x(d => x(d.year) + x.bandwidth() / 2)
                .y(d => y(d.score));

            const svg = d3
                .select(chartRef.current)
                .append('svg')
                .attr('width', width)
                .attr('height', height);

            const linePath = svg.append('path')
                .datum(data)
                .attr('fill', 'none')
                .attr('stroke', '#ECC254')
                .attr('stroke-width', 2)
                .attr('d', line);

            svg.append('g')
                .attr('transform', `translate(0, ${height - margin.bottom})`)
                .call(d3.axisBottom(x))
                .selectAll('text')
                .style('fill', '#ECC254')
                .style('font-weight', 'bold')
                .style('font-size', '12px')
                .attr('dy', '2em');

            svg.append('g')
                .attr('transform', `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y).tickValues([70, 80, 90]))
                .selectAll('text')
                .style('fill', '#ECC254')
                .style('font-weight', 'bold')
                .style('font-size', '14px');

            svg.selectAll('.horizontal-line')
                .data([70, 80, 90])
                .enter().append('line')
                .attr('class', 'horizontal-line')
                .attr('x1', margin.left + 5)
                .attr('x2', width - 13)
                .attr('y1', d => y(d))
                .attr('y2', d => y(d))
                .attr('stroke', '#373A45')
                .attr('stroke-dotarray', '4')
                .attr('stroke-width', 1);

            svg.select('.domain').remove();
            svg.select('.domain').remove();
            svg.selectAll('.tick line').remove();
        };

        createChart();
    }, []);

    return <div ref={chartRef} className="" ></div>;
};

export default LineChart;
