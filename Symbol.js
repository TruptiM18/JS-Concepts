/* ------------------ Symbol Type ------------------- */
/* All questions,code snippets and explanation for this topic has been taken from -
https://javascript.info/symbol
Please note that the aim of this repository is to just collate code snippets and explanation for various JS concepts from good sources on Internet.
*/
/*
By specification, object property keys may be either of string type, or of symbol type. 
Not numbers, not booleans, only strings or symbols, these two types.
Till now we’ve only seen strings. Now let’s see the advantages that symbols can give us.
*/

/***********************
Concept #1:
How to create Symbol?
************************/
let id = Symbol();

//We can also give symbol a description (also called a symbol name), mostly useful for debugging purposes:
// id is a symbol with the description "id_desc"
let id = Symbol("id_desc");

/***********************
Concept #2:
“Symbol” value represents a unique identifier.

Symbols are guaranteed to be unique. 
Even if we create many symbols with the same description, they are different values. 
The description is just a label that doesn’t affect anything.
************************/
let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false

/***********************
Concept #3:
Symbols don’t auto-convert to a string.

Most values in JavaScript support implicit conversion to a string. 
For instance, we can alert almost any value, and it will work. Symbols are special. 
They don’t auto-convert.
************************/
let id3 = Symbol("id");
alert(id3);   //Uncaught TypeError: Cannot convert a Symbol value to a string

/*
If we really want to show a symbol, we need to call .toString() on it, like here:
*/
alert(id3.toString()); //Symbol(id)

/***********************
Concept #4:
“Hidden” properties

Symbols allow us to create “hidden” properties of an object, that no other part of code can occasionally access or overwrite.
************************/
/*
For instance, if we want to store an “identifier” for the object user, we can use a symbol as a key for it:
*/
let user = { name: "John" };
let id = Symbol("id");

user[id] = "12345";
alert( user[id] ); // we can access the data using the symbol as the key
/*
What’s the benefit of using Symbol("id") over a string "id"?

Let’s make the example a bit deeper to see that.
Imagine that another script wants to have its own “id” property inside user, for its own purposes. 
That may be another JavaScript library, so the scripts are completely unaware of each other.
Then that script can create its own Symbol("id"), like this:
let id = Symbol("id");
user[id] = "Their id value";
*/
let user1 = {name: "John"};
var id1 = Symbol("id1");
user1[id1] = "12345";
var id1 = Symbol("id1");
user1[id1] = "123456";
console.log(user1);
//{name: "John", Symbol(id1): "12345", Symbol(id1): "123456"}

/*
Now note that if we used a string "id" instead of a symbol for the same purpose, then there would be a conflict:
*/
let user2 = { name: "John" };
user2["id"] = "12345";
console.log(user2);
//{name: "John", id: "12345"}
user2["id"] = "123456";
console.log(user2);
//{name: "John", id: "123456"}
// boom! overwritten!

/***********************
Concept #5:
Symbols in a literal
If we want to use a symbol in an object literal, we need square brackets.
************************/

let id = Symbol("id");
let user4 = {
    name: "John",
    [id]: "12345"
}
console.log(user4);
//{name: "John", Symbol(id): "12345"}

let user5 = {
    name: "John",
    id: "12345"
}
console.log(user5);
//{name: "John", id: "12345"}

/***********************
Concept #6:
Symbols are skipped by for…in
Symbolic properties do not participate in for..in loop.
************************/
let id8 = Symbol("id8");
let user8 = {
  name: "John",
  age: 30,
  [id8]: 123
};
for (let key in user8) {
    alert(key);
}
// name, age (no symbols)

// However, the direct access by the symbol works
alert( "Direct: " + user[id] );
/*
 * That’s a part of the general “hiding” concept. 
 * If another script or a library loops over our object, it won’t unexpectedly access a symbolic property.
 */
/**
 * In contrast, Object.assign copies both string and symbol properties.
 * There’s no paradox here. That’s by design. 
 * The idea is that when we clone an object or merge objects, we usually want all properties to be copied (including symbols like id).
 */
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123

/***********************
Concept #7:
Property keys of other types are coerced to strings

We can only use strings or symbols as keys in objects. Other types are converted to strings.
For instance, a number 0 becomes a string "0" when used as a property key:
************************/
let obj = {
    0: "test" // same as "0": "test"
};
// both alerts access the same property (the number 0 is converted to string "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (same property)


/***********************
Concept #9:
Global symbols

As we’ve seen, usually all symbols are different, even if they have the same names. 
But sometimes we want same-named symbols to be same entities.
For instance, different parts of our application want to access symbol "id" meaning exactly the same property.

To achieve that, there exists a global symbol registry. 
We can create symbols in it and access them later, and it guarantees that repeated accesses by the same name return exactly the same symbol.
In order to create or read a symbol in the registry, use Symbol.for(key).
That call checks the global registry, and if there’s a symbol described as key, then returns it, 
otherwise creates a new symbol Symbol(key) and stores it in the registry by the given key.
************************/
var id= Symbol.for("id");
var idAgain = Symbol.for("id");
console.log(id == idAgain);
//true

/***********************
Concept #10:
Symbol.keyFor

For global symbols, not only Symbol.for(key) returns a symbol by name, but there’s a reverse call: 
Symbol.keyFor(sym), that does the reverse: returns a name by a global symbol.
************************/
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");
var nameOfsym = Symbol.keyFor(sym);
console.log(nameOfsym); //name
var nameOfsym2 = Symbol.keyFor(sym2);
console.log(nameOfsym2); //id
/**
 * The Symbol.keyFor internally uses the global symbol registry to look up the key for the symbol. 
 * So it doesn’t work for non-global symbols. 
 * If the symbol is not global, it won’t be able to find it and return undefined.
 */
alert( Symbol.keyFor(Symbol("name2")) ); // undefined, the argument isn't a global symbol

/***********************
Concept #11:
System symbols

There exist many “system” symbols that JavaScript uses internally, 
and we can use them to fine-tune various aspects of our objects.
They are listed in the specification in the Well-known symbols table:
************************/
Symbol.hasInstance
Symbol.isConcatSpreadable
Symbol.iterator
Symbol.toPrimitive
//For instance, Symbol.toPrimitive allows us to describe object to primitive conversion. We’ll see its use very soon.

