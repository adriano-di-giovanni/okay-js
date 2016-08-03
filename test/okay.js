(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['lodash'], function (_) {
      return (root.okay = factory(_));
    });
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('underscore'));
  } else {
    root.okay = factory(root._);
  }
}(this, function (_) {
  var exports = {};

  var isArray = _.isArray;
  var isBoolean = _.isBoolean;
  var isDate = _.isDate;
  var isEmpty = _.isEmpty;
  var isFunction = _.isFunction;
  var isNumber = _.isNumber;
  var isObject = _.isObject;
  var isString = _.isString;
  var map = _.map;
  var partial = _.partial;
  var reduce = _.reduce;
  var toArray = _.toArray;

  var createRule = exports.createRule = function createRule(descriptor) {
    var param = descriptor.param;
    var resolve = descriptor.resolve;
    var rule = function (value, context) {
      var _value = isFunction(value) ? value(context) : value;
      var _param = isFunction(param) ? param(context) : param;
      return resolve(_value, _param, context);
    };
    return rule;
  };

  var compose = exports.compose = function compose() {
    var rules = toArray(arguments);
    return function (value, context) {
      return map(rules, function (rule) {
        return rule(value, context);
      });
    };
  };

  var iteratee$all = function iteratee$all(previousValue, currentValue) {
    return previousValue && currentValue;
  };
  var resolve$all = function resolve$all(value, param, context) {
    return reduce(compose.apply(null, param)(value, context), iteratee$all, true);
  };
  exports.all = function and() {
    return createRule({
      param: arguments,
      resolve: resolve$all
    });
  };


  var iteratee$any = function iteratee$any(previousValue, currentValue) {
    return previousValue || currentValue;
  };
  var resolve$any = function resolve$any(value, param, context) {
    return reduce(compose.apply(null, param)(value, context), iteratee$any, false);
  };
  exports.any = function or() {
    return createRule({
      param: arguments,
      resolve: resolve$any
    });
  };

  var resolve$invokeIf = function resolve$invokeIf(value, param, context) {
    var rule = param.rule;
    var callback = param.callback;
    var returnValue = rule(value);
    returnValue && callback(value, context);
    return returnValue;
  };
  exports.invokeIf = function invokeIf(rule, callback) {
    return createRule({
      param: {
        rule: rule,
        callback: callback
      },
      resolve: resolve$invokeIf
    })
  };

  var resolve$invokeIfNot = function resolve$invokeIfNot(value, param, context) {
    var rule = param.rule;
    var callback = param.callback;
    var returnValue = rule(value);
    ! returnValue && callback(value, context);
    return returnValue;
  };
  exports.invokeIfNot = function invokeIfNot(rule, callback) {
    return createRule({
      param: {
        rule: rule,
        callback: callback
      },
      resolve: resolve$invokeIfNot
    })
  };

  var resolve$invoke = function resolve$invoke(value, param, context) {
    var rule = param.rule;
    var ifCallback = param.ifCallback;
    var ifNotCallback = param.ifNotCallback;
    var returnValue = rule(value);
    var callback = returnValue ? ifCallback : ifNotCallback;
    callback(value, context);
    return returnValue;
  };
  exports.invoke = function invoke(rule, ifCallback, ifNotCallback) {
    return createRule({
      param: {
        rule: rule,
        ifCallback: ifCallback,
        ifNotCallback: ifNotCallback
      },
      resolve: resolve$invoke
    });
  };

  exports.array = function array() {
    return createRule({
      resolve: isArray
    });
  };

  exports.boolean = function boolean() {
    return createRule({
      resolve: isBoolean
    })
  };

  exports.date = function date() {
    return createRule({
      resolve: isDate
    });
  };

  var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var resolve$email = function resolve$email(value, param) {
    return param.test(value);
  };
  exports.email = function email() {
    return createRule({
      param: emailRegExp,
      resolve: resolve$email
    });
  };

  var resolve$eq = function resolve$eq(value, param) {
    return value == param;
  };
  exports.eq = function eq(param) {
    return createRule({
      param: param,
      resolve: resolve$eq
    });
  };

  var resolve$gt = function resolve$gt(value, param) {
    return value > param;
  };
  exports.gt = function gt(param) {
    return createRule({
      param: param,
      resolve: resolve$gt
    });
  };

  var resolve$gte = function resolve$gte(value, param) {
    return value >= param;
  };
  exports.gte = function gte(param) {
    return createRule({
      param: param,
      resolve: resolve$gte
    });
  };

  var resolve$lt = function resolve$lt(value, param) {
    return value < param;
  };
  exports.lt = function lt(param) {
    return createRule({
      param: param,
      resolve: resolve$lt
    });
  };

  var resolve$lte = function resolve$lte(value, param) {
    return value <= param;
  };
  exports.lte = function lte(param) {
    return createRule({
      param: param,
      resolve: resolve$lte
    });
  };

  exports.number = function number() {
    return createRule({
      resolve: isNumber
    });
  };

  exports.object = function object() {
    return createRule({
      resolve: isObject
    });
  };

  exports.partial = partial;

  var resolve$pattern = function resolve$pattern(value, param) {
    return param.test(value);
  };
  exports.pattern = function pattern(param) {
    return createRule({
      param: param,
      resolve: resolve$pattern
    });
  };

  var resolve$required = function resolve$required(value) {
    return ! isEmpty(value);
  };
  exports.required = function required() {
    return createRule({
      resolve: resolve$required
    });
  };

  exports.string = function string() {
    return createRule({
      resolve: isString
    });
  };

  return exports;
}));
