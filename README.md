# okay-js

A minimalistic functional validation library for Node.js and the browser.

It's a proof of concept. It's in alpha. It depends on [underscore.js](http://underscorejs.org/).

## Installation

## Examples

```javascript
var gt = okay.gt;
var validate = gt(5);
console.log(validate(6)); // outputs `true`
console.log(validate(5)); // outputs `false`
```

```javascript
var gt = okay.gt;
var lt = okay.lt;
var and = okay.and;
var validate = and(gt(0), lt(5));
console.log(validate(0)); // outputs `false`
console.log(validate(3)); // outputs `true`
console.log(validate(5)); // outputs `false`
```

```javascript
var string = okay.string;
var callback = function (value) {
  var message = ':value is not a string'
    .replace(':value', value);
  console.log(message);
}
var validate = callIfNot(string(), callback);
console.log(validate(1)); // outputs `1 is not a string` then `false`
```

## Random ideas

* validation language
* memoization
* remove deps or make okay work with both underscore and lodash
* asynchronous validation
