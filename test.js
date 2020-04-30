
let x1 = 400, x2 = 400, y1 = 300, y2 = 400;
let xArray = [x1, x2];
let yArray = [y1, y2];

let dimensions = {
    width: window.innerWidth * 0.8,
    height: 700,
    margin: {
        top: 50,
        right: 50,
        bottom: 50, 
        left: 50
    }
}

dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;


var wrapper = d3.select('#wrapper')
    .append('svg')
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
        .attr("id", "visualization")

const bounds = wrapper.append('g')
    .style("transform", `translate(${
        dimensions.margin.left
    }px, ${
        dimensions.margin.top
    }px)`)





let path = d3.line()
    .x([1, 2, 3, 4, 5, 6])
    .y([4, 5, 6, 7, 8]);

console.log(path);

d3.select('#visualization')
    .append('path')
    .attr('class', 'test')
    .attr('d', path);