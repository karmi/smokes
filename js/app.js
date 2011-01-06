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
      var count = parseInt(data.today);
      if (count > 0) { today.removeClass('zero'); };
      (function() {
        var original_value = parseInt(today.text()) || 0;
        var current_value  = data.today || 0;
        var update_value = function(value) { return today.text(value); };
        var update_class = function(value) {
          var classname = '';
          if (value < 6) { classname = 'lo';   };
          if (value > 6) { classname = 'mid';  };
          if (value > 8) { classname = 'hi';   };
          today.addClass(classname);
        };
        for (var i=0; i < current_value; i++) {
          setTimeout(update_value, i*75, i);
          setTimeout(update_class, i*75, i);
        };
      })();
      // Update average count
      $('#average .value').text( data.average );
      // Draw chart
      Chart.draw(data.data);
    });

    // -- Routes

    this.get('#/', function(context) {
      Smoke.stats( function(data) { context.trigger( 'stats-loaded', data ); } );
    });

    this.post('#/create', function(context) {
      $('#button img').show('fast').fadeOut('slow').delay(150);
      Smoke.create(this.params['smoke'], function() { context.redirect('#/'); });
      ;
    });

  });

  $(function() {
    app.run('#/');
  });

})(jQuery);
