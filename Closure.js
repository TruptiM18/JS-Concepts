
//Examples to understand Javascript Closures

/**************************************
Concept #1
Lexical Environment for variable
In JavaScript, every running function, code block, and the script as a whole have an associated object known as the Lexical Environment.

The Lexical Environment object consists of two parts:

1. Environment Record – an object that has all local variables as its properties (and some other information like the value of this).
2. A reference to the outer lexical environment, usually the one associated with the code lexically right outside of it 
(outside of the current curly brackets).

So, a “variable” is just a property of the special internal object, Environment Record. 
“To get or change a variable” means “to get or change a property of the Lexical Environment”.

For browsers, all <script> tags share the same global environment.
**************************************/
                                    //Lexical Environment  outer->null
//Execution starts                  //<empty>
let phrase;                         //phrase: undefined
phrase = "Hello";                   //phrase: "Hello"
phrase = "Bye";                     //phrase: "Bye"

/**************************************
Concept #2
Lexical Environment for function
Unlike let variables, functions are processed not when the execution reaches them, but when a Lexical Environment is created. 

For the global Lexical Environment, it means the moment when the script is started.

That is why we can declare a function before one of its variable "phrase" is defined.

The code below demonstrates that the Lexical Environment is non-empty from the beginning. 

It has say, because that’s a Function Declaration. And later it gets phrase, declared with let:
**************************************/
                                    //Lexical Environment  outer->null
//Execution starts                  //function: say
function say(name){
    console.log(phrase +" " + name);
};

var phrase = "Hello";               //function: say , phrase: "Hello"

say("Jon"); //Hello Jon

/**************************************
Concept #3
When code wants to access a variable – it is first searched for in the inner Lexical Environment, then in the outer one, 
then the more outer one and so on until the end of the chain.

If a variable is not found anywhere, that’s an error in strict mode. 
Without use strict, an assignment to an undefined variable creates a new global variable, for backwards compatibility.

A function gets outer variables as they are now; it uses the most recent values.
**************************************/
var phrase = "Hi";

function say(name){
    console.log(phrase + " " + name);
}

phrase = "Hello";

say("John");  // A function gets outer variables as they are now; it uses the most recent values.

/**************************************
Concept #4
One call – one Lexical Environment
 1. A new function Lexical Environment is created each time a function runs.
 2. If a function is called multiple times, then each invocation will have its own Lexical Environment, 
 with local variables and parameters specific for that very run.
**************************************/
function makeCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

var counterfn1 = makeCounter();

counterfn1(); //1
counterfn1(); //2
counterfn1(); //3

var counterfn2 = makeCounter();
counterfn2(); //1

/**************************************
Concept #5
Can we somehow reset the count from the code that doesn’t belong to makeCounter? E.g. after alert calls in the example above.
**************************************/
function makeCounter() {
    let count = 0;
    return function() {
      return ++count;
    };
  }
  
  var counterfn1 = makeCounter();
  
  counterfn1(); //1
  counterfn1(); //2

  count = 0;  //Here, a new variable count has been created for global scope. counterfn1() has its own copy of count which remain unchanged.

  counterfn1(); //3 // It is still 3 and not 0.
  
/**************************************
Concept #6
[[Environment]] property

All functions “on birth” receive a hidden property [[Environment]] with a reference to the Lexical Environment of their creation.

A function is “imprinted” with a reference to the Lexical Environment where it was born. 
And [[Environment]] is the hidden function property that has that reference.

Here, makeWorker is created in the global Lexical Environment, so [[Environment]] keeps a reference to it.
**************************************/
function makeWorker(){
    var name = "Pete";
    return function(){
        return name;
    }
}

var name = "Jon";

var fn = makeWorker();

fn(); //Pete


/**************************************
Concept #7
The local variables are not copied — they are kept by reference. 

It is as though the stack-frame stays alive in memory even after the outer function exists!
**************************************/
function Increment(num){
    var fn  = function(){
        return num;
    };
    num = num+1;
    return fn;
}

var inc = Increment(42);

inc(); //43

/**************************************
Concept #8
All three global functions have a common reference to the same closure because they are all declared within a single call to setupSomeGlobals().
**************************************/
var gLogNumber, gIncreaseNumber, gSetNumber;
function setupSomeGlobals() {
  // Local variable that ends up within closure
  var num = 42;
  // Store some references to functions as global variables
  gLogNumber = function() { console.log(num); }
  gIncreaseNumber = function() { num++; }
  gSetNumber = function(x) { num = x; }
}
setupSomeGlobals();
gIncreaseNumber();
gLogNumber(); // 43
gSetNumber(5);
gLogNumber(); // 5

var oldLog = gLogNumber;

setupSomeGlobals();

gLogNumber(); // 42

