/* ------------------ Objects ------------------- */
/* All questions,code snippets and explanation for this topic has been taken from -
https://javascript.info/object
Please note thet the aim of this repository is to just collate code snippets and explanation for various JS concepts from good sources on Internet.
*/
/**********
Concept #1:
How to create an empty object?
objects are used to store keyed collections of various data and more complex entities. 
An object can be created with figure brackets {…} with an optional list of properties
A property is a “key: value” pair, where key is a string (also called a “property name”), and value can be anything.
***********/
let user = new Object(); // "object constructor" syntax
let user = {};  // "object literal" syntax

/*************
Concept #2:
Literals and properties
We can immediately put some properties into {...} as “key: value” pairs:
**************/
let user = {     // an object
    name: "John",  // by key "name" store value "John"
    age: 30        // by key "age" store value 30
};
console.log(user);
//{name: "John", age: 30}

//1. How to access a property?
alert(user.name);

//2. How to add property to an object?
user.isAdmin = true;
console.log(user);
//{name: "John", age: 30, isAdmin: true}

//3. To remove a property, we can use delete operator:
delete user.isAdmin
//true
console.log(user);
//{name: "John", age: 30}
//delete operator returns true whenever it deletes the property or the property does not exist to delete

//4.
delete user.lastName
//true
console.log(user);
//{name: "John", age: 30}

/***********
 Concept #3
 Multiword property names
 We can also use multiword property names, but then they must be quoted.
 For multiword properties, the dot access doesn’t work. 
 There’s an alternative “square bracket notation” that works with any string
 **********/
let user2= {
    name: "Mark",
    age:25,
    "likes dogs": true
}
//user2.likes dogs //Uncaught SyntaxError: Unexpected identifier

user2["likes dogs"]
//true

/***********
Concept #4
Use of Square Brackets
Square brackets also provide a way to obtain the property name as the result of any expression – 
as opposed to a literal string – like from a variable.
Here, the variable key may be calculated at run-time or depend on the user input. 
And then we use it to access the property. 
That gives us a great deal of flexibility. 
The dot notation cannot be used in a similar way.
***********/
let user = {
    name: "John",
    age: 30
};
  
let key = prompt("What do you want to know about the user?", "name");
  
// access by variable
alert( user[key] ); // John (if enter "name")

/*********
Concept #5:
Computed properties
We can use square brackets in an object literal. That’s called computed properties.
**********/
let fruit = prompt("Which fruit to buy?");
let bag = {
    [fruit]: 5,
};
alert(bag.apple); //5
alert(bag[fruit]); //5
alert(bag["apple"]); //5
/* 
The meaning of a computed property is simple: [fruit] means that the property name should be taken from fruit. 
Essentially, that works the same as:
*/
let fruit1 = prompt("which fruit to buy?","apple");
let bag1 = {};
bag1[fruit] = 5;

/*********
Concept #6:
Property Names
A variable cannot have a name equal to one of language-reserved words like “for”, “let”, “return” etc.
But for an object property, there’s no such restriction. Any name is fine.
**********/
let obj = {
    for: 1,
    let: 2,
    return: 3
};
alert( obj.for + obj.let + obj.return );  // 6
/*
Basically, any name is allowed, but there’s a special one: "__proto__" that gets special treatment for historical reasons. 
For instance, we can’t set it to a non-object value:
*/
let obj = {};
obj.__proto__ = 5;
alert(obj.__proto__); //[object Object]
//The assignment primitive 5 to obj.__proto__ is ignored.

/*********
Concept #7:
Property value shorthand
In real code we often use existing variables as values for property names.
**********/
function makeUser(name, age) {
    return {
      name: name,
      age: age
      // ...other properties
    };
  }
  
  let user = makeUser("John", 30);
  alert(user.name); // John

/*
The use-case of making a property from a variable is so common, that there’s a special property value 
shorthand to make it shorter.
Instead of name:name we can just write name, like this.
*/
function makeUser(name, age) {
  return {
    name, // same as name: name
    age   // same as age: age
  };
}
let worker1 = makeWorker("Mark",25);
console.log(worker1);
//{name: "Mark", age: 25}

/*
We can use both normal properties and shorthands in the same object.
*/
let user = {
    name,  // same as name:name
    age: 30
};

/*********
Concept #8:
Existence check
A notable objects feature is that it’s possible to access any property. 
There will be no error if the property doesn’t exist! 
Accessing a non-existing property just returns undefined
**********/
let user = {};
alert( user.noSuchProperty === undefined ); // true means "no such property"

//There also exists a special operator "in" to check for the existence of a property.
//"key" in object
let user = { name: "John", age: 30 };

alert( "age" in user ); // true, user.age exists
alert( "blabla" in user ); // false, user.blabla doesn't exist

