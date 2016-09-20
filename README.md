# Okay

Okay is a minimalistic functional validation library for Node.js and the browser.

It helps you streamline the validation of arguments, data and forms.

Okay aims to set you free from learning different, framework or environment dependent, convoluted APIs to validate your data. You can run it on the server as well as on the client. You can use it together with any library of your choice.

Okay depends on [lodash](https://lodash.com/).

It is tiny (< 1kB).

## Installation

```
npm install okay-js --save
```

## Usage

Okay helps you validate your data using **rules**.

A rule is a [pure function](https://en.wikipedia.org/wiki/Pure_function). It accepts a mandatory `value` argument and an optional `context`; it always returns a `Boolean`. If `value` is a function, it is invoked in order to get the actual value.

Rules are generated by **rule creators**.

A rule creator is a [higher order function](https://en.wikipedia.org/wiki/Higher-order_function) that creates a rule. It eventually accepts a single `param` argument. If `param` is a function, it is invoked in order to get the actual param. Okay's API mainly exposes rule creators. Also, you can define your own rule creators (and rules).

Let's see an example:

```javascript
var gt = okay.gt;
var validate = gt(5);
console.log(validate(6)); // true
console.log(validate(5)); // false
```

In the example above, <code>[okay.gt](#module_okay.gt)</code> is a rule creator. We call `gt(5)` in order to create a rule. The rule validates that a given value is greater than 5.

### Composing rules

We often need to validate our data against more than one rule. Okay lets you compose rules to perform complex validation:

```javascript
var gt = okay.gt;
var lt = okay.lt;
var all = okay.all;

var validate = all(gt(0), lt(5));

console.log(validate(-1)); // false
console.log(validate(6)); // false
console.log(validate(3)); // true
```

You can compose rules using <code>[okay.all](#module_okay.all)</code> (logical AND) and <code>[okay.any](#module_okay.any)</code> (logical OR) creators.

### Perform actions on validation

You can use the rule creator <code>[okay.callIf](#module_okay.callIf)</code> to perform actions on validation.

Let's see an example:

```javascript
var callIf = okay.callIf;
var string = okay.string;
var thenCallback = function (value) {
  var message = ':value is a string'
    .replace(':value', value);
  console.log(message);
};
var elseCallback = function (value) {
  var message = ':value is not a string'
    .replace(':value', value);
  console.log(message);
};
var validate = callIf(string(), thenCallback, elseCallback);
validate('1'); // 1 is a string
validate(1); // 1 is not a string
```

### Creating custom rules

You can create your own custom rules using <code>[okay.createRule](#module_okay.createRule)</code>

```javascript
var createRule = okay.createRule;

var resolve = function (value, param) {
  return value != param;
};
var ne = function (param) {
  return createRule(resolve, param);
};

var validate = ne(4);
console.log(validate(3)); // false
console.log(validate(4)); // true
```

## API Reference


* [okay](#module_okay)
    * [.createRule(resolve, param)](#module_okay.createRule) ⇒ <code>function</code>
    * [.all(...rules)](#module_okay.all) ⇒ <code>function</code>
    * [.any(...rules)](#module_okay.any) ⇒ <code>function</code>
    * [.not(rule)](#module_okay.not) ⇒ <code>function</code>
    * [.callIf(rule, thenCallback, elseCallback)](#module_okay.callIf) ⇒ <code>function</code>
    * [.array()](#module_okay.array) ⇒ <code>function</code>
    * [.boolean()](#module_okay.boolean) ⇒ <code>function</code>
    * [.date()](#module_okay.date) ⇒ <code>function</code>
    * [.email()](#module_okay.email) ⇒ <code>function</code>
    * [.empty()](#module_okay.empty) ⇒ <code>function</code>
    * [.eq(param)](#module_okay.eq) ⇒ <code>function</code>
    * [.gt(param)](#module_okay.gt) ⇒ <code>function</code>
    * [.gte(param)](#module_okay.gte) ⇒ <code>function</code>
    * [.lt(param)](#module_okay.lt) ⇒ <code>function</code>
    * [.lte(param)](#module_okay.lte) ⇒ <code>function</code>
    * [.number()](#module_okay.number) ⇒ <code>function</code>
    * [.object()](#module_okay.object) ⇒ <code>function</code>
    * [.pattern(param)](#module_okay.pattern) ⇒ <code>function</code>
    * [.required()](#module_okay.required) ⇒ <code>function</code>
    * [.string()](#module_okay.string) ⇒ <code>function</code>
    * [.taxCode(param)](#module_okay.taxCode) ⇒ <code>function</code>

<a name="module_okay.createRule"></a>

### okay.createRule(resolve, param) ⇒ <code>function</code>
Creates a rule. Okay's rule creators wrap this method. You can use it to create your own rules.

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - The rule function. It has to be invoked with a
mandatory `value` argument and an optional `context`. It always returns a
`Boolean`.  

| Param | Type | Description |
| --- | --- | --- |
| resolve | <code>function</code> | A function defining the validation logic for the rule. It is invoked with three arguments: `(value, param, context)`. While `value` and `context` are from the rule invokation, `param` is from the creator invokation. The `resolve` function must return a `Boolean` value. |
| param | <code>\*</code> | It is to be checked against `value` according to the validation logic expressed by `resolve` function. If `param` is a function, it gets executed in order to get the actual value. |

<a name="module_okay.all"></a>

### okay.all(...rules) ⇒ <code>function</code>
Rule creator. The created rule checks the given value against all rules and acts as a logical AND.

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - The rule function. It has to be invoked with a
mandatory `value` argument and an optional `context`. It always returns a
`Boolean`.  

| Param | Type |
| --- | --- |
| ...rules | <code>function</code> | 

**Example**  
```js
var gt = okay.gt;
var lt = okay.lt;
var all = okay.all;
var validate = all(gt(0), lt(5));
console.log(validate(-1)); // false
console.log(validate(6)); // false
console.log(validate(3)); // true
```
<a name="module_okay.any"></a>

### okay.any(...rules) ⇒ <code>function</code>
Rule creator. The created rule checks the given value against all rules and acts as a logical OR.

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - the rule function  

| Param | Type |
| --- | --- |
| ...rules | <code>function</code> | 

**Example**  
```js
var any = okay.any;
```
<a name="module_okay.not"></a>

### okay.not(rule) ⇒ <code>function</code>
Rule creator. The created rule checks the given value against the param rule and acts as a logical NOT.

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - the rule function  

| Param | Type |
| --- | --- |
| rule | <code>function</code> | 

**Example**  
```js
var required = okay.required;
var not = okay.not;
var validate = not(required());
console.log(validate(null)); // true
```
<a name="module_okay.callIf"></a>

### okay.callIf(rule, thenCallback, elseCallback) ⇒ <code>function</code>
Rule creator. The created rule checks the given value against `rule` and
calls `thenCallback` if value is valid. Otherwise, it calls `elseCallback`.

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - The rule function. It has to be invoked with a
mandatory `value` argument and an optional `context`. It always returns a
`Boolean`.  

| Param | Type | Description |
| --- | --- | --- |
| rule | <code>function</code> |  |
| thenCallback | <code>function</code> | A function that's invoked if `rule` validates the value given to `callIf`. `thenCallback` is invoked with two arguments: `(value, context)`. |
| elseCallback | <code>function</code> | A function that's invoked if `rule` doesn't validate the value given to `callIf`. `elseCallback` is invoked with two arguments: `(value, context)`. |

**Example**  
```js
var string = okay.string;
var thenCallback = function (value) {
  var message = ':value is a string'
    .replace(':value', value);
  console.log(message);
};
var elseCallback = function (value) {
  var message = ':value is not a string'
    .replace(':value', value);
  console.log(message);
};
var validate = callIf(string(), thenCallback, elseCallback);
validate('1'); // 1 is a string
validate(1); // 1 is not a string
```
<a name="module_okay.array"></a>

### okay.array() ⇒ <code>function</code>
Rule creator. The created rule validates that a value is an array

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - the rule function  
**Example**  
```js
var array = okay.array;
var validate = array();
console.log(validate({})); // false
console.log(validate([])); // true
```
<a name="module_okay.boolean"></a>

### okay.boolean() ⇒ <code>function</code>
Rule creator. The created rule validates that a value is a boolean

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - the rule function  
**Example**  
```js
var boolean = okay.boolean;
var validate = boolean();
console.log(validate(0)); // false
console.log(validate(false)); // true
```
<a name="module_okay.date"></a>

### okay.date() ⇒ <code>function</code>
Rule creator. The created rule validates that a value is a Javascript Date object

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - The rule function. It has to be invoked with a
mandatory `value` argument and an optional `context`. It always returns a
`Boolean`.  
**Example**  
```js
var date = okay.date;
var validate = date();
console.log(validate({})); // false
console.log(validate(new Date())); // true
```
<a name="module_okay.email"></a>

### okay.email() ⇒ <code>function</code>
Rule creator. The created rule validates that a value is a valid email address.

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - The rule function. It has to be invoked with a
mandatory `value` argument and an optional `context`. It always returns a
`Boolean`.  
**Example**  
```js
var email = okay.email;
var validate = email();
console.log(validate('string')); // false
console.log(validate('user@domain.com')); // true
```
<a name="module_okay.empty"></a>

### okay.empty() ⇒ <code>function</code>
Rule creator. The created rule validates that a value is a number.

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - The rule function. It has to be invoked with a
mandatory `value` argument and an optional `context`. It always returns a
`Boolean`..  
**Example**  
```js
var object = okay.empty;
var validate = empty();
console.log(validate(null)); // true
console.log(validate(true)); // true
console.log(validate(1)); // true
console.log(validate([1, 2, 3])); // false
console.log(validate({ a: 1 })); // false
```
<a name="module_okay.eq"></a>

### okay.eq(param) ⇒ <code>function</code>
Rule creator. The created rule validates that a number is equal to a value.

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - The rule function. It has to be invoked with a
mandatory `value` argument and an optional `context`. It always returns a
`Boolean`.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>Number</code> &#124; <code>function</code> | A number or a function returning a number. |

**Example**  
```js
var eq = okay.eq;
var validate = eq(5);
console.log(validate(6)); // false
console.log(validate(5)); // true
```
<a name="module_okay.gt"></a>

### okay.gt(param) ⇒ <code>function</code>
Rule creator. The created rule validates that a number is less than or equal to a value.

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - The rule function. It has to be invoked with a
mandatory `value` argument and an optional `context`. It always returns a
`Boolean`.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>Number</code> &#124; <code>function</code> | A number or a function returning a number. |

**Example**  
```js
var gt = okay.gt;
var validate = gt(5);
console.log(validate(5)); // false
console.log(validate(6)); // true
```
<a name="module_okay.gte"></a>

### okay.gte(param) ⇒ <code>function</code>
Rule creator. The created rule validates that a number is greater than or equal to a value

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - The rule function. It has to be invoked with a
mandatory `value` argument and an optional `context`. It always returns a
`Boolean`.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>Number</code> &#124; <code>function</code> | A value or a function returning a number |

**Example**  
```js
var gte = okay.gte;
var validate = gte(5);
console.log(validate(4)); // false
console.log(validate(5)); // true
console.log(validate(6)); // true
```
<a name="module_okay.lt"></a>

### okay.lt(param) ⇒ <code>function</code>
Rule creator. The created rule validates that a number is less than a value

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - The rule function. It has to be invoked with a
mandatory `value` argument and an optional `context`. It always returns a
`Boolean`.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>Number</code> &#124; <code>function</code> | A number or a function returning a number |

**Example**  
```js
var lt = okay.lt;
var validate = lt(5);
console.log(validate(5)); // false
console.log(validate(4)); // true
```
<a name="module_okay.lte"></a>

### okay.lte(param) ⇒ <code>function</code>
Rule creator. The created rule validates that a number is less than or equal to a value

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - The rule function. It has to be invoked with a
mandatory `value` argument and an optional `context`. It always returns a
`Boolean`.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>Number</code> &#124; <code>function</code> | A number or a function returning a number. |

**Example**  
```js
var lte = okay.lte;
var validate = lte(5);
console.log(validate(6)); // false
console.log(validate(5)); // true
console.log(validate(4)); // true
```
<a name="module_okay.number"></a>

### okay.number() ⇒ <code>function</code>
Rule creator. The created rule validates that a value is a number.

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - The rule function. It has to be invoked with a
mandatory `value` argument and an optional `context`. It always returns a
`Boolean`..  
**Example**  
```js
var object = okay.number;
var validate = number();
console.log(validate('a')); // false
console.log(validate(1)); // true
```
<a name="module_okay.object"></a>

### okay.object() ⇒ <code>function</code>
Rule creator. The created rule validates that a value is an object.

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - The rule function. It has to be invoked with a
mandatory `value` argument and an optional `context`. It always returns a
`Boolean`..  
**Example**  
```js
var object = okay.object;
var validate = object();
console.log(validate(1)); // false
console.log(validate({})); // true
```
<a name="module_okay.pattern"></a>

### okay.pattern(param) ⇒ <code>function</code>
Rule creator. The created rule validates that a value matches a regular expression.

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - The rule function. It has to be invoked with a
mandatory `value` argument and an optional `context`. It always returns a
`Boolean`.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>RegExp</code> &#124; <code>function</code> | A regular expression or a function returning a regular expression. |

**Example**  
```js
var pattern = okay.pattern;
var validate = pattern(/[0-9]/);
console.log(validate('a')); // false
console.log(validate('1')); // true
```
<a name="module_okay.required"></a>

### okay.required() ⇒ <code>function</code>
Rule creator. The created rule validates that a value is non-blank.

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - The rule function. It has to be invoked with a
mandatory `value` argument and an optional `context`. It always returns a
`Boolean`..  
**Example**  
```js
var required = okay.required;
var validate = required();
console.log(validate(null)); // false
console.log(validate(void 0)); // false
console.log(validate('')); // false
console.log(validate(false)); // true
```
<a name="module_okay.string"></a>

### okay.string() ⇒ <code>function</code>
Rule creator. The created rule validates that a given value is a string.

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - The rule function. It has to be invoked with a
mandatory `value` argument and an optional `context`. It always returns a
`Boolean`..  
**Example**  
```js
var string = okay.string;
var validate = string();
console.log(validate('1')); // true
console.log(validate(1)); // false
```
<a name="module_okay.taxCode"></a>

### okay.taxCode(param) ⇒ <code>function</code>
Rule creator. The created rule validates that a given value is a tax code.

**Kind**: static method of <code>[okay](#module_okay)</code>  
**Returns**: <code>function</code> - The rule function. It has to be invoked with a
mandatory `value` argument and an optional `context`. It always returns a `Boolean`.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>String</code> &#124; <code>function</code> | A ISO 3166 alpha-2 country code or a function returning a ISO 3166 alpha-2 country code |

**Example**  
```js
var taxCode = okay.taxCode;
var validate = taxCode('it');
console.log(validate('DGVDRN78E02H501C')); // true
```
