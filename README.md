# Virtual Style Sheets
> Data-binding in JavaScript and CSS.

Virtual Style Sheets (vss) provides a system based on top of [`sem`](https://github.com/jamen/sem) and `EventEmitter` that gives you a data-binding interface with CSS.  With this, you can easily script your styles dynamically while on top of an easy to use API.

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
**Notice:** Vss is in early stages. It is not to be used in any sort of production environment [until `v1` is reached][v1].

## Credits
| ![jamen][avatar] |
|:---:|
| [Jamen Marzonie][github] |

  [avatar]: https://avatars.githubusercontent.com/u/6251703?v=3&s=125
  [github]: https://github.com/jamen
  [v1]: https://github.com/jamen/vss/milestones/v1
