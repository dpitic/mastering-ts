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