oldLog() // 5
/*
The three functions have shared access to the same closure — the local variables of setupSomeGlobals() when the three functions were defined.

Note that in the above example, if you call setupSomeGlobals() again, then a new closure (stack-frame!) is created. 

The old gLogNumber, gIncreaseNumber, gSetNumber variables are overwritten with new functions that have the new closure. 
(In JavaScript, whenever you declare a function inside another function, the inside function(s) is/are recreated again each time the 
outside function is called.)

When setupSomeGlobals() was called again, a new Lexical environment was created for setupSomeGlobals() function and old gLogNumber, 
gIncreaseNumber, gSetNumber variables are overwritten with new functions whose [[Environment]] is now referencing 
to new Lexical environment created for setupSomeGlobals().
*/

/**************************************
Concept #9
This example shows that the closure contains any local variables that were declared inside the outer function before it exited. 
Note that the variable alice is actually declared after the anonymous function. 
The anonymous function is declared first, and when that function is called it can access the  alice variable because alice is in the same scope.
**************************************/
function sayAlice() {
    var say = function() { console.log(alice); }
    // Local variable that ends up within closure
    var alice = 'Hello Alice';
    return say;
}
sayAlice()();// logs "Hello Alice"

/* 
Tricky: also note that the say variable is also inside the closure, 
and could be accessed by any other function that might be declared within sayAlice(), 
or it could be accessed recursively within the inside function
*/

/**************************************
Concept #10
Be very careful if you are defining a function within a loop: the local variables from the closure may not act as you might first think.

You need to understand the "variable hoisting" feature in Javascript in order to understand this example.
***************************************/
function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + i;
        result.push( function() {console.log(item + ' ' + list[i])} );
    }
    return result;
}

function testList() {
    var fnlist = buildList([1,2,3]);
    // Using j only to help prevent confusion -- could use i.
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}

 testList() //logs "item2 undefined" 3 times
/*
Note that when you run the example, "item2 undefined" is logged three times! 
This is because just like previous examples, there is only one closure for the local variables for buildList (which are result, i and item). 
When the anonymous functions are called on the line fnlist[j](); they all use the same single closure, 
and they use the current value for i and item within that one closure (where i has a value of 3 because the loop had completed, 
and item has a value of 'item2'). 
Note we are indexing from 0 hence item has a value of item2. And the i++ will increment i to the value 3.

It may be helpful to see what happens when a block-level declaration of the variable item is used (via the let keyword) 
instead of a function-scoped variable declaration via the var keyword. 
If that change is made, then each anonymous function in the array result has its own closure; 
If the variable i and item is defined using let instead of var, then the output is:
item0 1
item1 2
item2 3
*/

//Similar Example #1

function x(num){
    lst = [];
    for(var i=0;i<num;i++){
        var y = function(){
            console.log(i);
        };
        lst.push(y);
    };
    return lst;
}
var g = x(5);
g[0](); //5
g[1](); //5
g[2](); //5
g[3](); //5
g[4](); //5

//Solution
function x(num){
    lst = [];
    for(let i=0;i<num;i++){
        var y = function(){
            console.log(i);
        };
        lst.push(y);
    };
    return lst;
}
var g = x(5);
g[0](); //0
g[1](); //1
g[2](); //2
g[3](); //3
g[4](); //4

//Similar Example #2
function h(num){
    return function(){
        for(var i=0;i<num;i++){
            console.log(i);
        }
    };
}
h(5)();
//0
//1
//2
//3
//4
//Here variable i was hoisted and was not part of each loop's separate scope but was defined in scope of(). 
//But console.log() was called on every increment of i. 
//The code worked fine because we are not referencing i once function h() was returned.

//Similar Example #3
function hoist(num){
    var lst1 = [];
    for(var i=0;i<num;i++){
            lst1.push(i);
     };  
    return lst1;
}
var rat = hoist(3);
//console.log(rat[0]);
//0
//console.log(rat[1]);
//1
//console.log(rat[2]);
//2
//Here, we pushed i in list lst1 at every iteration and each element in th list has its own copy of i. 
//i was not passed as reference in lst1. So,the code is working fine.
/**************************************
Concept #11
In this final example, each call to the main function creates a separate closure.
***************************************/
function newClosure(someNum, someRef) {
    // Local variables that end up within closure
    var num = someNum;
    var anArray = [1,2,3];
    var ref = someRef;
    return function(x) {
        num += x;
        anArray.push(num);
        console.log('num: ' + num +
            '; anArray: ' + anArray.toString() +
            '; ref.someVar: ' + ref.someVar + ';');
      }
}
obj = {someVar: 4};
fn1 = newClosure(4, obj);
fn2 = newClosure(5, obj);
fn1(1); // num: 5; anArray: 1,2,3,5; ref.someVar: 4;
fn2(1); // num: 6; anArray: 1,2,3,6; ref.someVar: 4;
obj.someVar++;
fn1(2); // num: 7; anArray: 1,2,3,5,7; ref.someVar: 5;
fn2(2); // num: 8; anArray: 1,2,3,6,8; ref.someVar: 5;

/**************************************
Concept #12
A closure is a function that remembers its outer variables and can access them.

All functions are naturally closures (there is only one exclusion, to be covered in The "new Function" syntax).

They automatically remember where they were created using a hidden [[Environment]] property, and all of them can access outer variables.
**************************************/
