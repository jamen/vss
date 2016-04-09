var register = require('../lib').register;
var $ = require('jquery');

$(function() {
  // Registering all type="text/vss" elements.
  register({data: {
    height: '50px',
    width: '50px'
  }}, function(vss) {
    // Setup example data-binding.
    var w = $('#w');
    w.on('keyup', function() {
      vss.width = w.val();
    });

    var h = $('#h');
    h.on('keyup', function() {
      vss.height = h.val();
    });
  });
});
