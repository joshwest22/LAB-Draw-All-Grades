//declare global variables
var screen = {width:800, height:800}
var margins = {top:10,bottom:50,left:50,right:50}

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
    
    
    
    
    
}