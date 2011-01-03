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
    var week_ago  = new Date( today.getTime() - (day*7) );

    // TODO: Ask @quirkey how to work around this maddness :)
    // Year
    Smoke.view('stats',
      $.extend(default_options,
               { group_level : 1,
                 startkey: [today.getFullYear(), {}, {}]}), function(data) {
        if (data.rows[0]) { stats.year  = data.rows[0].value; }
        // Month
        Smoke.view('stats',
          $.extend(default_options,
                   { group_level : 2,
                     startkey: [today.getFullYear(), today.getMonth()+1, {}] }), function(data) {
            if (data.rows[0]) { stats.month = data.rows[0].value; }
            // Week
            Smoke.view('stats',
              $.extend(default_options,
                       { group_level : 3,
                         startkey: [week_ago.getFullYear(), week_ago.getMonth()+1, week_ago.getDate()],
                         endkey:   [today.getFullYear(), today.getMonth()+1,today.getDate()],
                         limit:    7,
                         descending: false }), function(data) {
                if (data.rows[0]) { stats.week = data.rows[0].value; }
                // Yesterday
                Smoke.view('stats',
                  $.extend(default_options,
                           { group_level : 3,
                             key: [yesterday.getFullYear(), yesterday.getMonth()+1,yesterday.getDate()] }), function(data) {
                    if (data.rows[0]) { stats.yesterday = data.rows[0].value; }
                    // Today
                    Smoke.view('stats',
                      $.extend(default_options,
                               { group_level : 3, key: [today.getFullYear(), today.getMonth()+1, today.getDate()] }), function(data) {
                        if (data.rows[0]) { stats.today = data.rows[0].value; }
                        return callback(stats);
                    });
                });
            });
         });
    });
  }

});
