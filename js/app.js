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
      context.render('templates/stats.ejs', { stats: data }).replace('#stats');
      $('#today .value').text( data.today );
      $('#average .value').text( data.average );
    });

    // -- Routes

    this.get('#/', function(context) {
      Smoke.stats( function(data) { context.trigger( 'stats-loaded', data ) } );
    });

    this.post('#/create', function(context) {
      console.log('CREATE')
      Smoke.create(this.params['smoke'], function() { context.redirect('#/') });
      ;
    });

  });

  $(function() {
    app.run('#/');
  });

})(jQuery);
