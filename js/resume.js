(function () {

//============================================================================
//                           SCROLL ILLUSION
//============================================================================

var docheight = $(document).height(),
    winheight = $(window).height();


$(window).scroll(function () {
    var wintop = $(window).scrollTop(),
        ratio  = docheight / wintop,
        barbox = $('#illusion_bars');

    barbox.height(function() {
        return ratio * 40;
    });

    if (ratio < 5) {
        barbox.hide();
    } else {
        barbox.show();
    }
});

// TODO
/*
  randomize the background for each bar a little

  make sure the image cover expands and shrinks relative
  to the height of the screen such that it is always covering
  the animation. NOTE: there might be a better way

  mathmatically calculate your fish animation to be 24fps
  relative to the average scroll speed down the page

*/

//============================================================================
//                         EXPERIENCE TIMELINE
//============================================================================

// set width, height, and the data you will be displaying
var w = window.innerWidth,
    h = 100,
    mydata = ['Dec 2005', '2005 - 2007', '2007 - 2009', '2010 - 2012'];

// function for mapping the circles evenly across the line
var scale = d3.scale.linear()
    .domain([0, 3])
    .range([125, w-125]);

// generate the SVG timeline that will serve as the project canvas
var svg = d3.select("#work_timeline").append("svg")
    .attr("viewBox", "0 0 "+ w +" "+ h )
    .attr("preserveAspectRatio", "YMin")
    .attr('id', 'stu_timeline');

// create the horizontal line
var myLine = svg.append("svg:line")
    .attr("x1", 0)
    .attr("x2", w)
    .attr("y1", h/2)
    .attr("y2", h/2)
    .style("stroke", "#333")
    .style("stroke-width", 10);

// create the groups that will hold your data
var bubble = svg.selectAll(".bubble")
    .data(mydata)
    .enter().append('g')
    .attr('class', 'bubble')
    .attr('transform', function(d, i){
       return 'translate('+ scale(i) +','+ h/2 +')';
    });

// plot circles uniformly across the line
bubble.append("circle")
    .attr('r', 20)
    .attr("fill", "#FFF")
    .attr("stroke", "#333")
    .attr("stroke-width", 3)
    .attr('class', 'timeline_circle')
    .on("mouseover", function(d, i){

        // animate the circle
        d3.select(this)
            .transition().duration(150)
            .style('fill', 'tomato')
            .attr('r', 30);

        // animate the text
        d3.select("#text-"+i)
            .transition().duration(300)
            .attr('pointer-events', 'none') // temporarily disable mouse-over
            .attr('transform', 'scale(2) rotate(280)')
            .attr('dy', 40)
            .each('end', textRotate);

    })
    .on("mouseout", function(d, i){

        // animate the circle back to its original position
        d3.select(this)
            .transition().duration(150)
            .style('fill', '#FFF')
            .attr('r', 20);

        // animate the text back to its original position
        d3.select("#text-"+i)
            .transition().duration(150)
            .attr('pointer-events', 'auto')
            .attr('transform', 'scale(1)')
            .style('fill', '#333')
            .attr('dy', -40);
    });

// insert the dates as text for each bubble
bubble.append("text")
    .style('color', '#333')
    .style('font-size', '1.5em')
    .style('font-family', '"PT Serif", Baskerville, "Helvetica Neue"')
    .attr('id', function(d, i){ return 'text-'+i; })
    .attr('dy', -40)
    .attr("text-anchor", "middle")
    .text(function(d) { return d; });

//----------------------------------------------------------------------------
// Animation Functions for holding transitional states
//----------------------------------------------------------------------------

// rotate the text and scale it up
function textRotate() {
    d3.select(this)
        .transition().duration(200)
        .attr('transform', 'translate(0, 0) scale(1.5) rotate(0)')
        .each('start', function(d){ this.className = 'animating'})
        .each('end', textFade);
}

// scale the text back down again, and fade its color
function textFade() {
    d3.select(this)
        .transition().duration(100)
        .attr('transform', 'translate(0, 15) scale(1)')
        .each('end', function(){
            d3.select(this).transition().duration(800)
            .style('fill', 'gray');
        });
}

//=============================================================================
// SKILLS BARCHART
//=============================================================================

var skills = [
    ['Python', 90],
    ['HTML', 100],
    ['CSS', 100],
    ['Javascript', 80],
    ['Coffeescript', 50],
    ['PHP', 70],
    ['Actionscript', 44],
    ['Clojure', 21]
];

// create the root element for holding our barchart
var barchart = d3.select("#skills_barchart")
    .append("div")
    .attr("class", "barchart_wrapper");

// create the container for holding the text and bars
var bars = barchart.selectAll("div")
    .data(skills).enter()
    .append("div")
    .attr("class", "bar_container");

// add the span with our text
bars.append("span").attr("class", "bar_txt")
    .text(function(d) { return d[0]; });

// add the html for our individual bars.
bars.append("div").attr("class", "bar_wrapper")
    .append("span")
    .attr("class", "a_bar")
    .style("width", function(d) { return d[1] + "%";});



}).call(this);
