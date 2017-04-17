// Decorators
// ==========
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Decordator syntax
// =================
// A decorator is simply a function which is called with a specific set of
// parameters, which are automatically populated bythe JavaScript runtime. The
// parameters contain information about the class to which the decorator has
// been applied. The number of parameters and the types of the parameters
// determine where a decorator can be applied.
// Simple class decorator
function simpleDecorator(constructor) {
    console.log("simpleDecorator called.");
}
// Decorators are applied when a class is being defined; not when instantiated
var ClassWithSimpleDecorator = (function () {
    function ClassWithSimpleDecorator() {
    }
    return ClassWithSimpleDecorator;
}());
ClassWithSimpleDecorator = __decorate([
    simpleDecorator
], ClassWithSimpleDecorator);
// Decorators are only invoked as the class is being defined.
var instance_1 = new ClassWithSimpleDecorator();
var instance_2 = new ClassWithSimpleDecorator();
console.log("instance_1: " + instance_1);
console.log("instance_2: " + instance_2);
//# sourceMappingURL=hello_ch04.js.map