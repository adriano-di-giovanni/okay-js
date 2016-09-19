/** @module */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['lodash'], function (_) {
      return (root.okay = factory(_));
    });
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('lodash'));
  } else {
    root.okay = factory(root._);
  }
}(this, function (_) {
  var exports = {};

  var every = _.every;
  var isArray = _.isArray;
  var isBoolean = _.isBoolean;
  var isDate = _.isDate;
  var isFunction = _.isFunction;
  var isNumber = _.isNumber;
  var isObject = _.isObject;
  var isRegExp = _.isRegExp;
  var isString = _.isString;
  var map = _.map;
  var partial = _.partial;
  var reduce = _.reduce;
  var toArray = _.toArray;

  /**
   * Creates a rule. Okay's rule creators wrap this method. You can use it to create your own rules.
   * @param {Function} resolve - A function defining the validation logic for the rule.
   * It is invoked with three arguments: `(value, param, context)`.
   * While `value` and `context` are from the rule invokation, `param` is from the creator invokation.
   * The `resolve` function must return a `Boolean` value.
   * @param {*} param - It is to be checked against `value` according to the validation logic
   * expressed by `resolve` function. If `param` is a function, it gets executed in order to get
   * the actual value.
   * @returns {Function} The rule function. It has to be invoked with a
   * mandatory `value` argument and an optional `context`. It always returns a
   * `Boolean`.
   */
  exports.createRule = function createRule(resolve, param) {
    if (!isFunction(resolve)) {
      throw new Error('`resolve` argument is missing or is not a function');
    }
    var rule = function (value, context) {
      var _value = isFunction(value) ? value(context) : value;
      var _param = isFunction(param) ? param(context) : param;
      var result = resolve(_value, _param, context);

      if (!isBoolean(result)) {
        throw new Error('rules must return a boolean value');
      }

      return result;
    };
    return rule;
  };
  var createRule = exports.createRule;

  var _iterateeCompose = function _iterateeCompose(rule) {
    return isFunction(rule);
  };
  var compose = exports.compose = function compose() {
    var rules = toArray(arguments);
    if (rules.length === 0) {
      throw new Error('rules are missing');
    }
    if (!every(rules, _iterateeCompose)) {
      throw new Error('rules must be of type function');
    }
    return function (value, context) {
      return map(rules, function (rule) {
        return rule(value, context);
      });
    };
  };

  var _iterateeAll = function _iterateeAll(previousValue, currentValue) {
    return previousValue && currentValue;
  };
  var _resolveAll = function _resolveAll(value, param, context) {
    return reduce(compose.apply(null, param)(value, context), _iterateeAll, true);
  };
  /**
   * Rule creator. The created rule checks the given value against all rules and acts as a logical AND.
   *
   * @param {...Function} rules
   * @returns {Function} The rule function. It has to be invoked with a
   * mandatory `value` argument and an optional `context`. It always returns a
   * `Boolean`.
   *
   * @example
   * var gt = okay.gt;
   * var lt = okay.lt;
   * var all = okay.all;
   * var validate = all(gt(0), lt(5));
   * console.log(validate(-1)); // false
   * console.log(validate(6)); // false
   * console.log(validate(3)); // true
   */
  exports.all = function all() {
    return createRule(_resolveAll, arguments);
  };

  var _iterateeAny = function _iterateeAny(previousValue, currentValue) {
    return previousValue || currentValue;
  };
  var _resolveAny = function _resolveAny(value, param, context) {
    return reduce(compose.apply(null, param)(value, context), _iterateeAny, false);
  };
  /**
   * Rule creator. The created rule checks the given value against all rules and acts as a logical OR.
   *
   * @param {...Function} rules
   * @returns {Function} the rule function
   *
   * @example
   * var any = okay.any;
   */
  exports.any = function any() {
    return createRule(_resolveAny, arguments);
  };

  var _resolveCallIf = function _resolveCallIf(value, param, context) {
    var rule = param[0];
    var thenCallback = param[1];
    var elseCallback = param[2];
    var result = rule(value, context);
    var callback = result ? thenCallback : elseCallback;
    callback(value, context);
    return result;
  };
  /**
   * Rule creator. The created rule checks the given value against `rule` and
   * calls `thenCallback` if value is valid. Otherwise, it calls `elseCallback`.
   *
   * @param {Function} rule
   * @param {?Function} thenCallback - A function that's invoked if `rule`
   * validates the value given to `callIf`. `thenCallback` is invoked with two
   * arguments: `(value, context)`.
   * @param {?Function} elseCallback - A function that's invoked if `rule`
   * doesn't validate the value given to `callIf`. `elseCallback` is invoked
   * with two arguments: `(value, context)`.
   * @returns {Function} The rule function. It has to be invoked with a
   * mandatory `value` argument and an optional `context`. It always returns a
   * `Boolean`.
   *
   * @example
   * var string = okay.string;
   * var thenCallback = function (value) {
   *   var message = ':value is a string'
   *     .replace(':value', value);
   *   console.log(message);
   * };
   * var elseCallback = function (value) {
   *   var message = ':value is not a string'
   *     .replace(':value', value);
   *   console.log(message);
   * };
   * var validate = callIf(string(), thenCallback, elseCallback);
   * validate('1'); // 1 is a string
   * validate(1); // 1 is not a string
   */
  exports.callIf = function callIf(rule, thenCallback, elseCallback) {
    if (!isFunction(rule)) {
      throw new Error('`rule` is not a function');
    }
    if (thenCallback != null && !isFunction(thenCallback)) {
      throw new Error('`thenCallback` is not a function');
    }
    if (elseCallback != null && !isFunction(elseCallback)) {
      throw new Error('`elseCallback` is not a function');
    }
    return createRule(_resolveCallIf, arguments);
  };

  /**
   * Rule creator. The created rule validates that a value is an array
   *
   * @returns {Function} the rule function
   *
   * @example
   * var array = okay.array;
   * var validate = array();
   * console.log(validate({})); // false
   * console.log(validate([])); // true
   */
  exports.array = function array() {
    return createRule(isArray);
  };

  /**
   * Rule creator. The created rule validates that a value is a boolean
   *
   * @returns {Function} the rule function
   *
   * @example
   * var boolean = okay.boolean;
   * var validate = boolean();
   * console.log(validate(0)); // false
   * console.log(validate(false)); // true
   */
  exports.boolean = function boolean() {
    return createRule(isBoolean);
  };

  /**
   * Rule creator. The created rule validates that a value is a Javascript Date object
   *
   * @returns {Function} The rule function. It has to be invoked with a
   * mandatory `value` argument and an optional `context`. It always returns a
   * `Boolean`.
   *
   * @example
   * var date = okay.date;
   * var validate = date();
   * console.log(validate({})); // false
   * console.log(validate(new Date())); // true
   */
  exports.date = function date() {
    return createRule(isDate);
  };

  var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var _email = function _email(value, param) {
    return param.test(value);
  };
  /**
   * Rule creator. The created rule validates that a value is a valid email address.
   *
   * @returns {Function} The rule function. It has to be invoked with a
   * mandatory `value` argument and an optional `context`. It always returns a
   * `Boolean`.
   *
   * @example
   * var email = okay.email;
   * var validate = email();
   * console.log(validate('string')); // false
   * console.log(validate('user@domain.com')); // true
   */
  exports.email = function email() {
    return createRule(_email, emailRegExp);
  };

  var _eq = function _eq(value, param) {
    return value == param;
  };
  /**
   * Rule creator. The created rule validates that a number is equal to a value.
   *
   * @param {Number|Function} param - A number or a function returning a number.
   * @returns {Function} The rule function. It has to be invoked with a
   * mandatory `value` argument and an optional `context`. It always returns a
   * `Boolean`.
   *
   * @example
   * var eq = okay.eq;
   * var validate = eq(5);
   * console.log(validate(6)); // false
   * console.log(validate(5)); // true
   */
  exports.eq = function eq(param) {
    return createRule(_eq, param);
  };

  var _gt = function _gt(value, param) {
    return value > param;
  };
  /**
   * Rule creator. The created rule validates that a number is less than or equal to a value.
   *
   * @param {Number|Function} param - A number or a function returning a number.
   * @returns {Function} The rule function. It has to be invoked with a
   * mandatory `value` argument and an optional `context`. It always returns a
   * `Boolean`.
   *
   * @example
   * var gt = okay.gt;
   * var validate = gt(5);
   * console.log(validate(5)); // false
   * console.log(validate(6)); // true
   */
  exports.gt = function gt(param) {
    if (param == null) {
      throw new Error('`param` is missing');
    }
    return createRule(_gt, param);
  };

  var _gte = function _gte(value, param) {
    return value >= param;
  };
  /**
   * Rule creator. The created rule validates that a number is greater than or equal to a value
   *
   * @param {Number|Function} param - A value or a function returning a number
   * @returns {Function} The rule function. It has to be invoked with a
   * mandatory `value` argument and an optional `context`. It always returns a
   * `Boolean`.
   *
   * @example
   * var gte = okay.gte;
   * var validate = gte(5);
   * console.log(validate(4)); // false
   * console.log(validate(5)); // true
   * console.log(validate(6)); // true
   */
  exports.gte = function gte(param) {
    if (param == null) {
      throw new Error('`param` is missing');
    }
    return createRule(_gte, param);
  };

  var _lt = function _lt(value, param) {
    return value < param;
  };
  /**
   * Rule creator. The created rule validates that a number is less than a value
   *
   * @param {Number|Function} param - A number or a function returning a number
   * @returns {Function} The rule function. It has to be invoked with a
   * mandatory `value` argument and an optional `context`. It always returns a
   * `Boolean`.
   *
   * @example
   * var lt = okay.lt;
   * var validate = lt(5);
   * console.log(validate(5)); // false
   * console.log(validate(4)); // true
   */
  exports.lt = function lt(param) {
    if (param == null) {
      throw new Error('`param` is missing');
    }
    return createRule(_lt, param);
  };

  var _lte = function _lte(value, param) {
    return value <= param;
  };
  /**
   * Rule creator. The created rule validates that a number is less than or equal to a value
   *
   * @param {Number|Function} param - A number or a function returning a number.
   * @returns {Function} The rule function. It has to be invoked with a
   * mandatory `value` argument and an optional `context`. It always returns a
   * `Boolean`.
   *
   * @example
   * var lte = okay.lte;
   * var validate = lte(5);
   * console.log(validate(6)); // false
   * console.log(validate(5)); // true
   * console.log(validate(4)); // true
   */
  exports.lte = function lte(param) {
    if (param == null) {
      throw new Error('`param` is missing');
    }
    return createRule(_lte, param);
  };

  /**
   * Rule creator. The created rule validates that a value is a number.
   *
   * @returns {Function} The rule function. It has to be invoked with a
   * mandatory `value` argument and an optional `context`. It always returns a
   * `Boolean`..
   *
   * @example
   * var object = okay.number;
   * var validate = number();
   * console.log(validate('a')); // false
   * console.log(validate(1)); // true
   */
  exports.number = function number() {
    return createRule(isNumber);
  };

  /**
   * Rule creator. The created rule validates that a value is an object.
   *
   * @returns {Function} The rule function. It has to be invoked with a
   * mandatory `value` argument and an optional `context`. It always returns a
   * `Boolean`..
   *
   * @example
   * var object = okay.object;
   * var validate = object();
   * console.log(validate(1)); // false
   * console.log(validate({})); // true
   */
  exports.object = function object() {
    return createRule(isObject);
  };

  exports.partial = partial;

  var _pattern = function _pattern(value, param) {
    return param.test(value);
  };
  /**
   * Rule creator. The created rule validates that a value matches a regular expression.
   *
   * @param {RegExp|Function} param - A regular expression or a function returning a regular expression.
   * @returns {Function} The rule function. It has to be invoked with a
   * mandatory `value` argument and an optional `context`. It always returns a
   * `Boolean`.
   *
   * @example
   * var pattern = okay.pattern;
   * var validate = pattern(/[0-9]/);
   * console.log(validate('a')); // false
   * console.log(validate('1')); // true
   */
  exports.pattern = function pattern(param) {
    if (!isRegExp(param)) {
      throw new Error('`param` is not a regular expression');
    }
    return createRule(_pattern, param);
  };

  var _required = function _required(value) {
    return value != null && value !== '';
  };
  /**
   * Rule creator. The created rule validates that a value is non-blank.
   *
   * @returns {Function} The rule function. It has to be invoked with a
   * mandatory `value` argument and an optional `context`. It always returns a
   * `Boolean`..
   *
   * @example
   * var required = okay.required;
   * var validate = required();
   * console.log(validate(null)); // false
   * console.log(validate(void 0)); // false
   * console.log(validate('')); // false
   * console.log(validate(false)); // true
   */
  exports.required = function required() {
    return createRule(_required);
  };

  /**
   * Rule creator. The created rule validates that a given value is a string.
   *
   * @returns {Function} The rule function. It has to be invoked with a
   * mandatory `value` argument and an optional `context`. It always returns a
   * `Boolean`..
   *
   * @example
   * var string = okay.string;
   * var validate = string();
   * console.log(validate('1')); // true
   * console.log(validate(1)); // false
   */
  exports.string = function string() {
    return createRule(isString);
  };

  var _countries = [
    'it'
  ];
  var _italianTaxCodeRegExp = /^[A-Z]{6}[0-9]{2}[ABCDEHLMPRST]{1}[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{1}$/i;
  var _isItalianTaxCode = function _isItalianTaxCode(value) {
    if (!isString(value)) {
      return false;
    }
    if (!_italianTaxCodeRegExp.test(value)) {
      return false;
    }
    return true;
  };
  function _taxCode(value, param) {
    switch (param) {
      case 'it':
        return _isItalianTaxCode(value);
      default:
    }
  }
  /**
   * Rule creator. The created rule validates that a given value is a tax code.
   *
   * @param {String|Function} param - A ISO 3166 alpha-2 country code or a
   * function returning a ISO 3166 alpha-2 country code
   * @returns {Function} The rule function. It has to be invoked with a
   * mandatory `value` argument and an optional `context`. It always returns a `Boolean`.
   *
   * @example
   * var taxCode = okay.taxCode;
   * var validate = taxCode('it');
   * console.log(validate('DGVDRN78E02H501C')); // true
   */
  exports.taxCode = function taxCode(param) {
    if (!isString(param)) {
      throw new Error('`param` is not a string');
    }
    var _param = param.toLowerCase();
    if (_param.length !== 2 || _countries.indexOf(_param) === -1) {
      throw new Error('`param` is not an ISO 3166 alpha-2 country code');
    }
    return createRule(_taxCode, _param);
  };

  return exports;
}));
