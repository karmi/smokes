Smoke = Sammy('#container').createModel('smoke');

Smoke.extend({

  stats : function(callback) {
    var stats = {};
    var default_options = {
      include_docs : false,
      limit        : 1,
      descending   : true
    };
    var d = new Date();

    // TODO: Ask @quirkey how to work around this maddness :)
    Smoke.view('stats',
      $.extend({ group_level : 1, startkey: [d.getFullYear(), {}, {}]}, default_options), function(data) {
        if (data.rows[0]) { stats.year  = data.rows[0].value; }
        Smoke.view('stats',
          $.extend({ group_level : 2, startkey: [d.getFullYear(), d.getMonth()+1, {}] }, default_options), function(data) {
            if (data.rows[0]) { stats.month = data.rows[0].value; }
            Smoke.view('stats',
              $.extend({ group_level : 3, key: [d.getFullYear(), d.getMonth()+1, d.getDate()] }, default_options), function(data) {
                if (data.rows[0]) { stats.today = data.rows[0].value; }
                return callback(stats);
            });
         });
    });
  }

});
