var vss = require('../lib');

document.addEventListener('DOMContentLoaded', function() {
  var inp = document.getElementById('inp');
  var styles = document.getElementById('styles');

  var css = vss({
    el: styles
  });

  css.test = '100';

  inp.onkeyup = function() {
    css.test = inp.value;
  };
});
