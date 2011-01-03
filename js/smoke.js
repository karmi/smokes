Smoke = Sammy('#container').createModel('smoke');

Smoke.extend({

  stats : function(callback) {
    var stats = {};
    var default_options = {
      include_docs : false,
      limit        : 1,
      descending   : true
    };

    var day       = 86400000;
    var today     = new Date();
    var yesterday = new Date( today.getTime() - day );

    // TODO: Ask @quirkey how to work around this maddness :)
    // Year
    Smoke.view('stats',
      $.extend({ group_level : 1, startkey: [today.getFullYear(), {}, {}]}, default_options), function(data) {
        if (data.rows[0]) { stats.year  = data.rows[0].value; }
        // Month
        Smoke.view('stats',
          $.extend({ group_level : 2, startkey: [today.getFullYear(), today.getMonth()+1, {}] }, default_options), function(data) {
            if (data.rows[0]) { stats.month = data.rows[0].value; }
            // Yesterday
            Smoke.view('stats',
              $.extend({ group_level : 3, key: [yesterday.getFullYear(), yesterday.getMonth()+1,yesterday.getDate()] }, default_options), function(data) {
                if (data.rows[0]) { stats.yesterday = data.rows[0].value; }
                // Today
                Smoke.view('stats',
                  $.extend({ group_level : 3, key: [today.getFullYear(), today.getMonth()+1, today.getDate()] }, default_options), function(data) {
                    if (data.rows[0]) { stats.today = data.rows[0].value; }
                    return callback(stats);
                });
            });
         });
    });
  }

});
