// write your code here!
const width = 600;
const height = 600;
const padding = 50;

const data = regionData.filter(mustHaveData);

const yScale = d3.scaleLinear()
                  .domain(d3.extent(data, d => d.subscribersPer100))
                  .range([height - padding, padding]);

const xScale = d3.scaleLinear()
                  .domain(d3.extent(data, d => d.adultLiteracyRate))
                  .range([padding, width - padding]);

const radiusScale = d3.scaleLinear()
                      .domain(d3.extent(data, d => d.medianAge))
                      .range([5, 30]);

const colorScale = d3.scaleLinear()
                      .domain(d3.extent(data, d => d.urbanPopulationRate))
                      .range(["yellow", "purple"]);

const xAxis = d3.axisBottom(xScale)
                .tickSize(-height + padding * 2)
                .tickSizeOuter(0);

const yAxis = d3.axisLeft(yScale)
                .tickSize(-width + padding * 2)
                .tickSizeOuter(0);


const svg = d3.select("svg")
              .attr("width", width)
              .attr("height", height);

              svg
                .append("g")
                .attr("transform", `translate(${padding}, 0)`)
                .call(yAxis);
              svg
                .append("g")
                .attr("transform", `translate(0, ${height - padding})`)
                .call(xAxis);

              svg
                .append("text")
                .attr("dy", "1.6em")
                .attr("x", width/2)
                .attr("y", height - padding)
                .style("text-anchor", "middle")
                .text("Adult Literacy Rate")

                svg
                  .append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("dy", "-1.1em")
                 .attr("y", padding)
                 .attr("x", -height/2)
                 .style("text-anchor", "middle")
                  .text("Cellular Subscribers Per 100 people")

                  svg
                    .append("text")
                    .style("text-anchor", "middle")
                    .attr("dy", "-1.2em")
                    .attr("x", width/2)
                    .attr("y", padding)
                    .style("font-size", "1.2em")
                    .text("2011 Cellular Subsription Distribution")
svg
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", d => xScale(d.adultLiteracyRate))
    .attr("cy", d => yScale(d.subscribersPer100))
    .attr("fill", d => colorScale(d.urbanPopulationRate))
    .attr("r", d => radiusScale(d.medianAge))
    .attr("stroke", "#fff");






    function mustHaveData(obj) {
      var key = [
        "subscribersPer100",
        "adultLiteracyRate",
        "medianAge",
        "urbanPopulationRate"
      ];
      for(let i=0; i<key.length; i++){
        if(obj[key[i]] === null) return false;
      }
      return true;
    }
