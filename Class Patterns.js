
//Functional Pattern
/*
In the functional class pattern, local variables and nested functions inside User, 
that are not assigned to this, are visible from inside, but not accessible by the outer code.
*/
function User(name,birthDate){
    this.name= name;
    this.birthDate = birthDate;
    function calcAge(){
        return new Date().getFullYear() - birthDate.getFullYear();
    };
    this.sayHi = function(){
        alert(`${name}, age: ${calcAge()}`);
    }
}
let user = new User("John",new Date(2000,2,1));
user.sayHi();


//Factory Class Patterns
/*
We can create a class without using new at all.
The function User returns an object with public properties and methods.
calcAge() method is not accessible by outer code.
*/
function User(name,birthDate){
    //only visible to methods inside User
    function calcAge(){
        return new Date().getFullYear() - birthDate.getFullYear();
    }
    return{
        sayHi(){
            alert(`${name}, age: ${calcAge()}`);
        }
    };
};

let user = User("John",new Date(2000,2,1));
user.sayHi();
//John, age: 19

//Prototype-based classes

function User(name,birthDate){
    this.name = name;
    this.birthDate = birthDate;
};
User.prototype._calcAge = function(){
    return new Date().getFullYear() - this.birthDate.getFullYear();
};
User.prototype.sayHi = function(){
    alert(`${this.name}, age: ${this._calcAge()}`);
};
let user = new User("John",new Date(2000,2,1));
user.sayHi();

/*
The code structure:

The constructor User only initializes the current object state.
Methods are added to User.prototype.
As we can see, methods are lexically not inside function User, they do not share a common lexical environment. 
If we declare variables inside function User, then they won’t be visible to methods.
So, there is a widely known agreement that internal properties and methods are prepended with an underscore "_". Like _name or _calcAge(). 
Technically, that’s just an agreement, the outer code still can access them. But most developers recognize the meaning of "_" and try not to touch prefixed properties and methods in the external code.

Here are the advantages over the functional pattern:

In the functional pattern, each object has its own copy of every method. We assign a separate copy of this.sayHi = function() {...} and other methods in the constructor.
In the prototypal pattern, all methods are in User.prototype that is shared between all user objects. An object itself only stores the data.
So the prototypal pattern is more memory-efficient.
*/

//Prototype-based inheritance for classes
function Rabbit(name) {
    this.name = name;
}
  
Rabbit.prototype.jump = function() {
    alert(`${this.name} jumps!`);
};
  
let rabbit = new Rabbit("My rabbit");

function Animal(name) {
    this.name = name;
}
  
Animal.prototype.eat = function() {
    alert(`${this.name} eats.`);
};

let animal = new Animal("My animal");
/*
Right now methods for rabbit objects are in Rabbit.prototype. 
We’d like rabbit to use Animal.prototype as a “fallback”, if the method is not found in Rabbit.prototype.
So the prototype chain should be rabbit → Rabbit.prototype → Animal.prototype.
*/
// Same Animal as before
function Animal(name) {
    this.name = name;
}

// All animals can eat, right?
Animal.prototype.eat = function() {
    alert(`${this.name} eats.`);
};

// Same Rabbit as before
function Rabbit(name) {
    this.name = name;
}

Rabbit.prototype.jump = function() {
    alert(`${this.name} jumps!`);
};

// setup the inheritance chain
Rabbit.prototype.__proto__ = Animal.prototype; // (*)

let rabbit = new Rabbit("White Rabbit");
rabbit.eat(); // rabbits can eat too
rabbit.jump();

/*
An error in the inheritance
importance: 5
Find an error in the prototypal inheritance below.

What’s wrong? What are consequences going to be?
  function Animal(name) {
    this.name = name;
  }
  
  Animal.prototype.walk = function() {
    alert(this.name + ' walks');
  };
  
  function Rabbit(name) {
    this.name = name;
  }
  
  Rabbit.prototype = Animal.prototype;
  
  Rabbit.prototype.walk = function() {
    alert(this.name + " bounces!");
  };
*/
/*
Answer:
Here’s the line with the error:

Rabbit.prototype = Animal.prototype;
Here Rabbit.prototype and Animal.prototype become the same object. So methods of both classes become mixed in that object.

As a result, Rabbit.prototype.walk overwrites Animal.prototype.walk, so all animals start to bounce.
*/