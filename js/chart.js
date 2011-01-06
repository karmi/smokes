Chart = {

  draw : function(data) {
    console.log('Drawing, ', data);

    /* Sizing and scales. */
    var w = $(window).width(),
        h = 60;

    /* The root panel. */
    var vis = new pv.Panel()
        .width(w)
        .height(h);

    /* Width of segment (day) */
    var segment_width = Math.round( w / (data.rows.length-1) )+1;

    /* The area with top line. */
    vis.add(pv.Area)
        .data(data.rows)
        .bottom(1)
        .left(function() { return this.index * segment_width; })
        .height(function(d) { return d.value; })
        .fillStyle("none")
      .anchor("top").add(pv.Line)
        .strokeStyle("white")
        .lineWidth(3);

    vis.canvas = 'chart';
    vis.render();
  }
  
};
