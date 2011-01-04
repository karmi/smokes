(function($) {

  var app = $.sammy('#container', function() {
    this.use('Couch')
        .use('EJS');

    // -- Application events

    this.bind('run', function() {
      var context = this;
    });

    this.bind('stats-loaded', function(e, data) {
      var context = this;
      console.log('Stats loaded:', data);
      // Render stats
      context.render('templates/stats.ejs', { stats: data }).replace('#stats');
      // Update today class and count (animated)
      var today = $('#today .value');
      today.addClass(function() {
        var value     = parseInt(data.today);
        var classname = '';
        if (value > 0) { $(this).removeClass('zero'); };
        if (value < 6) { classname = 'lo';   };
        if (value > 6) { classname = 'mid';  };
        if (value > 8) { classname = 'hi';   };
        return classname;
      });
      (function() {
        var original_value = parseInt(today.text()) || 0;
        var current_value  = data.today || 0;
        var update_value = function(value) { today.text(value); };
        for (var i=0; i < current_value; i++) {
          setTimeout(update_value, i*100, i);
        };
      })();
      // Update average count
      $('#average .value').text( data.average );
    });

    // -- Routes

    this.get('#/', function(context) {
      Smoke.stats( function(data) { context.trigger( 'stats-loaded', data ); } );
    });

    this.post('#/create', function(context) {
      Smoke.create(this.params['smoke'], function() { context.redirect('#/'); });
      ;
    });

  });

  $(function() {
    app.run('#/');
  });

})(jQuery);