//If we omit quotes, that would mean a variable containing the actual name will be tested.
let user = { age: 30 };

let key = "age";
alert( key in user ); // true, takes the name from key and checks for such property

/***** Using “in” for properties that store undefined *****/
/*
Usually, the strict comparison "=== undefined" check works fine. 
But there’s a special case when it fails, but "in" works correctly.
It’s when an object property exists, but stores undefined.
*/
let obj = {
    test: undefined
};
alert( obj.test ); // it's undefined, so - no such property?
alert( "test" in obj ); // true, the property does exist!

/*********
Concept #9:
The “for…in” loop
To walk over all keys of an object, there exists a special form of the loop: for..in. 
**********/
var user = {
    name: "John",
    age: 25,
    dob: "1 Jan 1993"
}
for(let eachKey in user){
    console.log(eachKey+ ": " + user[eachKey]);
}
/*
name: John
age: 25
dob: 1 Jan 1993
*/
/* Note that all “for” constructs allow us to declare the looping variable inside the loop, like let eachKey here. */

/*********
Concept #10:
Ordered like an object
Are objects ordered? In other words, if we loop over an object, 
do we get all properties in the same order they were added? 
Can we rely on this? 
The short answer is: “ordered in a special fashion”: 
--> integer properties are sorted, others appear in creation order.
**********/
let countryCodes = {
    "2": "Nepal",
    "1": "India",
    "3": "Bhutan",
    totalCountries: 3
}
/*
1: India
2: Nepal
3: Bhutan
totalCountries: 3
*/
let countryCodes2 = {
    "2": "Nepal",
    "1": "India",
    totalCountries: 3,
    "3": "Bhutan",
}
/*
countryCodes2
{1: "India", 2: "Nepal", 3: "Bhutan", totalCountries: 3}
*/
let countryCodes3 = {
    "2": "Nepal",
    "1": "India",
    totalCountries: 3,
    "3": "Bhutan",
	continent: "Asia"
}
/*
countryCodes3
{1: "India", 2: "Nepal", 3: "Bhutan", totalCountries: 3, continent: "Asia"}
Note - Integer properties are sorted, others appear in creation order though if they would have been sorted in
alphabetic order would have landed as -
{1: "India", 2: "Nepal", 3: "Bhutan",  continent: "Asia",totalCountries: 3} XXX
*/

/*
Integer properties? What’s that?
The “integer property” term here means a string that can be converted to-and-from an integer without a change.
So, “49” is an integer property name, because when it’s transformed to an integer number and back, it’s still the same. 
But “+49” and “1.2” are not.
*/
let countryCodes4 = {
    "2.9": "Nepal",
    "1": "India",
    totalCountries: 3,
    "3": "Bhutan",
	continent: "Asia"
}
/*
countryCodes4
{1: "India", 3: "Bhutan", 2.9: "Nepal", totalCountries: 3, continent: "Asia"}
*/

/*********
Concept #11:
Copying by reference
One of the fundamental differences of objects vs primitives is that they are stored and copied “by reference”.
Primitive values: strings, numbers, booleans – are assigned/copied “as a whole value”.
**********/
let message = "Hello!";
let phrase = message;
/* As a result we have two independent variables, each one is storing its own copy of string "Hello!". */

/*
Objects are not like that.
A variable stores not the object itself, but its “address in memory”, in other words “a reference” to it.
*/
let user = {
    name: "John"
};
/*
Here, the object is stored somewhere in memory. And the variable user has a “reference” to it.
When an object variable is copied – the reference is copied, the object is not duplicated.
*/
let user = { name: "John" };
let admin = user; // copy the reference
//Now we have two variables, each one with the reference to the same object.
admin.name = 'Pete';
console.log(user.name); //Pete

/*********
Concept #12:
Comparison by reference
The equality == and strict equality === operators for objects work exactly the same.
Two objects are equal only if they are the same object.
For instance, two variables reference the same object, they are equal.
**********/
//Example #1
let a = {};
let b = a; // copy the reference

alert( a == b ); // true, both variables reference the same object
alert( a === b ); // true

//Example #2
let a1 = {};
let b1 = {}; // two independent objects

alert( a1 == b1 ); // false

/*********
Concept #12:
Const object
An object declared as const can be changed.
**********/
//Example #1
const user = {
    name: "John"
};
user.age = 25; // (*)
alert(user.age); // 25
/*
It might seem that the line (*) would cause an error, but no, there’s totally no problem. 
That’s because const fixes the value of user itself. 
And here user stores the reference to the same object all the time. 
The line (*) goes inside the object, it doesn’t reassign user.
*/

//Example #2
//The const would give an error if we try to set user to something else.
const user = {
    name: "John"
};
  
