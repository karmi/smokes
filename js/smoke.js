Smoke = Sammy('#container').createModel('smoke');

Smoke.extend({

  stats : function(callback) {
    var stats = {};
    var default_options = {
      include_docs : false,
      limit        : 1
    };

    // TODO: Ask @quirkey how to work around this maddness :)
    Smoke.view('stats', $.extend({ group_level : 1, }, default_options), function(data) {
      if (typeof data.rows[0] == 'undefined') return callback(stats);
      stats.year  = data.rows[0].value;
      Smoke.view('stats', $.extend({ group_level : 2, }, default_options), function(data) {
        stats.month = data.rows[0].value;
        Smoke.view('stats', $.extend({ group_level : 3, }, default_options), function(data) {
          stats.today = data.rows[0].value;
          callback(stats);
         });
      });
    });
  }

});
