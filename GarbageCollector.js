/* ------------------ Closures ------------------- */
/* All questions,code snippets and explanation for this topic has been taken from -
http://javascript.info/garbage-collection
Please note that the aim of this repository is to just collate code snippets and explanation for various JS concepts from good sources on Internet.
*/
/*******************
* Concept #1:
* Reachability:
The main concept of memory management in JavaScript is reachability from the root.
“Reachable” values are those that are accessible or usable somehow. They are guaranteed to be stored in memory.
  
There’s a base set of inherently reachable values, that cannot be deleted for obvious reasons.

For instance:
1. Local variables and parameters of the current function.
2. Variables and parameters for other functions on the current chain of nested calls.
3. Global variables.
(there are some other, internal ones as well)
*** These values are called roots.

4. Any other value is considered reachable if it’s reachable from a root by a reference or by a chain of references.
*********************/

/*********************
 * Simple Example
 *********************/
var user = {
    name: "John"
}
user = null;
// The global variable "user" references the object {name: "John"}
//If the value of user is overwritten, the reference is lost.
//Now John becomes unreachable. There’s no way to access it, no references to it. Hence, eligible for garbage collection.

/*********************
 * Two References
 *********************/
var user = {
    name: "John"
}
var admin = user;
user = null;
//Then the object is still reachable via admin global variable, so it’s in memory. 
//If we overwrite admin too, then it can be removed.

/*********************
 * Interlinked Object
 * Being referenced is not the same as being reachable (from a root): 
 * a pack of interlinked objects can become unreachable as a whole.
 * Only incoming references to an object/premitive from THE ROOT ones can make an object reachable. 
 *********************/
function marry(man, woman) {
    woman.husband = man;
    man.wife = woman;
  
    return {
      father: man,
      mother: woman
    }
  }
  
let family = marry({
    name: "John"
    }, {
    name: "Ann"
  })

/*
                            family
                  father /           \ mother
                           <-- husband
            {name: "John"}            {name: "Ann"} 
                            --> wife
*/

//As of now, all objects are reachable.
//Now let’s remove two references:
delete family.father;
delete family.mother.husband;

/*
 * It’s not enough to delete only one of these two references, because all objects would still be reachable.
 * But if we delete both, then we can see that John has no incoming reference any more.
 * Outgoing references do not matter. 
 * Only incoming ones can make an object reachable. 
 * So, John is now unreachable and will be removed from the memory with all its data that also became unaccessible.
 */

/*********************
 * Unreachable island
 * It is possible that the whole island of interlinked objects becomes unreachable and is removed from the memory.
 * The source object is the same as above. Then:
 *********************/
family = null;
/*
It’s obvious that John and Ann are still linked, both have incoming references. 
But that’s not enough.

The former "family" object has been unlinked from the root, there’s no reference to it any more, 
so the whole island becomes unreachable and will be removed.
*/
/*******************
* Concept #2:
* Internal Algorithm:
The basic garbage collection algorithm is called “mark-and-sweep”.
The following “garbage collection” steps are regularly performed:

1. The garbage collector takes roots and “marks” (remembers) them.
2. Then it visits and “marks” all references from them.
3. Then it visits marked objects and marks their references. All visited objects are remembered, so as not to visit the same object twice in the future.
4. And so on until there are unvisited references (reachable from the roots).
5. All objects except marked ones are removed.

Basically, garbage collector applies BFS algo on a graph that comprises of all objects created in the engine
with global object as its initial vertex.
Any component of graph that is not connected to global object is collected by garbage collector.
*********************/

/*******************
* Concept #3:
* Optimization Techniques:

1. Generational collection:
objects are split into two sets: “new ones” and “old ones”.
Many objects appear, do their job and die fast, they can be cleaned up aggressively.
Those that survive for long enough, become “old” and are examined less often.

2. Incremental collection:
Engine tries to split the garbage collection into pieces.
Then the pieces are executed one by one, separately.
That requires some extra bookkeeping between them to track changes, but we have many tiny delays instead of a big one.

3. Idle-time collection:
The garbage collector tries to run only while the CPU is idle, to reduce the possible effect on the execution.
*********************/