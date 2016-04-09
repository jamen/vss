var vss = require('../lib');
var $ = require('jquery');

$(function() {
  vss.linkAjax({
    url: 'test.vss',
    width: '50px',
    height: '50px'
  }, function(error, css) {
    var width = $('#width');
    width.on('keyup', function() {
      css.width = width.val();
    });

    var height = $('#height');
    height.on('keyup', function() {
      css.height = height.val();
    });
  });
});
