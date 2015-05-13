'use strict';

angular.module('admissionSystemApp')
  .directive('barChart', function () {
    function link(scope, el) {
      var data = scope.data;
      el = el[0];
      var
        //width = el.clientWidth, //1280
        //height = el.clientHeight, //800
        width = 1152,
        height = 600,
        m = [30, 160, 0, 250], // top right bottom left
        w = width - m[1] - m[3], // width
        h = height - m[0] - m[2], // height
        x = d3.scale.linear().range([0, w]),
        y = 25, // bar height
        z = d3.scale.ordinal().range(["steelblue", "#aaa"]); // bar color


      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("top");

      var svg = d3.select(el).append("svg:svg")
        .attr("width", w + m[1] + m[3])
        .attr("height", h + m[0] + m[2])
        .append("svg:g")
        .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

      svg.append("svg:rect")
        .attr("class", "background")
        .attr("width", w)
        .attr("height", h)
        .on("click", up);

      svg.append("svg:g")
        .attr("class", "x axis");

      svg.append("svg:g")
        .attr("class", "y axis")
        .append("svg:line")
        .attr("y1", "100%");

      function down(d, i) {
        if (!d.children) return;
        var duration = d3.event && d3.event.altKey ? 7500 : 750,
          delay = duration / d.children.length;

        // Mark any currently-displayed bars as exiting.
        var exit = svg.selectAll(".enter").attr("class", "exit");

        // Entering nodes immediately obscure the clicked-on bar, so hide it.
        exit.selectAll("rect").filter(function(p) { return p === d; })
          .style("fill-opacity", 1e-6);

        // Enter the new bars for the clicked-on data.
        // Per above, entering bars are immediately visible.
        var enter = bar(d)
          .attr("transform", stack(i))
          .style("opacity", 1);

        // Have the text fade-in, even though the bars are visible.
        // Color the bars as parents; they will fade to children if appropriate.
        enter.select("text").style("fill-opacity", 1e-6);
        enter.select("rect").style("fill", z(true));

        // Update the x-scale domain.
        x.domain([0, d3.max(d.children, function(d) { return d.value; })]).nice();

        // Update the x-axis.
        svg.selectAll(".x.axis").transition()
          .duration(duration)
          .call(xAxis);

        // Transition entering bars to their new position.
        var enterTransition = enter.transition()
          .duration(duration)
          .delay(function(d, i) { return i * delay; })
          .attr("transform", function(d, i) { return "translate(0," + y * i * 1.2 + ")"; });

        // Transition entering text.
        enterTransition.select("text").style("fill-opacity", 1);

        // Transition entering rects to the new x-scale.
        enterTransition.select("rect")
          .attr("width", function(d) { return x(d.value); })
          .style("fill", function(d) { return z(!!d.children); });

        // Transition exiting bars to fade out.
        var exitTransition = exit.transition()
          .duration(duration)
          .style("opacity", 1e-6)
          .remove();

        // Transition exiting bars to the new x-scale.
        exitTransition.selectAll("rect").attr("width", function(d) { return x(d.value); });

        // Rebind the current node to the background.
        svg.select(".background").data([d]).transition().duration(duration * 2); d.index = i;
      }

      function up(d) {
        if (!d.parent) return;
        var duration = d3.event && d3.event.altKey ? 7500 : 750,
          delay = duration / d.children.length;

        // Mark any currently-displayed bars as exiting.
        var exit = svg.selectAll(".enter").attr("class", "exit");

        // Enter the new bars for the clicked-on data's parent.
        var enter = bar(d.parent)
          .attr("transform", function(d, i) { return "translate(0," + y * i * 1.2 + ")"; })
          .style("opacity", 1e-6);

        // Color the bars as appropriate.
        // Exiting nodes will obscure the parent bar, so hide it.
        enter.select("rect")
          .style("fill", function(d) { return z(!!d.children); })
          .filter(function(p) { return p === d; })
          .style("fill-opacity", 1e-6);

        // Update the x-scale domain.
        x.domain([0, d3.max(d.parent.children, function(d) { return d.value; })]).nice();

        // Update the x-axis.
        svg.selectAll(".x.axis").transition()
          .duration(duration * 2)
          .call(xAxis);

        // Transition entering bars to fade in over the full duration.
        var enterTransition = enter.transition()
          .duration(duration * 2)
          .style("opacity", 1);

        // Transition entering rects to the new x-scale.
        // When the entering parent rect is done, make it visible!
        enterTransition.select("rect")
          .attr("width", function(d) { return x(d.value); })
          .each("end", function(p) { if (p === d) d3.select(this).style("fill-opacity", null); });

        // Transition exiting bars to the parent's position.
        var exitTransition = exit.selectAll("g").transition()
          .duration(duration)
          .delay(function(d, i) { return i * delay; })
          .attr("transform", stack(d.index));

        // Transition exiting text to fade out.
        exitTransition.select("text")
          .style("fill-opacity", 1e-6);

        // Transition exiting rects to the new scale and fade to parent color.
        exitTransition.select("rect")
          .attr("width", function(d) { return x(d.value); })
          .style("fill", z(true));

        // Remove exiting nodes when the last child has finished transitioning.
        exit.transition().duration(duration * 2).remove();

        // Rebind the current parent to the background.
        svg.select(".background").data([d.parent]).transition().duration(duration * 2);
      }

      // Creates a set of bars for the given data node, at the specified index.
      function bar(d) {
        var bar = svg.insert("svg:g", ".y.axis")
          .attr("class", "enter")
          .attr("transform", "translate(0,5)")
          .selectAll("g")
          .data(d.children)
          .enter().append("svg:g")
          .style("cursor", function(d) { return !d.children ? null : "pointer"; })
          .on("click", down);

        bar.append("svg:text")
          .attr("x", -6) //function(d) { console.log(d.value);return d.value+5;}) //
          .attr("y", y / 2)
          .attr("dy", ".35em")
          .attr("text-anchor", "end")
          .text(function(d) { return d.key; });

        bar.append("svg:rect")
          .attr("width", function(d) { return x(d.value); })
          .attr("height", y);

        return bar;
      }

      // A stateful closure for stacking bars horizontally.
      function stack(i) {
        var x0 = 0;
        return function(d) {
          var tx = "translate(" + x0 + "," + y * i * 1.2 + ")";
          x0 += x(d.value);
          return tx;
        };
      }

      scope.$watch('data', function (nested) {
        if(!nested) return;
        var hierarchy = d3.layout.partition()
          .children(function(d) { return (typeof d.values == "number") ? null : d.values; })
          .value(function(d) { return (typeof d.values == "number") ? d.values : null; });

        nested = d3.nest()
          .key(function (d) {
            return d.departmentId;
          })
          .key(function (d) {
            return d.specialtyId;
          })
          .key(function (d) {
            return d.specofferTypeId;
          })
          .rollup(function (leaves) {
            return leaves.length;
          })
          .entries(nested);
        nested = {key: "FF", values:nested};

        hierarchy.nodes(nested);

        x.domain([0, nested.value]).nice();
        down(nested, 0);

      });
    }

    return {
      link: link,
      restrict: 'E',
      scope: {
        data: '='
      }
    };
  });
