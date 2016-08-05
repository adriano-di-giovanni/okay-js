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

  var createRule = exports.createRule = function createRule(resolve, param) {
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
  exports.all = function and() {
    return createRule(_resolveAll, arguments);
  };

  var _iterateeAny = function _iterateeAny(previousValue, currentValue) {
    return previousValue || currentValue;
  };
  var _resolveAny = function _resolveAny(value, param, context) {
    return reduce(compose.apply(null, param)(value, context), _iterateeAny, false);
  };
  exports.any = function or() {
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
  exports.callIf = function callIf(rule, thenCallback, elseCallback) {
    if (!isFunction(rule)) {
      throw new Error('`rule` is not a function');
    }
    if (thenCallback != null && !isFunction(thenCallback)) {
      throw new Error('`thenCallback` is not a function');
    }
    if (elseCallback != null && !isFunction(thenCallback)) {
      throw new Error('`elseCallback` is not a function');
    }
    return createRule(_resolveCallIf, arguments);
  };

  exports.array = function array() {
    return createRule(isArray);
  };

  exports.boolean = function boolean() {
    return createRule(isBoolean);
  };

  exports.date = function date() {
    return createRule(isDate);
  };

  var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var _email = function _email(value, param) {
    return param.test(value);
  };
  exports.email = function email() {
    return createRule(_email, emailRegExp);
  };

  var _eq = function _eq(value, param) {
    return value == param;
  };
  exports.eq = function eq(param) {
    return createRule(_eq, param);
  };

  var _gt = function _gt(value, param) {
    return value > param;
  };
  exports.gt = function gt(param) {
    if (param == null) {
      throw new Error('`param` is missing');
    }
    return createRule(_gt, param);
  };

  var _gte = function _gte(value, param) {
    return value >= param;
  };
  exports.gte = function gte(param) {
    if (param == null) {
      throw new Error('`param` is missing');
    }
    return createRule(_gte, param);
  };

  var _lt = function _lt(value, param) {
    return value < param;
  };
  exports.lt = function lt(param) {
    if (param == null) {
      throw new Error('`param` is missing');
    }
    return createRule(_lt, param);
  };

  var _lte = function _lte(value, param) {
    return value <= param;
  };
  exports.lte = function lte(param) {
    if (param == null) {
      throw new Error('`param` is missing');
    }
    return createRule(_lte, param);
  };

  exports.number = function number() {
    return createRule(isNumber);
  };

  exports.object = function object() {
    return createRule(isObject);
  };

  exports.partial = partial;

  var _pattern = function _pattern(value, param) {
    return param.test(value);
  };
  exports.pattern = function pattern(param) {
    if (!isRegExp(param)) {
      throw new Error('`param` is not a regular expression');
    }
    return createRule(_pattern, param);
  };

  var _required = function _required(value) {
    return value != null && value !== '';
  };
  exports.required = function required() {
    return createRule(_required);
  };

  exports.string = function string() {
    return createRule(isString);
  };

  return exports;
}));
