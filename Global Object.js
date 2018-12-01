/* ------------------ Global Object ------------------- */
/* All questions,code snippets and explanation for this topic has been taken from -
https://javascript.info/global-object
Please note thet the aim of this repository is to just collate code snippets and explanation for various JS concepts from good sources on Internet.
*/
/*
Concept #1:
In a browser it is named “window”, for Node.JS it is “global”, for other environments it may have another name.
It does two things:
1. Provides access to built-in functions and values, defined by the specification and the environment. 
For instance, we can call alert directly or as a method of window:
*/
alert("Hello");
// the same as
window.alert("Hello");

/*
2. Provides access to global Function Declarations and var variables. 
We can read and write them using its properties, for instance:
*/
var phrase = "Hello";

function sayHi() {
  alert(phrase);
}

// can read from window
alert( window.phrase ); // Hello (global var)
alert( window.sayHi ); // function (global function declaration)

// can write to window (creates a new global variable)
window.test = 5;

alert(test); // 5

/*
Concept #2:
The global object does not have variables declared with let/const!
*/
let user = "John";
alert(user); // John

alert(window.user); // undefined, don't have let
alert("user" in window); // false
/*
Prior to ES-2015, there were no let/const variables, only var.
Global object was used as a global Environment Record prior to ES-2015.
But starting from ES-2015, these entities are split apart. 
There’s a global Lexical Environment with its Environment Record.  
And there’s a global object that provides some of the global variables.
Global let/const variables are definitively properties of the global Environment Record, 
but they do not exist in the global object.
*/

/*****************
Concept #3
Uses of “window”
Usually, it’s not a good idea to use it, but here are some examples you can meet.
******************/
/* 
Use #1:
To access exactly the global variable if the function has the local one with the same name.
Such use is a workaround. 
Would be better to name variables differently, that won’t require use to write the code it this way. 
*/
var user = "Global";

function sayHi() {
  var user = "Local";

  alert(window.user); // Global
}

sayHi();

/*
Use #2:
To check if a certain global variable or a builtin exists.
For instance, we want to check whether a global function XMLHttpRequest exists.
We can’t write if (XMLHttpRequest) in strict mode, because if there’s no XMLHttpRequest, there will be an error (variable not defined).
*/
if (window.XMLHttpRequest) {
    alert('XMLHttpRequest exists!')
}
/*
We can also write the test without window:
This doesn’t use window, but is (theoretically) less reliable, because typeof may use a local XMLHttpRequest, 
and we want the global one.
*/
if (typeof XMLHttpRequest == 'function') {
    /* is there a function XMLHttpRequest? */
}
/*
Use #3:
To take the variable from the right window. That’s probably the most valid use case.
A browser may open multiple windows and tabs. A window may also embed another one in <iframe>. 
In chrome, every tab window has its own window object and global variables. 
JavaScript allows windows that come from the same site (same protocol, host, port) to access variables from each other.
*/
<iframe src="/" id="iframe"></iframe>

<script>
  alert( innerWidth );  //output: 777 - get innerWidth property of the current window (browser only)
  //777
  alert( Array );  //output: function Array() { [native code] } - get Array of the current window (javascript core builtin)
  // when the iframe loads...
  iframe.onload = function() {
    // get width of the iframe window
    alert( iframe.contentWindow.innerWidth );
    //300
    // get the builtin Array from the iframe window
    alert( iframe.contentWindow.Array );
    //function Array() { [native code] }
  };
</script>

/*************************
Concept #4
"this” and global object
**************************/
/*
1. In the browser, the value of this in the global area is window:
*/
// outside of functions
alert( this === window ); // true

/*
2. When a function with this is called in non-strict mode, it gets the global object as this:
*/
// not in strict mode (!)
function f() {
    alert(this); // [object Window]
}
  
f(); // called without an object
//in strict mode this would be undefined

/* 
Source:https://www.programmerinterview.com/index.php/javascript/javascript-global-object/
Question #1:
When is the global object created?
Ans:
The global object is created as soon as the Javascript interpreter starts. 
For Javascript running inside a browser, this means that as soon as a new page is loaded by the browser, 
the global object will be created.

Question #2:
Is the Window object a global object also?
In client side javascript, The Window object also acts as a global object for any and all of the Javascript code within a browser window.
*/