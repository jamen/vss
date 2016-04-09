/** linkAjax(el, data, opts)
  * Create a VSS binding to a <link> element's source
  */

var request = require('browser-request');
var link = require('./link');

function linkAjax(opts, parserOpts, callback) {
  if (typeof callback === 'undefined' && typeof parserOpts === 'function') {
    callback = parserOpts;
    parserOpts = {};
  }
  request(opts.url, function(err, res, body) {
    if (err) {
      return callback(err, null);
    }

    var el = document.createElement('style');
    el.setAttribute('type', 'text/css');
    el.setAttribute('data-ref', link);
    el.innerHTML = body;
    document.getElementsByTagName('head')[0].appendChild(el);

    callback(null, link(el, opts, parserOpts));
  });
}

module.exports = linkAjax;
