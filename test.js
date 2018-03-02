var expect = require('expect');
var hrn = require('./index.js');

describe('hrn show be tested', function (t) {
  it('en KMGTPEZY', function () {
    // en KMGTPEZY
    expect(hrn(0)).toBe('0.0');
    expect(hrn(0)).toBe('0.0');
    expect(hrn(123)).toBe('123.0');
    expect(hrn(1234)).toBe('1.2 K');
    expect(hrn(1234000)).toBe('1.2 M');
    expect(hrn(1234000000)).toBe('1.2 G');
    expect(hrn(1234000000000)).toBe('1.2 T');
    expect(hrn(1234000000000000)).toBe('1.2 P');
    expect(hrn(1234000000000000000)).toBe('1.2 E');
    expect(hrn(1234000000000000000000)).toBe('1.2 Z');
    expect(hrn(1234000000000000000000000)).toBe('1.2 Y');
  });

  it('overflow', function () {
    // overflow
    expect(hrn(1234000000000000000000000000)).toBe('1234.0 Y');
  });

  it('string number', function () {
    // string number
    expect(hrn('1234000000000000000000000')).toBe('1.2 Y');
  });

  it('fixed = 0, 3', function () {
    // fixed = 0, 3
    expect(hrn(1234000000000000, 0)).toBe('1 P');
    expect(hrn(1234000000000, 3)).toBe('1.234 T');
  });

  it('formatter, zh_CN', function () {
    // formatter, zh_CN
    expect(hrn(0, 1, 'zh_CN')).toBe('0.0');
    expect(hrn(12, 1, 'zh_CN')).toBe('12.0');
    expect(hrn(123, 1, 'zh_CN')).toBe('1.2 百');
    expect(hrn(1234, 1, 'zh_CN')).toBe('1.2 千');
    expect(hrn(12340, 1, 'zh_CN')).toBe('1.2 万');
    expect(hrn(123400000, 1, 'zh_CN')).toBe('1.2 亿');
    expect(hrn(1234000000000, 1, 'zh_CN')).toBe('1.2 兆');
    expect(hrn(12340000000000000, 1, 'zh_CN')).toBe('1.2 京');
    expect(hrn(123400000000000000000, 1, 'zh_CN')).toBe('1.2 垓');
    expect(hrn(1234000000000000000000000, 1, 'zh_CN')).toBe('1.2 秭');
    // overflow
    expect(hrn(12340000000000000000000000000, 1, 'zh_CN')).toBe('12340.0 秭');

    // fixed
    expect(hrn(1234000000000, 0, 'zh_CN')).toBe('1 兆');
  });

  it('Customize', function () {
    // Customize
    var formatter = ['kmgtpezy'.split(''), 1e3];
    expect(hrn(1234000000, 1, formatter)).toBe('1.2 g');

    formatter = [['s', 'm', 'h', 'd'], [1, 60, 60, 24]];
    expect(hrn(0, 1, formatter)).toBe('0.0');
    expect(hrn(23, 1, formatter)).toBe('23.0 s');
    expect(hrn(23 * 60, 1, formatter)).toBe('23.0 m');
    expect(hrn(23 * 60 * 60, 1, formatter)).toBe('23.0 h');
    expect(hrn(23 * 60 * 60 * 24, 1, formatter)).toBe('23.0 d');
  });
});
