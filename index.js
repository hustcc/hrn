/**
 *  the format is a Array (unix_array, hex_array)
 *  - unit_array (Array): the unit-text.
 *  - hex_array (Number): the power of 10.
 *
 * more format, please send a PR.
 */
var builtInFormatters = {
  en: ['KMGTPEZY'.split(''), 1e3],
  zh_CN: ['百千万亿兆京垓秭'.split(''), [100, 10, 10, 1e4, 1e4, 1e4, 1e4, 1e4]]
};

/**
 *  format( number, fixed, formatter ) -> String
 *  - number (Number): the number should be formated.
 *  - fixed (Number): the decimal number length.
 *  - formatter (String / Array): the unit of formated string. Can be `en` or `zh_CN`, or customize.
 *
 *  return the human-readable-number string
 */
module.exports = function(number, fixed, formatter) {
  number = Math.abs(number);
  // set default parameter `fixed`, default is 1.
  if (!fixed && fixed !== 0) fixed = 1;

  if (typeof formatter === 'object') {
    var name = new Date().getTime() + '';
    builtInFormatters[name] = formatter;
    formatter = name;
  }

  // default is `en`
  if (! builtInFormatters[formatter]) formatter = 'en';

  formatter = builtInFormatters[formatter];
  var power = 1,
    texts = formatter[0],
    powers = formatter[1],
    loop = 0,
    is_array = false;

  if (typeof powers === 'object') is_array = true;

  // calculate
  while (1) {
    // 如果是数组，则说明进制不一样
    if (is_array) power = powers[loop];
    // 否则进制一样
    else power = powers;

    if (number >= power && loop < texts.length) number /= power;
    else {
      number = number.toFixed(fixed);
      return loop === 0 ? number : number + ' ' + texts[loop - 1];
    }
    ++ loop;
  }
};