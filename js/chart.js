Chart = {

  draw : function(data) {
    console.log('Drawing, ', data);

    /* Reverse timeline */
    // TODO: Do a clone() of original data
    data.rows.reverse()

    /* Sizing and scales. */
    var left_margin = 20,
        right_margin = 0,
        top_margin  = 5,
        w = $(window).width()-left_margin-right_margin,
        h = 100,
        max =  pv.max(data.rows, function() { return data.rows[this.index].value; }),
        x = pv.Scale.linear(0, data.rows.length-1).range(0, w),
        y = pv.Scale.linear(0, max).range(0, h);

    var utils = {
      value_to_color : function(d) {
        switch(d) { case 0: return 'none'; case 10: return '#386E8B'; case 15: return '#702F43'; default: return '#333'; }; }
    };

    /* The root panel. */
    var vis = new pv.Panel()
        .width(w)
        .height(h)
        .left(left_margin)
        .top(top_margin);

    /* Y-axis guides and ticks. */
    vis.add(pv.Rule)
        .data(y.ticks(5))
        .bottom(y)
        .strokeStyle( function(d) { return utils.value_to_color(d) } )
      .anchor("left").add(pv.Label)
        .text(y.tickFormat)
        .textStyle( function(d) { return utils.value_to_color(d) } );

    /* X-axis: Years */
    vis.add(pv.Rule)
        .data(data.rows)
        .left(function(d) { return x(this.index); })
        .bottom(5)
        .height(5)
      .anchor("right").add(pv.Label)
        .def("previous_year", data.rows[0].key.slice(0, 1)-1)
        .text( function(d) { return d.key.slice(0, 1); } )
        .visible( function(d) {
          var current_year = d.key.slice(0, 1), visible = current_year > this.previous_year();
          this.previous_year( current_year );
          return visible;
        })
        .textStyle('#666');

    /* The area with top line. */
    vis.add(pv.Area)
        .data(data.rows)
        .bottom(1)
        .left(function(d) { return x(this.index); })
        .height(function(d) { return y(d.value); })
        .fillStyle("none")
      .anchor("top").add(pv.Line)
        .interpolate('basis')
        .strokeStyle("white")
        .lineWidth(3);

    vis.canvas('chart');
    vis.render();
  }
  
};
