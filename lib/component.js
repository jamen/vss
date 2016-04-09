'use strict';

var sem = require('sem');
var EventEmitter = require('events');
var Buffer = require('buffer/').Buffer;

function Component(raw, data, opts) {
  var self = this;
  this.template = sem.parse(new Buffer(raw), opts);
  this.binding = new EventEmitter();
  this.data = data || {};
  this.contents = null;

  // Create refresh event.
  this.binding.on('refresh', function() {
    self.contents = sem.compile(self.template, self.data);
    self.binding.emit('update', self.contents);
  });

  // Call to start
  this.binding.emit('refersh');

  // Start animation frame loop
  this.animationFrame();

  // Register setters
  this.template.pos.forEach(function(item) {
    self._register(item[0]);
  });
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
