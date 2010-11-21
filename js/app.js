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
      console.log('LOADED', data);
      $.each(data, function(i, item) {
        context.render('templates/stats.ejs', { item: item }).replace('#stats');
      })
    });

    // -- Routes

    this.get('#/', function(context) {
      Smoke.viewStats({}, function(data) { context.trigger('stats-loaded', data.rows) })
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
