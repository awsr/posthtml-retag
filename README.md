# PostHTML-ReTag <img align="right" height="100" title="PostHTML logo" src="http://posthtml.github.io/posthtml/logo.svg">

[![NPM][npm]][npm-url]

Convert HTML tags to a specified target type.

Before:
``` html
<html>
  <body>
    <!-- ... content -->
    <div retag="noscript">
      <div>
        <span>Noscript content</span>
      </div>
    </div>
    <div retag="template">
      <span>Some more content</span>
    </div>
  </body>
</html>
```

After:
``` html
<html>
  <body>
    <!-- ... content -->
    <noscript>
      <div>
        <span>Noscript content</span>
      </div>
    </noscript>
    <template>
      <span>Some more content</span>
    </template>
  </body>
</html>
```

## Install

```bash
npm install --save-dev posthtml-retag
```

## Usage

``` js
const fs = require('fs');
const posthtml = require('posthtml');
const retag = require('posthtml-retag');

const html = fs.readFileSync('./input.html', 'utf8');

posthtml(
  [
    retag({
      attr: 'retag',
      removeDisplayNone: false
    })
  ])
  .process(html)
  .then(result => fs.writeFileSync('./output.html', result.html));
```

## Options

#### `attr`

Type: `string`

Default: `retag`

Specify the attribute that stores the name of the tag you want to convert to.


#### `removeDisplayNone`

Type: `boolean`

Default: `false`

Set to `true` to also remove `display: none;` from the style attribute of the element being converted. If it's the only value in the style attribute, the style attribute will be removed.

```html
<div retag="template" style="display: none"></div>
```

```html
<template></template>
```

[npm]: https://img.shields.io/npm/v/posthtml-retag.svg
[npm-url]: https://npmjs.com/package/posthtml-retag
