'use strict';
var test = require('tape');
var hrn = require('..');

test('hrn show be tested', function (t) {
  // en KMGTPEZY
  t.equal(hrn(123), '123.0');
  t.equal(hrn(1234), '1.2 K');
  t.equal(hrn(1234000), '1.2 M');
  t.equal(hrn(1234000000), '1.2 G');
  t.equal(hrn(1234000000000), '1.2 T');
  t.equal(hrn(1234000000000000), '1.2 P');
  t.equal(hrn(1234000000000000000), '1.2 E');
  t.equal(hrn(1234000000000000000000), '1.2 Z');
  t.equal(hrn(1234000000000000000000000), '1.2 Y');
  // overflow
  t.equal(hrn(1234000000000000000000000000), '1234.0 Y');
  
  // string number
  t.equal(hrn('1234000000000000000000000'), '1.2 Y');

  // fixed = 0, 3
  t.equal(hrn(1234000000000000, 0), '1 P');
  t.equal(hrn(1234000000000, 3), '1.234 T');

  // formatter, zh_CN
  t.equal(hrn(12, 1, 'zh_CN'), '12.0');
  t.equal(hrn(123, 1, 'zh_CN'), '1.2 百');
  t.equal(hrn(1234, 1, 'zh_CN'), '1.2 千');
  t.equal(hrn(12340, 1, 'zh_CN'), '1.2 万');
  t.equal(hrn(123400000, 1, 'zh_CN'), '1.2 亿');
  t.equal(hrn(1234000000000, 1, 'zh_CN'), '1.2 兆');
  t.equal(hrn(12340000000000000, 1, 'zh_CN'), '1.2 京');
  t.equal(hrn(123400000000000000000, 1, 'zh_CN'), '1.2 垓');
  t.equal(hrn(1234000000000000000000000, 1, 'zh_CN'), '1.2 秭');
  // overflow
  t.equal(hrn(12340000000000000000000000000, 1, 'zh_CN'), '12340.0 秭');

  // fixed 
  t.equal(hrn(1234000000000, 0, 'zh_CN'), '1 兆');

  // Customize
  var formatter = ['kmgtpezy'.split(''), 1e3];
  t.equal(hrn(1234000000, 1, formatter), '1.2 g');
  
  formatter = [['s', 'm', 'h', 'd'], [1, 60, 60, 24]];
  t.equal(hrn(23, 1, formatter), '23.0 s');
  t.equal(hrn(23 * 60, 1, formatter), '23.0 m');
  t.equal(hrn(23 * 60 * 60, 1, formatter), '23.0 h');
  t.equal(hrn(23 * 60 * 60 * 24, 1, formatter), '23.0 d');

  t.end();
});