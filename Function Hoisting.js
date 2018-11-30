/* ------------------ Function Hoisting ------------------- */
/* All questions,code snippets and explanation for this topic has been taken from -
https://medium.freecodecamp.org/function-hoisting-hoisting-interview-questions-b6f91dbc2be8 
Please note thet the aim of this repository is to just collate code snippets and explanation for various JS concepts from good sources on Internet.
*/
/*
There are 2 ways of creating functions in JavaScript:
1. Function Declaration
2. Function Expression
*/

/*
Concept #1: 
Function Declaration
The function declaration defines a function with the specified parameters.
function name(param1, param2, ...) {
  [statements]
}
In JavaScript, function declarations hoist the function definitions.
Therefore, these functions can be used before they are declared.
*/
hoisted() 
function hoisted() {
  console.log('Hoisted')
}
// output: "Hoisted"
/* 
This behavior is true if you have function declarations in the Global Scope or Functional Scope (basically Local Scope in JavaScript).
This can be helpful because you can use your higher-level logic at the beginning of the code making it more readable and understandable.
*/

/*
Concept #2:
Function Expression
The function keyword can also be used to define a function inside an expression.
const myFunction = function [name](param1, param2, ...) {
  [statements]
}
The [name] is optional, therefore these can be anonymous functions. 

We can use arrow functions as well like so:
const myFunction = (param1, param2, ...) => {
  [statements]
}

********** Function expressions in JavaScript are not hoisted. Therefore, you cannot use function expressions before defining them.
*/
notHoisted() 
const notHoisted = function() {
  console.log('foo')
}
// TypeError: notHoisted is not a function

//Question #1:
var a = 1;
function b() {
  a = 10;
  return;
  function a() {}
}
b();
console.log(a);
//output: 1

/*
This is because the function a() {} statement has now created a local a that has a functional/local scope. 
This new a now gets hoisted to the top of its enclosing function b() with it’s declaration and definition. 
This is what is happening behind the scenes:
var a = 1;
function b() {
  // Hoisted
  function a() {}
  a = 10;
  return;
}
b();
console.log(a);
Therefore, the statement a = 10; is no longer changing the value of the global a which remains to be 1, but rather it is changing the local a from a function to an integer value of 10. 
Since we are logging the global a, the output is 1.
Had the statement function a() {} not been there, the output would have been 10.
*/

//Question #2:
function foo(){
    function bar() {
        return 3;
    }
    return bar(); // note, here we are calling bar function and then returning the result of bar function from foo function.
    function bar() {
        return 8;
    }
}
alert(foo());
//output: 8
/* 
Behind the scenes:
function foo(){
    //Hoisted before
    function bar() {
        return 3;
    }
    // Hoisted after
    function bar() {
        return 8;
    }
    return bar();
    
}
alert(foo());
*/

//Question #3: function vs var : who will get hoisted first
function parent() {
    var hoisted = "I'm a variable";
    function hoisted() {
        return "I'm a function";
    }
    return hoisted(); 
}
console.log(parent());
//output: “TypeError: hoisted is not a function”

/* 

This one’s tricky. Its Function vs. Variable! Let’s break it down.

We know that when it comes to variable hoisting, only the declaration(with a value of “undefined”) is hoisted, not the definition!

In the case of function declarations, the definitions are hoisted as well!

Now, in such a case of multiple declarations(variable and function in the same scope) with the same identifier, 
the hoisting of variables is simply IGNORED. The the interpreter comes across the function declaration and hoists it. 
Finally, the statement of variable assignment (which was not hoisted) is executed and “I’m a variable” is assigned to hoisted, 
which is a simple string value and not a function. Hence the error!

Here’s the behind the scenes for this problem:
function parent() {
    // Function declaration hoisted with the definition
    function hoisted() {
        return "I'm a function";
    }
    // Declaration ignored, assignment of a string
    hoisted = "I'm a variable"; 
    return hoisted(); 
}
console.log(parent());
*/

//Example #3.1:
//Note Example #3 is different from:
function parent() {
    hoisted = "I'm a variable";   
    function hoisted() {
        return "I'm a function";
    }
    return hoisted(); 
}
console.log(parent());
/*
NOTE: hoisted variable is not declared in parent and during execution of parent, function parent will hoist function declaration
and definition of hoisted and will create a variable named as "hoist".
hoisted = "I'm a variable"; =>  will assign a string value to the same hoisted variable created by function hoisted.
But in Example #3, we are declaring var as well as a function with name "hoisted"in the function parent.
The question is who will get hoisted var or function?
*/

/*
In Example #3.1, what internally happening is:
function parent() {
    function hoisted() {
        return "I'm a function";
    }
    hoisted = "I'm a variable";
    return hoisted(); 
}
console.log(parent());
*/

//Question #4:
alert(foo());
function foo() {
  var bar = function() {
    return 3;
  };
  return bar();
  var bar = function() {
    return 8;
  };
}
//output: 3
/*
The function foo() itself will be hoisted in the global scope as its a function declaration. 
As for inside foo(), its a clear case of function expression for both the bar()functions.
The second bar() will not be read by the interpreter ahead of time (no hoisting). The first one will be executed and returned.
*/

//Question #5
var myVar = 'foo';
(function() {
  console.log('Original value was: ' + myVar);
  var myVar = 'bar';
  console.log('New value is: ' + myVar);
})();
//output: “Original value was: undefined”, “New value is: bar”
/*
In this one, again the global value of myVar (‘foo’) is out of the picture. 
This is because variable myVar is being declared and defined inside the local function scope and is therefore hoisted to the top of the IIFE with a value of ‘undefined’ which is logged first. 
The value ‘bar’ is then assigned and logged subsequently.
*/