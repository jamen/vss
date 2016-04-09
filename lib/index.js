'use strict';

var sem = require('sem');

exports = module.exports = function vss(opts) {
  if (typeof opts.el === 'string') {
    opts.el = document.querySelector(opts.el);
  }

  return new exports.Component(opts.el);
};

exports.Component = require('./component');

// exports.css = require('./css');
