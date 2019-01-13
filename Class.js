class User{
    constructor(firstName){
        this.firstName = firstName;
    }
    get firstName(){
        return this._firstName;
    }
    set firstName(value){
        if(value.length < 4){
            alert("Name is too short");
        	return;
        };
        this._firstName = value;
    }
}

let user = new User("John");

console.log(user.firstName); //"John"

/*
1. Constructors require new
2. Different string output
If we output it like alert(User), some engines show "class User...", while others show "function User...".
3. Class methods are non-enumerable
4. Classes have a default constructor() {}
5. Classes always use strict
*/

typeof User; //function

console.log(typeof user); //object

Object.getOwnPropertyNames(user); //["_firstName"]

console.log(typeof User.prototype); //object

Object.getOwnPropertyNames(User.prototype); //["constructor", "firstName"] //Not "_firstName"
/*  Getters and setters are also created on the User prototype. */

console.log(typeof User.prototype.constructor); //function

Object.getOwnPropertyNames(User.prototype.constructor); //["length", "prototype", "name"] //not firstName

console.log(typeof User); //function

Object.getOwnPropertyNames(User); //["length", "prototype", "name"]

Object.getOwnPropertyNames(Function);  //["length", "prototype", "name"]

console.log(User === User.prototype.constructor) //true

/*****************
Only methods
*****************/
/*
Unlike object literals, no property:value assignments are allowed inside class. 
There may be only methods and getters/setters.
So, technically that’s possible, but we should know why we’re doing it. Such properties will be shared among all objects of the class.
*/
class User { }

User.prototype.test = 5;

alert( new User().test ); // 5

/*****************
Class Expression
*****************/
/*
Just like functions, classes can be defined inside another expression, passed around, returned etc.
Here’s a class-returning function (“class factory”):
*/
function makeClass(phrase) {
// declare a class and return it
    return class {
        sayHi() {
            alert(phrase);
        };
    };
}

let User = makeClass("Hello");

new User().sayHi(); // Hello

//That’s quite normal if we recall that class is just a special form of a function-with-prototype definition.

/***************
 * Classes also may have a name.
 ***************/
/*
Like Named Function Expressions, such classes also may have a name, that is visible inside that class only.
*/
// "Named Class Expression" (alas, no such term, but that's what's going on)
  let User = class MyClass {
    sayHi() {
      alert(MyClass); // MyClass is visible only inside the class
    }
  };
  
  new User().sayHi(); // works, shows MyClass definition
  
  alert(MyClass); // error, MyClass not visible outside of the class
  

/************** 
Static methods
***************/
/*
We can also assign methods to the class function, not to its "prototype". 
Such methods are called static.
*/
class User {
    static staticMethod() {
        alert(this === User);
    }
}
User.staticMethod(); // true

//That actually does the same as assigning it as a function property.
function User() { }

User.staticMethod = function() {
  alert(this === User);
};

/*
The value of this inside User.staticMethod() is the class constructor User itself (the “object before dot” rule).
Usually, static methods are used to implement functions that belong to the class, 
but not to any particular object of it.
For instance, we have Article objects and need a function to compare them. The natural choice would be Article.compare, like this:
*/
class Article {
    constructor(title, date) {
        this.title = title;
        this.date = date;
    }

    static compare(articleA, articleB) {
        return articleA.date - articleB.date;
    }
}

// usage
let articles = [
    new Article("Mind", new Date(2016, 1, 1)),
    new Article("Body", new Date(2016, 0, 1)),
    new Article("JavaScript", new Date(2016, 11, 1))
];

articles.sort(Article.compare);

alert( articles[0].title ); // Body

/*
Note:
*/
class Article {
    constructor(title, date) {
        this.title = title;
        this.date = date;
    }

    static staticMethod() {
        return "from staticMethod";
    }
}
let article1 = new Article("Body",new Date());
console.log(article1); //Article {title: "Body", date: Tue Jan 08 2019 21:35:01 GMT+0530 (India Standard Time)}
article1.compare(); //Uncaught TypeError: article1.compare is not a function
//You cannot access static methods with the object of that class. Tou can access them with class only.
Object.getOwnPropertyNames(article1); //["title", "date"]
Object.getOwnPropertyNames(Article); //["length", "prototype", "staticMethod", "name"]
Article.staticMethod(); //"from staticMethod"