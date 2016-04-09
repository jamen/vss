var vss = require('../lib');
var $ = require('jquery');

$(function() {
  var css = vss({
    el: $('#vss')[0],
    data: {
      width: '100px'
    }
  });

  var input = $('#input');
  input.on('keyup', function() {
    css.width = input.val();
  });
});
