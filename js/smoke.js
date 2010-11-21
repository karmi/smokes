Smoke = Sammy('#container').createModel('smoke');

Smoke.extend({

  viewStats: function(options, callback) {
    return Smoke.view('stats', $.extend({
      include_docs : false,
      group        : true
    }, options || {}), callback);
  }

});
