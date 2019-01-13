//Concept #1
let obj = {};

alert(obj.__proto__ === Object.prototype); // true
// obj.toString === obj.__proto__.toString == Object.prototype.toString

//Concept #2
//Please note that there is no additional [[Prototype]] in the chain above Object.prototype:
alert(Object.prototype.__proto__); // null

//Concept #3 :: Other Build In types
/*

By specification, all built-in prototypes have Object.prototype on the top. 
Sometimes people say that “everything inherits from objects”.
*/
let arr = [1, 2, 3];

// it inherits from Array.prototype?
alert( arr.__proto__ === Array.prototype ); // true

// then from Object.prototype?
alert( arr.__proto__.__proto__ === Object.prototype ); // true

// and null on the top.
alert( arr.__proto__.__proto__.__proto__ ); // null

/*
Other built-in objects also work the same way. Even functions. 
They are objects of a built-in Function constructor, and their methods: call/apply and others are taken from Function.prototype. 
Functions have their own toString too.
*/
function f() {}

alert(f.__proto__ == Function.prototype); // true
alert(f.__proto__.__proto__ == Object.prototype); // true, inherit from objects

//Concept #4 :: Primitives
/*
As we remember, they are not objects. 
But if we try to access their properties, then temporary wrapper objects are created using built-in constructors 
String, Number, Boolean, they provide the methods and disappear.
Methods of these objects also reside in prototypes, available as String.prototype, Number.prototype and Boolean.prototype.

** Values null and undefined have no object wrappers.
*/

//Concept #5 :: Changing Native Prototype
/*
In modern programming, there is only one case when modifying native prototypes is approved. That’s polyfills. 
In other words, if there’s a method in JavaScript specification that is not yet supported by our JavaScript engine 
(or any of those that we want to support), then may implement it manually and populate the built-in prototype with it.
*/
if (!String.prototype.repeat) { // if there's no such method
  // add it to the prototype

  String.prototype.repeat = function(n) {
    // repeat the string n times

    // actually, the code should be more complex than that,
    // throw errors for negative values of "n"
    // the full algorithm is in the specification
    return new Array(n + 1).join(this);
  };
}

alert( "La".repeat(3) ); // LaLaLa

//Problems:

/*
Add method "f.defer(ms)" to functions
importance: 5
Add to the prototype of all functions the method defer(ms), that runs the function after ms milliseconds.

After you do it, such code should work:
function f() {
  alert("Hello!");
}

f.defer(1000); // shows "Hello!" after 1 second
*/
Function.prototype.defer = function(timeOut){
    setTimeout(this,timeOut);
};
function f() {
    console.log("Hello!");
};
f.defer(1000);

/*
Add the decorating "defer()" to functions
importance: 4
Add to the prototype of all functions the method defer(ms), that returns a wrapper, delaying the call by ms milliseconds.

Here’s an example of how it should work:

function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // shows 3 after 1 second
Please note that the arguments should be passed to the original function.
*/
Function.prototype.defer = function(timeOut) {
    return (function(...args) {
        setTimeout(this(...args), timeOut);
    }).bind(this);
}
  // check it
function f(a, b) {
  alert(a + b);
}