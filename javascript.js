//declare global variables
var screen = {width:800, height:800}
var margins = {top:10,bottom:50,left:50,right:50}

  
var penguinPromise = d3.json("penguins/classData.json")

penguinPromise.then
(
    function(penguins)
    {
     console.log("works", penguins)
        setup(penguins)
        drawPenguins(penguins)
    },
    function(err)
    {
        console.log("this code is not good", err);
    })


//setup svg, scales, and axes
var setup = function(penguins)
{
   d3.select("svg")
    .attr("width", screen.width)
    .attr("height", screen.height)
    .append("g")
    .attr("id","graph")
    .attr("transform","translate("+margins.left+
         ","+margins.top+")");
    var width = screen.width - margins.left - margins.right
    var height = screen.height - margins.top - margins.bottom
    
    var xScale = d3.scaleLinear()
    .domain([0,40]) //expanse of days
    .range([0,width]) 
    
    var yScale = d3.scaleLinear()
    .domain([0,10]) //expanse of quiz min/max
    .range([height,0]) 
    
    //axes setup
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    d3.select("svg")
    .append("g")
    .classed("axis",true)
    
    d3.select(".axis")
    .append("g")
    .attr("id","xAxis")
    .attr("transform","translate("+margins.left+","+(margins.top+height)+")")
    .call(xAxis)
    
    d3.select(".axis")
    .append("g")
    .attr("id", "yAxis")
    .attr("transform", "translate(25, "+margins.top+")")
    .call(yAxis)
    
    drawPenguins(penguins,xScale,yScale)
    
}

var drawPenguins=function(penguins,xScale,yScale)
{
    var groups=d3.select("#graph")
    .selectAll("g")
    .data(penguins)
    .enter()
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "black")
    .on("mouseover", function(d) {
    d3.select("img").remove()
    d3.select("div")
    .append("img")
    .attr("src", "penguins/" + d.picture)})
    .on("mouseout", mouseout)

var lineGenerator = d3.line()
.x(function(num,index){return xScale(index)})
.y(function(num) {return yScale(num)})
.curve(d3.curveNatural)

groups.datum(function(penguin) {
    return penguin.quizes.map(function(quiz){return quiz.grade})
})
.append("path")
.attr("d", lineGenerator)
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)

    
}

var mouseover = function() {
    d3.select(this)
    .style("stroke-width", "5px")
    .style("stroke", "#006400")
    
}

var mouseout = function() {
    d3.select(this)
    .style("stroke-width", "1px")
    .style("stroke", "black")
}

