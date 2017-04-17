// Decorators
// ==========

// Decordator syntax
// =================

// A decorator is simply a function which is called with a specific set of
// parameters, which are automatically populated bythe JavaScript runtime. The
// parameters contain information about the class to which the decorator has
// been applied. The number of parameters and the types of the parameters
// determine where a decorator can be applied.

// Simple class decorator
function simpleDecorator(constructor: Function) {
    console.log(`simpleDecorator called.`);
}

// Decorators are applied when a class is being defined; not when instantiated
@simpleDecorator
class ClassWithSimpleDecorator {

}

// Decorators are only invoked as the class is being defined.

let instance_1 = new ClassWithSimpleDecorator();
let instance_2 = new ClassWithSimpleDecorator();

console.log(`instance_1: ${instance_1}`);
console.log(`instance_2: ${instance_2}`);