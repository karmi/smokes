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
        bottom_ticks_height = 45,
        w = $(window).width()-left_margin-right_margin,
        h = 100+bottom_ticks_height,
        max =  pv.max(data.rows, function() { return data.rows[this.index].value; }),
        x = pv.Scale.linear(0, data.rows.length-1).range(0, w),
        y = pv.Scale.linear(0, max).range(0, h-bottom_ticks_height);

    var utils = {
      value_to_color : function(d) {
        switch(d) { case 0: return 'none'; case 10: return '#386E8B'; case 15: return '#702F43'; default: return '#333'; }; }
    },
       months = [null, 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    /* The root panel. */
    var vis = new pv.Panel()
        .width(w)
        .height(h)
        .left(left_margin)
        .top(top_margin);

    /* Y-axis guides and ticks. */
    vis.add(pv.Rule)
        .data(y.ticks(5))
        .bottom(function(d) { return bottom_ticks_height+y(d); })
        .strokeStyle( function(d) { return utils.value_to_color(d) } )
      .anchor("left").add(pv.Label)
        .text(y.tickFormat)
        .textStyle( function(d) { return utils.value_to_color(d) } );

    /* X-axis: Years */
    vis.add(pv.Rule)
        .data(data.rows)
        .def("previous_year", data.rows[0].key.slice(0, 1)-1)
        .left(function(d) { return x(this.index); })
        .bottom(0)
        .height(45)
        .strokeStyle('none')
        .visible( function(d) {
          var current_year = d.key.slice(0, 1), visible = current_year > this.previous_year();
          this.previous_year( current_year );
          return visible;
        })
      .anchor("left").add(pv.Dot)
        .left( function(d) { return x(this.index); } )
        .shape('bar')
        .lineWidth(1)
        .strokeStyle('#333')
        .size(45)
      .anchor("right").add(pv.Label)
        .left( function(d) { return x(this.index)+3; } )
        .text( function(d) { return d.key.slice(0, 1); } )
        .font('20px sans-serif')
        .textStyle('#333')
        .textMargin('0');

    /* X-axis: Months */
    vis.add(pv.Rule)
        .data(data.rows)
        .def("previous_month", data.rows[1].key[1]-1)
        .left(function(d) { return x(this.index); })
        .bottom(40)
        .height(10)
        .strokeStyle('none')
        .visible( function(d) {
          var current_month = d.key[1], visible = current_month != this.previous_month();
          console.log('current ' + current_month, 'previous: ' + this.previous_month());
          this.previous_month( current_month );
          return visible;
        })
      .anchor("right").add(pv.Label)
        .left( function(d) { return x(this.index)+3; } )
        .text( function(d) { return months[ d.key[1] ]; } )
        .font('10px sans-serif')
        .textBaseline('top')
        .textStyle('#333')
        .textMargin('0');

    /* The area with top line. */
    vis.add(pv.Area)
        .data(data.rows)
        .bottom(bottom_ticks_height)
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
