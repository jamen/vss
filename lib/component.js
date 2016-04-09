'use strict';

var binding = require('./binding');

exports = module.exports = function Component(tpl, element) {
  var self = this;
  this.binding = binding(tpl, element);
  this.data = {};

  var props = {};
  tpl.pos.forEach(function(pos) {
    props[pos[0]] = {
      set: function(val) {
        self.data[pos[0]] = val;
        this.binding.emit('update', self.data);
        return val;
      },
      get: function() {
        return self.data[pos[0]];
      }
    };
  });

  Object.defineProperties(this, props);
};
