'use strict';

var EventEmitter = require('events');
var sem = require('sem');

module.exports = function binding(template, element) {
  var evt = new EventEmitter();
  var tpl = template.clone({domBound: true});

  evt.on('update', function(locals) {
    element.innerHTML = sem.compile(tpl, locals).toString();
  });

  evt.on('new', function(newTpl) {
    tpl = newTpl;
  });

  evt.on('end', function() {
    evt.removeAllListeners();
  });

  return evt;
};
