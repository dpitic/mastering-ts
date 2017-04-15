/*
 * JavaScript closures are used implement classes in TypeScript. A closure is a
 * function that refers to independent variables which remember the environment
 * in which they were created. A closure is a JavaScript object that combines
 * a function with the initial environment in which it was created. TypeScript
 * uses the module pattern to implement classes in JavaScript.
 */

function TestClosure(value) {
	this._value = value;		// closure will remember the environment state
	function printValue() {
		console.log(this._value);
	}
	return printValue;
}

var myClosure = TestClosure(12);
myClosure();	// 12