// Error (can't reassign user)
user = {
    name: "Pete"
};
/*
But what if we want to make constant object properties? So that user.age = 25 would give an error. 
That’s possible too.
Please refer http://javascript.info/property-descriptors
*/

/*********
Concept #13:
Cloning and merging, Object.assign
So, copying an object variable creates one more reference to the same object.
But what if we need to duplicate an object? Create an independent copy, a clone?
**********/
/*
Method #1:
There’s no built-in method for that in JavaScript. Actually, that’s rarely needed. 
But if we really want that, then we need to create a new object and replicate the structure of the existing one by iterating over its 
properties and copying them on the primitive level.
*/
var user = {
    name: "John",
    lastName: "Kelly",
    age: 40
};
var cloneOfUser = {};
for(let key in user){
    cloneOfUser[key] = user[key];
}
console.log(cloneOfUser);
//{name: "John", lastName: "Kelly", age: 40}

cloneOfUser.lastName = "Johnson";

console.log(cloneOfUser.lastName); //Johnson

console.log(user.lastName); //Kelly


/*********
Concept #14:
Cloning and merging, Object.assign
So, copying an object variable creates one more reference to the same object.
But what if we need to duplicate an object? Create an independent copy, a clone?
**********/
/*
There’s no built-in method for that in JavaScript. Actually, that’s rarely needed. 
But if we really want that, then we need to create a new object and replicate the structure of the existing one by iterating over its 
properties and copying them on the primitive level.
*/
let user = { name: "John" };
let permissions = {canView: true};
let permissions1 = {canEdit: true};
Object.assign(user,permissions,permissions1);
console.log(user);
//{name: "John", canView: true, canEdit: true}

/*
1. If the receiving object (user) already has the same named property, it will be overwritten:
*/
console.log(user);
//{name: "John", canView: true, canEdit: true}
Object.assign(user,{name: "Pete",age:25});
//{name: "Pete", canView: true, canEdit: true, age: 25}

/*
2. We also can use Object.assign to replace the loop for simple cloning.
It copies all properties of user into the empty object and returns it.
REMEMBER, Object.assign returns targeted object.
*/
let clone = Object.assign({},user);
console.log(clone);
//{name: "Pete", canView: true, canEdit: true, age: 25}

/* 
3. Until now we assumed that all properties of user are primitive. But properties can be references to other objects. What to do with them?
*/
let user = {
    name: "John",
    sizes: {
      height: 182,
      width: 50
    }
};
/*
Now it’s not enough to copy clone.sizes = user.sizes, because the user.sizes is an object, it will be copied by reference. 
So clone and user will share the same sizes.
*/
let clone = Object.assign({},user);
clone.sizes.height = 170;
console.log(user.sizes.height);

/*
To fix that, we should use the cloning loop that examines each value of user[key] and, if it’s an object, then replicate its structure as well. 
That is called a “deep cloning”.
There’s a standard algorithm for deep cloning that handles the case above and more complex cases, called the Structured cloning algorithm.
We can use a working implementation of it from the JavaScript library lodash, the method is called _.cloneDeep(obj).
*/

/* ------------------------------------------------ Questions ----------------------------------------------------- */
/*
#1
Hello, object
importance: 5
Write the code, one line for each action:

Create an empty object user.
Add the property name with the value John.
Add the property surname with the value Smith.
Change the value of the name to Pete.
Remove the property name from the object.
*/
let user = {};
user.name = "John";
user.surname = "Smith";
user.name = "Pete";
delete user.name;
console.log(user);
//{surname: "Smith"}
/*
#2
Check for emptiness
importance: 5
Write the function isEmpty(obj) which returns true if the object has no properties, false otherwise.
*/
function isEmpty(inputObj){
    for(var key in inputObj){
        return false;
    }
    return true;
}
/*
#3
Constant objects?
importance: 5
Is it possible to change an object declared with const? What do you think?
*/
const user = {
    name: "John"
};
  
// does it work?
user.name = "Pete";
//---> Yes, because object to which user is pointing is still the same.

/*
#4
We have an object storing salaries of our team:

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
}
Write the code to sum all salaries and store in the variable sum. Should be 390 in the example above.

If salaries is empty, then the result must be 0.
*/
let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}
let sum = 0;    
for (let key in salaries){
    sum += salaries[key];
}

/* 
#5
Multiply numeric properties by 2
importance: 3
Create a function multiplyNumeric(obj) that multiplies all numeric properties of obj by 2.
For instance:

// before the call
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);

// after the call
menu = {
  width: 400,
  height: 600,
  title: "My menu"
};
Please note that multiplyNumeric does not need to return anything. It should modify the object in-place.

P.S. Use typeof to check for a number here.
*/
function multiplyNumeric(obj){
    for(let key in obj){
        if(typeof obj[key] === "number"){
            obj[key] = 2 * obj[key];
        }
    }
}