// Decorators
// ==========

// Decordator syntax
// =================

// A decorator is simply a function which is called with a specific set of
// parameters, which are automatically populated by the JavaScript runtime. The
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

// Multiple decorators
// ===================

function secondDecorator(constructor: Function) {
  console.log('secondDecorator called.');
}

// Decorators are called in reverse order.

@simpleDecorator
@secondDecorator
class ClassWithMultipleDecorators {
}

// Decorator factories
// ===================

// In order to allow for decorators to accept parameters, we need to use a
// decorator factory. This is a wrapper function that returns the decorator
// function itself.

function decoratorFactory(name: string) {
  return function(constructor: Function) {
    console.log(`decorator function called with: ${name}`);
  }
}

@decoratorFactory('testName')
class ClasswithDecoratorFactory {
}

// Class decorator parameters
// ==========================

// Class decorators will be invoked with the constructor function of the class
// that has been decorated, when the class is defined.

function classConstructorDec(constructor: Function) {
  console.log(`constructor: ${constructor}`);
  console.log(`constructor.name: ${(<any>constructor).name}`);
  constructor.prototype.testProperty = 'testProperty_value';
}

@classConstructorDec
class ClassWithConstructor {
}

let classConstrInstance = new ClassWithConstructor();
console.log(
  `classConstrInstance.testProperty: ` +
  `${(<any>classConstrInstance).testProperty}`);

// Property Decorators
// ===================

// Property decorators are decorator functions that can be used on class
// properties. Property decorators are called with two parameters, the class
// prototype itself, and the property name. Amongst other things, property
// decorators provide the ability to check whether a particular property has
// been declared on a class instance.

function propertyDec(target: any, propertyKey: string) {
  // console.log(`target: ${target}`);
  // console.log(`target.constructor: ${target.constructor}`);
  if (typeof (target) === 'function') {
    console.log(`class name: ${target.name}`);
  } else {
    console.log(`class name: ${target.constructor.name}`);
  }
  console.log(`propertyKey: ${propertyKey}`);
}

class ClassWithPropertyDec {
  @propertyDec name: string;
}

// Static property decorators
// ==========================

// Property decorators can also be applies to static class properties. The
// actual arguments that are pased in at runtime are slightly different.

// class StaticClassWithPropertyDec {
//   @propertyDec static name: string;
// }

// Method decorators
// =================

function methodDec(
  target: any, methodName: string, descriptor?: PropertyDescriptor) {
  console.log(`target: ${target}`);
  console.log(`methodName: ${methodName}`);
  console.log(`target[methodName]: ${target[methodName]}`);
}

class ClassWithMethodDec {
  @methodDec
  print(output: string) {
    console.log(`ClassWithMethodDec.print (${output}) called.`);
  }
}

// Using method decorators
// =======================

// Injecting new functionality into the class. In this case, logging a message
// to the console every time a method is called.

function auditLogDec(
  target: any, methodName: string, descriptor?: PropertyDescriptor) {
  // Get the definition of the method that we are decorating
  let originalFunction = target[methodName];

  let auditFunction =
    function() {
      console.log(`auditLogDec: overide of ${methodName} called `);
      // Call the original function
      originalFunction.apply(this, arguments);
    }

  // Wrap the original function with the new function
  target[methodName] = auditFunction;
}

class ClassWithAuditDec {
  @auditLogDec
  print(output: string) {
    console.log(`ClassWithAuditDec.print (${output}) called.`);
  }
}

let auditClass = new ClassWithAuditDec();
auditClass.print("test");

// Parameter decorators
// ====================

// Used to decorate the parameters of a particular method.

function parameterDec(target: any, methodName: string, parameterIndex: number) {
  console.log(`target: ${target}`);
  console.log(`methodName: ${methodName}`);
  console.log(`parameterIndex: ${parameterIndex}`);
}

class ClassWithParamDec {
  print( @parameterDec value: string) {

  }
}

// Decorator metadata
// ==================

// The TypeScript compiler includes experimental support for decorator metadata.
// This is metadata that is generated on class definitions in order to
// supplement the information that is passed into decorators.

