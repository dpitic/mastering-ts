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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Decordator syntax
// =================
// A decorator is simply a function which is called with a specific set of
// parameters, which are automatically populated by the JavaScript runtime. The
// parameters contain information about the class to which the decorator has
// been applied. The number of parameters and the types of the parameters
// determine where a decorator can be applied.
// Simple class decorator
function simpleDecorator(constructor) {
    console.log(`simpleDecorator called.`);
}
// Decorators are applied when a class is being defined; not when instantiated
let ClassWithSimpleDecorator = class ClassWithSimpleDecorator {
};
ClassWithSimpleDecorator = __decorate([
    simpleDecorator
], ClassWithSimpleDecorator);
// Decorators are only invoked as the class is being defined.
let instance_1 = new ClassWithSimpleDecorator();
let instance_2 = new ClassWithSimpleDecorator();
console.log(`instance_1: ${instance_1}`);
console.log(`instance_2: ${instance_2}`);
// Multiple decorators
// ===================
function secondDecorator(constructor) {
    console.log('secondDecorator called.');
}
// Decorators are called in reverse order.
let ClassWithMultipleDecorators = class ClassWithMultipleDecorators {
};
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
        console.log(`decorator function called with: ${name}`);
    };
}
let ClasswithDecoratorFactory = class ClasswithDecoratorFactory {
};
ClasswithDecoratorFactory = __decorate([
    decoratorFactory('testName')
], ClasswithDecoratorFactory);
// Class decorator parameters
// ==========================
// Class decorators will be invoked with the constructor function of the class
// that has been decorated, when the class is defined.
function classConstructorDec(constructor) {
    console.log(`constructor: ${constructor}`);
    console.log(`constructor.name: ${constructor.name}`);
    constructor.prototype.testProperty = 'testProperty_value';
}
let ClassWithConstructor = class ClassWithConstructor {
};
ClassWithConstructor = __decorate([
    classConstructorDec
], ClassWithConstructor);
let classConstrInstance = new ClassWithConstructor();
console.log(`classConstrInstance.testProperty: ` +
    `${classConstrInstance.testProperty}`);
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
        console.log(`class name: ${target.name}`);
    }
    else {
        console.log(`class name: ${target.constructor.name}`);
    }
    console.log(`propertyKey: ${propertyKey}`);
}
class ClassWithPropertyDec {
}
__decorate([
    propertyDec,
    __metadata("design:type", String)
], ClassWithPropertyDec.prototype, "name", void 0);
// Static property decorators
// ==========================
// Property decorators can also be applies to static class properties. The
// actual arguments that are pased in at runtime are slightly different.
// class StaticClassWithPropertyDec {
//   @propertyDec static name: string;
// }
// Method decorators
// =================
function methodDec(target, methodName, descriptor) {
    console.log(`target: ${target}`);
    console.log(`methodName: ${methodName}`);
    console.log(`target[methodName]: ${target[methodName]}`);
}
class ClassWithMethodDec {
    print(output) {
        console.log(`ClassWithMethodDec.print (${output}) called.`);
    }
}
__decorate([
    methodDec,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassWithMethodDec.prototype, "print", null);
// Using method decorators
// =======================
// Injecting new functionality into the class. In this case, logging a message
// to the console every time a method is called.
function auditLogDec(target, methodName, descriptor) {
    // Get the definition of the method that we are decorating
    let originalFunction = target[methodName];
    let auditFunction = function () {
        console.log(`auditLogDec: overide of ${methodName} called `);
        // Call the original function
        originalFunction.apply(this, arguments);
    };
    // Wrap the original function with the new function
    target[methodName] = auditFunction;
}
class ClassWithAuditDec {
    print(output) {
        console.log(`ClassWithAuditDec.print (${output}) called.`);
    }
}
__decorate([
    auditLogDec,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassWithAuditDec.prototype, "print", null);
let auditClass = new ClassWithAuditDec();
auditClass.print("test");
// Parameter decorators
// ====================
// Used to decorate the parameters of a particular method.
function parameterDec(target, methodName, parameterIndex) {
    console.log(`target: ${target}`);
    console.log(`methodName: ${methodName}`);
    console.log(`parameterIndex: ${parameterIndex}`);
}
class ClassWithParamDec {
    print(value) {
    }
}
__decorate([
    __param(0, parameterDec),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassWithParamDec.prototype, "print", null);
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
    let designType = Reflect.getMetadata("design:type", target, methodName);
    console.log(`designType: ${designType}`);
    let designParamTypes = Reflect.getMetadata("design:paramtypes", target, methodName);
    console.log(`paramtypes: ${designParamTypes}`);
    let designReturnType = Reflect.getMetadata("design:returntype", target, methodName);
    console.log(`returntypes: ${designReturnType}`);
}
class ClassWithMetaData {
    print(id, name) {
        return 1000;
    }
}
__decorate([
    __param(0, metadataParameterDec),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Number)
], ClassWithMetaData.prototype, "print", null);
// Generics
// ========
class Concatenator {
    concatenateArray(inputArray) {
        let returnString = "";
        for (let i = 0; i < inputArray.length; i++) {
            if (i > 0) {
                returnString += ",";
            }
            returnString += inputArray[i].toString();
        }
        return returnString;
    }
}
var stringConcat = new Concatenator();
var numberConcat = new Concatenator();
let concatResult = stringConcat.concatenateArray(["first", "second", "third"]);
console.log(concatResult);
var stringArray = ["first", "second", "third"];
var numberArray = [1, 2, 3];
var stringResult = stringConcat.concatenateArray(stringArray);
console.log(stringResult);
var numberResult = numberConcat.concatenateArray(numberArray);
console.log(numberResult);
// Using the type T
// ================
class MyClass {
    constructor(arg1) {
        this._name = arg1 + "_MyClass";
    }
    toString() {
        return this._name;
    }
}
let myArray = [
    new MyClass(1),
    new MyClass(2),
    new MyClass(3)
];
let myArrayConcatenator = new Concatenator();
let myArrayResult = myArrayConcatenator.concatenateArray(myArray);
console.log(myArrayResult);
// Constraining the type of T
// ==========================
var ClubHomeCountry;
(function (ClubHomeCountry) {
    ClubHomeCountry[ClubHomeCountry["England"] = 0] = "England";
    ClubHomeCountry[ClubHomeCountry["Germany"] = 1] = "Germany";
})(ClubHomeCountry || (ClubHomeCountry = {}));
class FootballClub {
    getName() { return this._name; }
    ;
    getHomeCountry() { return this._homeCountry; }
    ;
}
class Liverpool extends FootballClub {
    constructor() {
        super();
        this._name = "Liverpool F.C.";
        this._homeCountry = ClubHomeCountry.England;
    }
}
class BorussiaDortmund extends FootballClub {
    constructor() {
        super();
        this._name = "Borussia Dortmund";
        this._homeCountry = ClubHomeCountry.Germany;
    }
}
// IFootballClubPrinter<T> defined below in Generic Interfaces
class FootballClubPrinter {
    print(arg) {
        console.log(` ${arg.getName()} is` +
            ` ${this.IsEnglishTeam(arg)} ` +
            `an English football team.`);
    }
    ;
    IsEnglishTeam(arg) {
        if (arg.getHomeCountry() == ClubHomeCountry.England) {
            return "";
        }
        else {
            return "NOT";
        }
    }
}
let clubInfo = new FootballClubPrinter();
clubInfo.print(new Liverpool());
clubInfo.print(new BorussiaDortmund());
// Creating new objects within generics
// ====================================
class FirstClass {
}
class SecondClass {
}
class GenericCreator {
    create(arg1) {
        return new arg1();
    }
}
var creator1 = new GenericCreator();
var firstClass = creator1.create(FirstClass);
var creator2 = new GenericCreator();
var secondClass = creator2.create(SecondClass);
// Promises
// ========
// Typical callback code. Working with a lot of callbacks can make the cdoe
// become complex and repetitive.
function delayedResponseWithCallback(callback) {
    function delayedAfterTimeout() {
        console.log(`delayedAfterTimeout`);
        callback();
    }
    // Simulate processing delay
    setTimeout(delayedAfterTimeout, 1000);
}
function callDelayedAndWait() {
    function afterWait() {
        console.log(`afterWait`);
    }
    console.log(`calling delayedResponseWithCallback()`);
    delayedResponseWithCallback(afterWait);
    console.log(`after caling delayedResponseWithCallback()`);
}
callDelayedAndWait();
// Promise syntax
// ==============
// A promise is an object that is created by passing in a function that accepts
// two callbacks. The ifrst callback is used to indicate a successful response,
// and the second callback is used to indicate an error response.
function fnDelayedPromise(resolve, reject) {
    function afterTimeout() {
        resolve();
    }
    setTimeout(afterTimeout, 2000);
}
// Promise object
function delayedResponsePromies() {
    return new Promise(fnDelayedPromise);
}
// The preceding two functions are normally combined into the same code block.
function delayedPromise() {
    return new Promise((resolve, reject) => {
        function afterTimeout() {
            resolve();
        }
        setTimeout(afterTimeout, 1000);
    });
}
// Using promises
// ==============
function callDelayedPromise() {
    console.log(`calling delayedPromise()`);
    delayedPromise().then(() => { console.log(`delayedPromise.then()`); });
}
callDelayedPromise();
function errorPromise() {
    return new Promise((resolve, reject) => {
        reject();
    });
}
function callErrorPromise() {
    console.log(`calling errorPromise()`);
    errorPromise().then(() => { console.log(`no error.`); }).catch(() => { console.log(`an error occurred`); });
}
callErrorPromise();
// Callback versus promise syntax
// ==============================
function invokeAsync(success, error) {
    // execute asynchronous code
}
function standardCallback() {
    function afterCallbackSuccess() {
        // execute on success
    }
    function afterCallbackError() {
        // execute on error
    }
    // Invoke async function
    invokeAsync(afterCallbackSuccess, afterCallbackError);
}
function usingPromises() {
    // Invoke async function here
    delayedPromise().then(() => {
        // execute on success
    }).catch(() => {
        // execute on error
    });
}
// Returning values from promises
// ==============================
function delayedPromiseWithParam() {
    return new Promise((resolve, reject) => {
        function afterWait() {
            resolve("resolved_within_promise");
        }
        setTimeout(afterWait, 2000);
    });
}
function callPromiseWithParam() {
    console.log(`calling delayedPromiseWithParam()`);
    delayedPromiseWithParam().then(
    // Anonymous function to call on success
    (message) => {
        console.log(`Promise.then() returned ${message}`);
    });
}
callPromiseWithParam();
function promiseWithInterface() {
    return new Promise((resolve, reject) => {
        resolve({ message: "test", id: 1 });
    });
}
// Async and await
// ===============
function awaitDelayed() {
    return new Promise((resolve, reject) => {
        function afterWait() {
            console.log(`calling resolve()`);
            resolve();
        }
        setTimeout(afterWait, 1000);
    });
}
function callAwaitDelayed() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`call awaitDelayed()`);
        yield awaitDelayed();
        console.log(`after awaitDelayed()`);
    });
}
callAwaitDelayed();
// Await errors
// ============
function awaitError() {
    return new Promise((resolve, reject) => {
        function afterWait() {
            console.log(`calling reject`);
            reject("an error occurred");
        }
        setTimeout(afterWait, 1000);
    });
}
function callAwaitError() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`call awaitError()`);
        try {
            yield awaitError();
        }
        catch (error) {
            console.log(`error returned: ${error}`);
        }
        console.log(`after awaitDelayed()`);
    });
}
callAwaitError();
// Promise versus await syntax
// ===========================
function simplePromises() {
    // invoke async function
    delayedPromise().then(() => {
        // execute on success
    }).catch(() => {
        // execute on error
    });
    // code here does NOT wait for async call
}
function usingAsyncSyntax() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield delayedPromise();
            // execute on success
        }
        catch (error) {
            //execute on error
        }
        // code here waits for async call
    });
}
// Await messages
// ==============
function asyncwithMessage() {
    return new Promise((resolve, reject) => {
        function afterWait() {
            resolve("resolve_message");
        }
        setTimeout(afterWait, 1000);
    });
}
function awaitMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`calling asyncwithMessage()`);
        let message = yield asyncwithMessage();
        console.log(`message returned: ${message}`);
    });
}
awaitMessage();
//# sourceMappingURL=hello_ch04.js.map