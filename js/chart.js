Chart = {

  draw : function(data) {
    console.log('Drawing, ', data);
    /* Sizing and scales. */
    var w = $(window).width(),
        h = 100,
        max =  pv.max(data.rows, function() { return data.rows[this.index].value; }),
        x = pv.Scale.linear(0, data.rows.length-1).range(0, w),
        y = pv.Scale.linear(0, max).range(0, h);

    /* The root panel. */
    var vis = new pv.Panel()
        .width(w)
        .height(h);

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
