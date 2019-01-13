//Prototypal Inheritance and F.prototype()

//*****  Example #1:
let animal = {
    eat: true
};
function Rabbit(name){
    this.name = name;
};
Rabbit.prototype = animal;
var rabbit1 = new Rabbit("white rabbit");
console.log(rabbit1); //Rabbit {name: "white rabbit"}
console.log(rabbit1.eat); //true
console.log(rabbit1); //Rabbit {name: "white rabbit"}
delete rabbit1.eat; //returns true
console.log(rabbit1.eat); //true
/*
All delete operations are applied directly to the object. 
Here delete rabbit.eats tries to remove eats property from rabbit, but it doesn’t have it. 
So the operation won’t have any effect.
*/
console.log(rabbit1); //Rabbit {name: "white rabbit"}

delete animal.eat;
console.log(rabbit1.eat); //undefined
console.log(rabbit1); //Rabbit {name: "white rabbit"}
console.log(animal); //{}

//***** Example #2:
let animal = {
    eat: true
};
let rabbit = {
    run: true
};
rabbit.__proto__ = animal; //{eat: true}
console.log(rabbit); //{run: true}
console.log(animal); //{eat: true}
console.log(rabbit.eat); //true
delete rabbit.eat; //returns true
console.log(rabbit.eat); //true
/*
All delete operations are applied directly to the object. 
Here delete rabbit.eats tries to remove eats property from rabbit, but it doesn’t have it. 
So the operation won’t have any effect.
*/
console.log(rabbit); //{run: true}
console.log(animal); //{eat: true}

delete animal.eat;//returns true
console.log(rabbit); //{run: true}
console.log(animal); //{}
console.log(rabbit.eat); //undefined

//***** Example #3:
let user = {
    name: "John",
    lastName: "Smith",
    get fullName(){
        return this.name+" "+this.lastName;
    },
    set fullName(value){
        [this.name,this.lastName] = value.split(' ');
    }
}
let admin = {
    deleteAccess: true
}
admin.__proto__ = user;
console.log(admin); //{deleteAccess: true}
console.log(user); //{name: "John", lastName: "Smith"}
console.log(admin.name); //"John"
console.log(admin.fullName); //"John Smith"
console.log(admin); //{deleteAccess: true}
delete admin.name; //returns true
console.log(admin); //{deleteAccess: true}
console.log(admin.fullName); //"John Smith"
admin.fullName = "Alice Cooper";
console.log(admin); //{deleteAccess: true, name: "Alice", lastName: "Cooper"}
console.log(admin.name); //"Alice"
console.log(user); //{name: "John", lastName: "Smith"}
delete admin.name; //returns true
console.log(admin); //{deleteAccess: true, lastName: "Cooper"}
console.log(admin.fullName); //"John Cooper"
console.log(user.fullName); //"John Smith"

//***** Example #4:
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

Rabbit.prototype = {};

alert( rabbit.eats ); // true
/*
The assignment to Rabbit.prototype sets up [[Prototype]] for new objects, but it does not affect the existing ones.
*/

//***** Example #5:
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

Rabbit.prototype.eats = false;

alert( rabbit.eats ); // false

//***** Example #6:
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

delete rabbit.eats;
/*
All delete operations are applied directly to the object. 
Here delete rabbit.eats tries to remove eats property from rabbit, but it doesn’t have it. 
So the operation won’t have any effect.
*/
alert( rabbit.eats ); // true

//***** Example #7:
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

delete Rabbit.prototype.eats;

alert( rabbit.eats ); // undefined
//The property eats is deleted from the prototype, it doesn’t exist any more.