// Must use third-party library: reflect-metadata
// npm install reflect-metadata --save-dev
// npm install @types/reflect-metadata --save-dev

import 'reflect-metadata';

function metadataParameterDec(target: any, methodName: string,
  parameterIndex: number) {

  let designType = Reflect.getMetadata("design:type", target, methodName);
  console.log(`designType: ${designType}`);

  let designParamTypes = Reflect.getMetadata("design:paramtypes", target,
    methodName);
  console.log(`paramtypes: ${designParamTypes}`);

  let designReturnType = Reflect.getMetadata("design:returntype", target,
    methodName);
  console.log(`returntypes: ${designReturnType}`);
}

class ClassWithMetaData {
  print( @metadataParameterDec id: number, name: string): number {
    return 1000;
  }
}

// Generics
// ========

class Concatenator<T> {
  concatenateArray(inputArray: Array<T>): string {
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

var stringConcat = new Concatenator<string>();
var numberConcat = new Concatenator<number>();

let concatResult = stringConcat.concatenateArray(
  ["first", "second", "third"]);
console.log(concatResult);

var stringArray: string[] = ["first", "second", "third"];
var numberArray: number[] = [1, 2, 3];
var stringResult = stringConcat.concatenateArray(stringArray);
console.log(stringResult);
var numberResult = numberConcat.concatenateArray(numberArray);
console.log(numberResult);

// Using the type T
// ================

class MyClass {
  private _name: string;
  constructor(arg1: number) {
    this._name = arg1 + "_MyClass";
  }
  toString(): string {
    return this._name;
  }
}

let myArray: MyClass[] = [
  new MyClass(1),
  new MyClass(2),
  new MyClass(3)
]

let myArrayConcatenator = new Concatenator<MyClass>();
let myArrayResult = myArrayConcatenator.concatenateArray(myArray);
console.log(myArrayResult);

// Constraining the type of T
// ==========================

enum ClubHomeCountry {
  England,
  Germany
}

interface IFootballClub {
  getName(): string;
  getHomeCountry(): ClubHomeCountry;
}

abstract class FootballClub implements IFootballClub {
  protected _name: string;
  protected _homeCountry: ClubHomeCountry;
  getName() { return this._name };
  getHomeCountry() { return this._homeCountry };
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

class FootballClubPrinter<T extends IFootballClub>
  implements IFootballClubPrinter<T> {
  print(arg: T) {
    console.log(` ${arg.getName()} is` +
      ` ${this.IsEnglishTeam(arg)} ` +
      `an English football team.`);
  };
  IsEnglishTeam(arg: T): string {
    if (arg.getHomeCountry() == ClubHomeCountry.England) {
      return "";
    } else {
      return "NOT";
    }
  }
}

let clubInfo = new FootballClubPrinter();
clubInfo.print(new Liverpool());
clubInfo.print(new BorussiaDortmund());

// Generic Interfaces
// ==================

interface IFootballClubPrinter<T extends IFootballClub> {
  print(arg: T);
  IsEnglishTeam(arg: T);
}

// Creating new objects within generics
// ====================================

class FirstClass {
  id: number;
}

class SecondClass {
  name: string;
}

class GenericCreator<T> {
  create(arg1: { new (): T }): T {
    return new arg1();
  }
}
var creator1 = new GenericCreator<FirstClass>();
var firstClass: FirstClass = creator1.create(FirstClass);

var creator2 = new GenericCreator<SecondClass>();
var secondClass: SecondClass = creator2.create(SecondClass);

// Promises
// ========

// Typical callback code. Working with a lot of callbacks can make the cdoe
// become complex and repetitive.

function delayedResponseWithCallback(callback: Function) {
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

function fnDelayedPromise(resolve: () => void, reject: () => void) {
  function afterTimeout() {
    resolve();
  }
  setTimeout(afterTimeout, 2000);
}

// Promise object
function delayedResponsePromies(): Promise<void> {
  return new Promise<void>(fnDelayedPromise);
}

// The preceding two functions are normally combined into the same code block.
function delayedPromise(): Promise<void> {
  return new Promise<void>(
    (resolve: () => void, reject: () => void) => {
      function afterTimeout() {
        resolve();
      }

      setTimeout(afterTimeout, 1000);
    }
  );
}

// Using promises
// ==============

function callDelayedPromise() {
  console.log(`calling delayedPromise()`);
  delayedPromise().then(
    () => { console.log(`delayedPromise.then()`) }
  );
}

callDelayedPromise();

function errorPromise(): Promise<void> {
  return new Promise<void>(
    (resolve: () => void, reject: () => void) => {
      reject();
    }
  );
}

function callErrorPromise() {
  console.log(`calling errorPromise()`);
  errorPromise().then(
    () => { console.log(`no error.`) }
  ).catch(
    () => { console.log(`an error occurred`) }
    );
}

callErrorPromise();

// Callback versus promise syntax
// ==============================

function invokeAsync(success: Function, error: Function) {
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
  delayedPromise().then(
    () => {
      // execute on success
    }
  ).catch(
    () => {
      // execute on error
    }
    );
}

// Returning values from promises
// ==============================

function delayedPromiseWithParam(): Promise<string> {
  return new Promise<string>(
    (
      resolve: (str: string) => void,
      reject: (str: string) => void
    ) => {
      function afterWait() {
        resolve("resolved_within_promise");
      }
      setTimeout(afterWait, 2000);
    }
  );
}

function callPromiseWithParam() {
  console.log(`calling delayedPromiseWithParam()`);
  delayedPromiseWithParam().then(
    // Anonymous function to call on success
    (message: string) => {
      console.log(`Promise.then() returned ${message}`);
    }
  );
}

callPromiseWithParam();

interface IPromiseMessage {
  message: string;
  id: number;
}

function promiseWithInterface(): Promise<IPromiseMessage> {
  return new Promise<IPromiseMessage>(
    (
      resolve: (message: IPromiseMessage) => void,
      reject: (message: IPromiseMessage) => void
    ) => {
      resolve({ message: "test", id: 1 });
    }
  );
}

// Async and await
// ===============

function awaitDelayed(): Promise<void> {
  return new Promise<void>(
    (resolve: () => void,
      reject: () => void) => {
      function afterWait() {
        console.log(`calling resolve()`);
        resolve();
      }
      setTimeout(afterWait, 1000);
    }
  );
}

async function callAwaitDelayed() {
  console.log(`call awaitDelayed()`);
  await awaitDelayed();
  console.log(`after awaitDelayed()`);
}

callAwaitDelayed();

// Await errors
// ============

function awaitError(): Promise<string> {
  return new Promise<string>(
    (resolve: (message: string) => void,
      reject: (error: string) => void) => {
      function afterWait() {
        console.log(`calling reject`);
        reject("an error occurred");
      }
      setTimeout(afterWait, 1000);
    }
  );
}

async function callAwaitError() {
  console.log(`call awaitError()`);
		try {
    await awaitError();
		} catch (error) {
    console.log(`error returned: ${error}`);
		}
		console.log(`after awaitDelayed()`);
}

callAwaitError();

// Promise versus await syntax
// ===========================

function simplePromises() {
  // invoke async function
  delayedPromise().then(
    () => {
      // execute on success
    }
  ).catch(
    () => {
      // execute on error
    }
    );
  // code here does NOT wait for async call
}

async function usingAsyncSyntax() {
  try {
    await delayedPromise();
    // execute on success
  } catch (error) {
    //execute on error
  }
  // code here waits for async call
}

// Await messages
// ==============

function asyncwithMessage(): Promise<string> {
  return new Promise<string>(
    (resolve: (message: string) => void,
      reject: (message: string) => void
    ) => {
      function afterWait() {
        resolve("resolve_message");
      }
      setTimeout(afterWait, 1000);
    }
  );
}

async function awaitMessage() {
	console.log(`calling asyncwithMessage()`);
	let message: string = await asyncwithMessage();

	console.log(`message returned: ${message}`);
}

awaitMessage();
