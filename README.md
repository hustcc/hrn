# hrn

> **hrn** is short for **H**uman **R**eadable **N**umber, a simple javascript for browserjs / nodejs library to format number into human-readable string.


[![Build Status](https://travis-ci.org/hustcc/hrn.svg?branch=master)](https://travis-ci.org/hustcc/hrn) [![npm](https://img.shields.io/npm/v/hrn.svg?style=flat-square)](https://www.npmjs.com/package/hrn) [![npm](https://img.shields.io/npm/dt/hrn.svg?style=flat-square)](https://www.npmjs.com/package/hrn) [![npm](https://img.shields.io/npm/l/hrn.svg?style=flat-square)](https://www.npmjs.com/package/hrn)


# 1. Install

> **npm install --save hrn**


# 2. Import It

```js
var hrn = require('hrn');

//or

import hrn from 'hrn';
```


# 3. Usage & API

There is only one API named `hrn(number, fixed, formatter)`.

```js
hrn(1234000);                   // '1.2 M'
hrn(1234000, 3);                // '1.234 M'
hrn(1234000, 3, 'en');          // '1.234 M'
hrn(12340, 2, 'zh_CN');         // '1.23 万', `en` / `zh_CN` supported, `en` is default.

```

You can customize the number formatter.

```js
// format number
var formatter = ['kmgtpezy'.split(''), 1e3];
hrn('1234000', 1, formatter)    // '1.2 m'


// format time diff
formatter = [['s', 'm', 'h', 'd'], [1, 60, 60, 24]];
hrn(23, 1, formatter);					// '23.0 s' -> 23 seconds
hrn(23 * 60, 1, formatter);				// '23.0 m' -> 23 minutes
hrn(23 * 60 * 60, 1, formatter);		// '23.0 h' -> 23 hours
hrn(23 * 60 * 60 * 24, 1, formatter); 	// '23.0 d' -> 23 days
```


# 4. Test

> npm install
> 
> npm test


# 5. LICENSE

MIT@[hustcc](https://github.com)