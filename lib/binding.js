'use strict';

var sem = require('sem');
var inherits = require('util').inherits;
var Buffer = require('buffer/').Buffer;
var EventEmitter = require('events');

function Binding(source, data, opts) {
  EventEmitter.call(this);
  this.template = sem.parse(new Buffer(source), opts);
  this.data = {};

  for (var name in data) {
    this.register(name, data[name], true);
  }

  this.refresh();
}

inherits(Binding, EventEmitter);

Binding.prototype.refresh = function() {
  console.log(this.data);
  this.source = sem.compile(this.template, this.data);
  this.emit('update', this.source);
};

Binding.prototype.reference = function(source, opts) {
  this.template = sem.parse(new Buffer(source), opts);
  this.emit('reference', this.template);
};

Binding.prototype.register = function(name, val, quietly) {
  var self = this;
  this.data[name] = val;
  Object.defineProperty(this, name, {
    set: function(val) {
      self.data[name] = val;
      self.refresh();
      return val;
    },
    get: function() {
      return self.data[name];
    }
  });
  this.emit('register', name, val);
  if (!quietly) {
    this.refresh();
  }
  return this;
};

module.exports = Binding;
