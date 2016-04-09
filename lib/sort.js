/** sort(AST)
  * This sorts dynamic properties and static properties into groups.
  */

var sem = require('sem');
var Buffer = require('buffer/').Buffer;

function sort(ast, opts) {
  var output = [];
  ast.forEach(function(sel) {
    var st = [];
    var dy = [];

    sel.body.forEach(function(prop) {
      var attempt = sem.parse(new Buffer(prop.body)).pos.length;
      if (attempt) {
        dy.push(prop);
      } else {
        st.push(prop);
      }
    });

    output.push({
      selector: sel.selector,
      body: st
    }, {
      selector: sel.selector,
      body: dy
    });
  });
  return output;
}

module.exports = sort;
