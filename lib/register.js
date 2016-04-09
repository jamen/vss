'use strict';

var vss = require('./vss');
var request = require('browser-request');
var each = require('async-each');

module.exports = function register(opts, callback) {
  var inline = document.querySelectorAll('style[type="text/vss"]');
  var external = document.querySelectorAll('link[type="text/vss"]');

  if (typeof opts.el === 'undefined') {
    var dynamicOutput = document.createElement('style');

    // Setup dynamicOutput
    dynamicOutput.setAttribute('type', 'text/css');
    dynamicOutput.innerHTML = '';
    document.getElementsByTagName('head')[0].appendChild(dynamicOutput);

    // Set raw inline output.
    var raw = [];
    Array.prototype.forEach.call(inline, function(x) {
      raw.push(x.innerHTML);
      x.parentNode.removeChild(x);
    });
    dynamicOutput.innerHTML = raw.join('');

    // Set raw external output.
    each(Array.prototype.slice.call(external), function(item, next) {
      const href = item.href;
      item.parentNode.removeChild(item);
      request(href, function(err, response, content) {
        next(err, content);
      });
    }, function(err, contents) {
      if (err) {
        throw err;
      }

      dynamicOutput.appendChild(document.createTextNode(contents.join('')));
      callback(vss(opts));
    });

    opts.el = dynamicOutput;
  }
};
