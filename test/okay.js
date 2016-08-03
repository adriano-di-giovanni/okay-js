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
  var reduce = _.reduce;
  var toArray = _.toArray;

  var createRule = exports.createRule = function createRule(descriptor) {
    var param = descriptor.param;
    var resolve = descriptor.resolve;
    var rule = function (value) {
      var _value = isFunction(value) ? value() : value;
      var _param = isFunction(param) ? param() : param;
      return resolve(_value, _param);
    };
    rule.__param = param;
    return rule;
  };

  var compose = exports.compose = function compose() {
    var rules = toArray(arguments);
    return function (value) {
      return map(rules, function (rule) {
        return rule(value);
      });
    };
  };

  var iteratee$and = function iteratee$and(previousValue, currentValue) {
    return previousValue && currentValue;
  };
  var resolve$and = function resolve$and(value, param) {
    return reduce(compose.apply(null, param)(value), iteratee$and, true);
  };
  exports.all = exports.and = function and() {
    return createRule({
      param: arguments,
      resolve: resolve$and
    });
  };


  var iteratee$or = function iteratee$or(previousValue, currentValue) {
    return previousValue || currentValue;
  };
  var resolve$or = function resolve$or(value, param) {
    return reduce(compose.apply(null, param)(value), iteratee$or, false);
  };
  exports.any = exports.or = function or() {
    return createRule({
      param: arguments,
      resolve: resolve$or
    });
  };

  var resolve$invokeIf = function resolve$invokeIf(value, param) {
    var rule = param.rule;
    var callback = param.callback;
    var context = param.context;
    var returnValue = rule(value);
    returnValue && callback.call(context, value, rule.__param);
    return returnValue;
  };
  exports.invokeIf = function invokeIf(rule, callback, context) {
    return createRule({
      param: {
        rule: rule,
        callback: callback,
        context: context
      },
      resolve: resolve$invokeIf
    })
  };

  var resolve$invokeIfNot = function resolve$invokeIfNot(value, param) {
    var rule = param.rule;
    var callback = param.callback;
    var context = param.context;
    var returnValue = rule(value);
    ! returnValue && callback.call(context, value, rule.__param);
    return returnValue;
  };
  exports.invokeIfNot = function invokeIfNot(rule, callback, context) {
    return createRule({
      param: {
        rule: rule,
        callback: callback,
        context: context
      },
      resolve: resolve$invokeIfNot
    })
  };

  var resolve$invoke = function resolve$invoke(value, param) {
    var rule = param.rule;
    var ifCallback = param.ifCallback;
    var ifNotCallback = param.ifNotCallback;
    var context = param.context;
    var returnValue = rule(value);
    var callback = returnValue ? ifCallback : ifNotCallback;
    callback.call(context, value, rule.__param);
    return returnValue;
  };
  exports.invoke = function invoke(rule, ifCallback, ifNotCallback, context) {
    return createRule({
      param: {
        rule: rule,
        ifCallback: ifCallback,
        ifNotCallback: ifNotCallback,
        context: context
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

  var emailRegExp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  var resolve$email = function resolve$email(value, param) {
    return param.test(value);
  };
  exports.email = function email() {
    return createRule({
      param: emailRegExp,
      resolve: resolve$email
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
