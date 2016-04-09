'use strict';

var Component = require('./component');
var Buffer = require('buffer/').Buffer;

exports = module.exports = function vss(opts) {
  if (typeof opts === 'string' || opts instanceof Buffer) {
    return exports({source: new Buffer(opts)});
  }

  if (typeof opts === 'undefined') {
    opts = {};
  }

  if (typeof opts.el !== 'undefined') {
    if (typeof opts.el.jquery !== 'undefined') {
      opts.el = opts.el[0];
    }

    opts.source = new Buffer(opts.el.innerHTML);
  }

  const vss = new Component(opts.source, opts.data, opts);

  if (typeof opts.el !== 'undefined') {
    vss.binding.on('update', function(contents) {
      opts.el.innerHTML = contents.toString();
    });
  }

  return vss;
};
