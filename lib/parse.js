'use strict';

var match = require('balanced-match');

function parse(source) {
  var doc = source.split(/\}[\s]*/);
  doc.pop();

  return doc.map(function(selector) {
    console.log(selector);
    return parse.selector(selector + '}');
  }).map(function(sel) {
    return {selector: sel.selector, body: parse.body(sel.body)};
  }).map(function(x) {
    return {
      selector: x.selector,
      body: x.body.map(function(prop) {
        return parse.property(prop);
      })
    };
  });
}

parse.selector = function(sel) {
  var attempt = match('{', '}', sel);
  if (attempt) {
    return {
      selector: attempt.pre,
      body: attempt.body
    };
  }

  return null;
};

parse.body = function(body) {
  var attempt = body.split(/;(?:\r\n|\n|\r)?/);
  if (attempt) {
    if (!attempt[attempt.length - 1]) {
      attempt.pop();
    }
    return attempt;
  }

  return null;
};

parse.property = function(prop) {
  var attempt = prop.split(/([A-Za-z\-]+)\:(.*)/);
  if (attempt) {
    attempt.pop();
    attempt.shift();
    return {
      prop: attempt[0],
      body: attempt[1]
    };
  }
  return null;
};

module.exports = parse;
