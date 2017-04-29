// Decorators
// ==========
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
// Decordator syntax
// =================
// A decorator is simply a function which is called with a specific set of
// parameters, which are automatically populated by the JavaScript runtime. The
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
// Multiple decorators
// ===================
function secondDecorator(constructor) {
    console.log('secondDecorator called.');
}
// Decorators are called in reverse order.
var ClassWithMultipleDecorators = (function () {
    function ClassWithMultipleDecorators() {
    }
    return ClassWithMultipleDecorators;
}());
ClassWithMultipleDecorators = __decorate([
    simpleDecorator,
    secondDecorator
], ClassWithMultipleDecorators);
// Decorator factories
// ===================
// In order to allow for decorators to accept parameters, we need to use a
// decorator factory. This is a wrapper function that returns the decorator
// function itself.
function decoratorFactory(name) {
    return function (constructor) {
        console.log("decorator function called with: " + name);
    };
}
var ClasswithDecoratorFactory = (function () {
    function ClasswithDecoratorFactory() {
    }
    return ClasswithDecoratorFactory;
}());
ClasswithDecoratorFactory = __decorate([
    decoratorFactory('testName')
], ClasswithDecoratorFactory);
// Class decorator parameters
// ==========================
// Class decorators will be invoked with the constructor function of the class
// that has been decorated, when the class is defined.
function classConstructorDec(constructor) {
    console.log("constructor: " + constructor);
    console.log("constructor.name: " + constructor.name);
    constructor.prototype.testProperty = 'testProperty_value';
}
var ClassWithConstructor = (function () {
    function ClassWithConstructor() {
    }
    return ClassWithConstructor;
}());
ClassWithConstructor = __decorate([
    classConstructorDec
], ClassWithConstructor);
var classConstrInstance = new ClassWithConstructor();
console.log("classConstrInstance.testProperty: " +
    ("" + classConstrInstance.testProperty));
// Property Decorators
// ===================
// Property decorators are decorator functions that can be used on class
// properties. Property decorators are called with two parameters, the class
// prototype itself, and the property name. Amongst other things, property
// decorators provide the ability to check whether a particular property has
// been declared on a class instance.
function propertyDec(target, propertyKey) {
    // console.log(`target: ${target}`);
    // console.log(`target.constructor: ${target.constructor}`);
    if (typeof (target) === 'function') {
        console.log("class name: " + target.name);
    }
    else {
        console.log("class name: " + target.constructor.name);
    }
    console.log("propertyKey: " + propertyKey);
}
var ClassWithPropertyDec = (function () {
    function ClassWithPropertyDec() {
    }
    return ClassWithPropertyDec;
}());
__decorate([
    propertyDec,
    __metadata("design:type", String)
], ClassWithPropertyDec.prototype, "name");
// Static property decorators
// ==========================
// Property decorators can also be applies to static class properties. The
// actual arguments that are pased in at runtime are slightly different.
var StaticClassWithPropertyDec = (function () {
    function StaticClassWithPropertyDec() {
    }
    return StaticClassWithPropertyDec;
}());
__decorate([
    propertyDec,
    __metadata("design:type", String)
], StaticClassWithPropertyDec, "name");
// Method decorators
// =================
function methodDec(target, methodName, descriptor) {
    console.log("target: " + target);
    console.log("methodName: " + methodName);
    console.log("target[methodName]: " + target[methodName]);
}
var ClassWithMethodDec = (function () {
    function ClassWithMethodDec() {
    }
    ClassWithMethodDec.prototype.print = function (output) {
        console.log("ClassWithMethodDec.print (" + output + ") called.");
    };
    return ClassWithMethodDec;
}());
__decorate([
    methodDec,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassWithMethodDec.prototype, "print");
// Using method decorators
// =======================
// Injecting new functionality into the class. In this case, logging a message
// to the console every time a method is called.
function auditLogDec(target, methodName, descriptor) {
    // Get the definition of the method that we are decorating
    var originalFunction = target[methodName];
    var auditFunction = function () {
        console.log("auditLogDec: overide of " + methodName + " called ");
        // Call the original function
        originalFunction.apply(this, arguments);
    };
    // Wrap the original function with the new function
    target[methodName] = auditFunction;
}
var ClassWithAuditDec = (function () {
    function ClassWithAuditDec() {
    }
    ClassWithAuditDec.prototype.print = function (output) {
        console.log("ClassWithAuditDec.print (" + output + ") called.");
    };
    return ClassWithAuditDec;
}());
__decorate([
    auditLogDec,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassWithAuditDec.prototype, "print");
var auditClass = new ClassWithAuditDec();
auditClass.print("test");
// Parameter decorators
// ====================
// Used to decorate the parameters of a particular method.
function parameterDec(target, methodName, parameterIndex) {
    console.log("target: " + target);
    console.log("methodName: " + methodName);
    console.log("parameterIndex: " + parameterIndex);
}
var ClassWithParamDec = (function () {
    function ClassWithParamDec() {
    }
    ClassWithParamDec.prototype.print = function (value) {
    };
    return ClassWithParamDec;
}());
__decorate([
    __param(0, parameterDec),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassWithParamDec.prototype, "print");
// Decorator metadata
// ==================
// The TypeScript compiler includes experimental support for decorator metadata.
// This is metadata that is generated on class definitions in order to
// supplement the information that is passed into decorators.
// Must use third-party library: reflect-metadata
// npm install reflect-metadata --save-dev
// npm install @types/reflect-metadata --save-dev
require("reflect-metadata");
function metadataParameterDec(target, methodName, parameterIndex) {
    var designType = Reflect.getMetadata("design:type", target, methodName);
    console.log("designType: " + designType);
    var designParamTypes = Reflect.getMetadata("design:paramtypes", target, methodName);
    console.log("paramtypes: " + designParamTypes);
    var designReturnType = Reflect.getMetadata("design:returntype", target, methodName);
    console.log("returntypes: " + designReturnType);
}
var ClassWithMetaData = (function () {
    function ClassWithMetaData() {
    }
    ClassWithMetaData.prototype.print = function (id, name) {
        return 1000;
    };
    return ClassWithMetaData;
}());
__decorate([
    __param(0, metadataParameterDec),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Number)
], ClassWithMetaData.prototype, "print");
//# sourceMappingURL=hello_ch04.js.map