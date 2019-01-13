/* ------------------ Object to primitive conversion ------------------- */
/* All questions,code snippets and explanation for this topic has been taken from -
https://javascript.info/object-toprimitive
Please note that the aim of this repository is to just collate code snippets and explanation for various JS concepts from good sources on Internet.
*/
/**
 * What happens when objects are added obj1 + obj2, subtracted obj1 - obj2 or printed using alert(obj)?
 * 
 * Boolean Conversion:
 * -----------------
 * For objects, there’s no to-boolean conversion, because all objects are true in a boolean context
 * There are only string and numeric conversions.
 * 
 * Numeric Conversion: 
 * -------------------
 * Numeric conversion happens when we subtract objects or apply mathematical functions.
 * For instance, Date objects can be subtracted, and the result of date1 - date2 is the time difference between two dates.
 * 
 * String Conversion:
 * ------------------
 * As for the string conversion – it usually happens when we output an object like alert(obj) and in similar contexts.
 */
/**********************
 * Concept #1:
 * ToPrimitive "string"
 * 
 * When an operation expects a string, for object-to-string conversions, like alert:
 **********************/
var user = {
    name: "John"
}
alert(user); //[object Object]

var user1 ={};
user1[user] = "Mark";
console.log(user1); //{[object Object]: "Mark"}

/**********************
 * Concept #2:
 * ToPrimitive "number"
 *
 * When an operation expects a number, for object-to-number conversions, like maths:
 **********************/

// explicit conversion
let num1 = Number(user);
console.log(num1); //NaN

// maths (except binary plus)
let n = +obj; // unary plus

var date1 = new Date(2014,4,19);
var date2 = new Date(2014,4,23);
console.log(date2-date1); //345600000

console.log(date2 > date1); //true
console.log(date2 < date1); //false
console.log(date2 == date1); //false

var date3 = date2+date1

//It has converted date1 and date2 objects into strings and then concatenated them to create date3 
//"Fri May 23 2014 00:00:00 GMT+0530 (India Standard Time)Mon May 19 2014 00:00:00 GMT+0530 (India Standard Time)"



