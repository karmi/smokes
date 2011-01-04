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
      // Update today count and color
      $('#today .value').text( data.today ).addClass(function() {
        var value     = parseInt(data.today);
        var classname = '';
        if (value > 0) { $(this).removeClass('zero'); };
        if (value < 6) { classname = 'lo';   };
        if (value > 6) { classname = 'mid';  };
        if (value > 8) { classname = 'hi';   };
        return classname;
      });
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
