'use strict';

var sem = require('sem');
var Buffer = require('buffer/').Buffer;

exports = module.exports = function vss(options) {
  if (typeof options.el === 'string') {
    options.el = document.querySelector(options.el);
  }

  var tpl = sem.parse(
    new Buffer(options.el.innerHTML),
    {
      prefix: options.prefix,
      suffix: options.suffix
    }
  );

  return new exports.Component(tpl, options.el);
};

exports.Component = require('./component');
exports.binding = require('./binding');

// exports.css = require('./css');
