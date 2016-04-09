# vss
> Use VSS (Virtual Style Sheets) to enable data-binding with CSS.

VSS provides a _virtual style sheet_ system based on top of `EventEmitter` and [`sem`](https://github.com/jamen/sem).  This gives you a data-binding interface with CSS.

```javascript
var css = vss.link($('#style')[0], {
  width: 100
});

$('#btn').on('click', function() {
  css.width += 100;
});
```
```sass
.foo {
  width: #{width}px;
}
```

Use inside of browser with [Browserify](https://npmjs.com/browserify) or [Webpack](https://npmjs.com/webpack).

## Installation
```shell
$ npm install --save vss
```

## Usage
```javascript
var vss = require('vss');
```

## Credits
| ![jamen][avatar] |
|:---:|
| [Jamen Marzonie][github] |

  [avatar]: https://avatars.githubusercontent.com/u/6251703?v=3&s=125
  [github]: https://github.com/jamen
