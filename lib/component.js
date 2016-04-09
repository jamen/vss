'use strict';

var sem = require('sem');
var EventEmitter = require('events');
var Buffer = require('buffer/').Buffer;

function Component(element) {
  var self = this;
  this.template = sem.parse(new Buffer(element.innerHTML));
  this.binding = new EventEmitter();
  this.el = element;
  this.data = {};

  // Create refresh event.
  this.binding.on('refresh', function() {
    self.el.innerHTML = sem.compile(self.template, self.data).toString();
  });

  // Register template items
  this.template.pos.forEach(function(item) {
    self._register(item[0]);
  });

  // Start animation frame loop
  this.animationFrame();
}

Component.prototype._register = function(name) {
  var self = this;
  Object.defineProperty(this, name, {
    set: function(val) {
      self.data[name] = val;
      self.binding.emit('refresh');
      return val;
    },
    get: function() {
      return self.data[name];
    }
  });
};

Component.prototype.animationFrame = function() {
  var self = this;
  return window.requestAnimationFrame(function() {
    self.binding.emit('refresh');
    window.requestAnimationFrame(self.animationFrame.bind(self));
  });
};

module.exports = Component;
