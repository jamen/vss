/** link(el, data, opts)
  * Create a VSS binding to an element.
  */

var Binding = require('./binding');

function link(el, data, opts) {
  var binding = new Binding(el.innerHTML, data, opts);

  binding.on('update', function(data) {
    el.innerHTML = data.toString();
  });

  binding.refresh();
  return binding;
}

module.exports = link;
