# PostHTML-ReTag [<img align="right" height="100" title="PostHTML logo" src="http://posthtml.github.io/posthtml/logo.svg">](https://github.com/posthtml/posthtml)

[![NPM][npm]][npm-url]

A [PostHTML](https://github.com/posthtml/posthtml) plugin for converting HTML tags to a specified target type.

Useful as part of a post-export script for visual editors that don't support certain tags, among other things.

**NOTE:** As of version 2.0.0 `retag` is a **named** import instead of a default one.

Before:

```html
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
npm install --save-dev posthtml posthtml-retag
```

## Usage

<details open><summary>CommonJS format</summary>

``` js
const fs = require('node:fs');
const posthtml = require('posthtml');
const { retag } = require('posthtml-retag');
// Import additional plugins (if any)

const html = fs.readFileSync('/path/to/input.html', 'utf8');

posthtml(
  [
    retag({
      attr: 'retag',
      removeDisplayNone: false
    }),
    // Additional plugins
  ])
  .process(html)
  .then(result => fs.writeFileSync('/path/to/output.html', result.html));
```
</details>

<details><summary>ES Module format</summary>

``` js
import { readFileSync, writeFileSync } from 'node:fs';
import posthtml from 'posthtml';
import { retag } from 'posthtml-retag';
// Import additional plugins (if any)

const html = readFileSync('/path/to/input.html', 'utf8');

posthtml(
  [
    retag({
      attr: 'retag',
      removeDisplayNone: false
    }),
    // Additional plugins
  ])
  .process(html)
  .then(result => writeFileSync('/path/to/output.html', result.html));
```
</details>

## Options

### `attr`

Type: `string`

Default: `retag`

Specify the attribute that stores the name of the tag you want to convert to.

### `removeDisplayNone`

Type: `boolean`

Default: `false`

Set to `true` to also remove `display: none;` from the style attribute of the element being converted. If it's the only value in the style attribute, the style attribute will be removed.

```html
<div retag="template" style="display: none">stuff</div>
```

```html
<template>stuff</template>
```

[npm]: https://img.shields.io/npm/v/posthtml-retag.svg
[npm-url]: https://npmjs.com/package/posthtml-retag
