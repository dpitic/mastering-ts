// Type syntax
function doCalculation(a, b, c) {
    return (a * b) + c;
}
var result = doCalculation(3, 2, 1);
console.log("doCalculation(3,2,1):" + result);
var myString;
var myNumber;
var myBoolean;
myString = "1";
myNumber = 1;
myBoolean = true;
myString = myNumber.toString();
myBoolean = (myString === "test");
if (myBoolean) {
    myNumber = 1;
}
// Inferred typing
var inferredString = "this is a string";
var inferredNumber = 1;
// Duck typing
var complexType = { name: "myName", id: 1 };
complexType = { id: 2, name: "anotherName" };
// Template strings
var myVariable = "test";
console.log("myVariable=" + myVariable);
console.log("myVariable=" + myVariable);
// Arrays
var arrayOfNumbers = [1, 2, 3];
arrayOfNumbers = [3, 4, 5, 6, 7, 8, 9];
console.log("arrayOfNumbers: " + arrayOfNumbers);
// For ... of
var arrayOfStrings = ["first", "second", "third"];
for (var i = 0; i < arrayOfStrings.length; i++) {
    console.log("arrayOfStrings[" + i + "] = " + arrayOfStrings[i]);
}
for (var itemKey in arrayOfStrings) {
    var itemValue = arrayOfStrings[itemKey];
    console.log("arrayOfStrings[" + itemKey + "] = " + itemValue);
}
for (var _i = 0, arrayOfStrings_1 = arrayOfStrings; _i < arrayOfStrings_1.length; _i++) {
    var arrayItem = arrayOfStrings_1[_i];
    console.log("arrayItem = " + arrayItem);
}
// The any Type
var item1 = { id: 1, name: "item 1" };
item1 = { id: 2 };
var item1 = { id: 1, name: "item 1" };
item1 = { id: 2 };
// Enums
var DoorState;
(function (DoorState) {
    DoorState[DoorState["Open"] = 0] = "Open";
    DoorState[DoorState["Closed"] = 1] = "Closed";
    DoorState[DoorState["Ajar"] = 2] = "Ajar";
})(DoorState || (DoorState = {}));
var openDoor = DoorState.Open;
console.log("openDoor is: " + openDoor);
var closedDoor = DoorState["Closed"];
console.log("closedDoor is: " + closedDoor);
var ajarDoor = DoorState[2];
console.log("ajarDoor is: " + ajarDoor);
var constDoorOpen = DoorState.Open;
console.log("constDoorOpen is: " + constDoorOpen);
console.log("" + 0 /* "Open" */);
var anyValue = 2;
console.log("anyValue = " + anyValue);
// Const values
var constValue = "test"; // value cannot be changed
// The let keyword
var lValue = 2;
console.log("lValue = " + lValue);
if (lValue === 2) {
    var lValue_1 = 2001;
    console.log("block scoped lValue : " + lValue_1);
}
console.log("lValue = " + lValue);
// Functions
function addNumbers(a, b) {
    return (a + b).toString();
}
var addResult = addNumbers(2, 3);
console.log("addNumbers returned: " + addResult);
// Anonymous Functions
var addFunction = function (a, b) {
    return a + b;
};
var addFunctionResult = addFunction(2, 3);
console.log("addFunctionResult: " + addFunctionResult);
// Optional parameters
function concatStrings(a, b, c) {
    return a + b + c;
}
var concat3strings = concatStrings("a", "b", "c");
console.log("concat3strings: " + concat3strings);
var concat2strings = concatStrings("a", "b");
console.log("concat2strings: " + concat2strings);
// Default parameters
function concatStringsDefault(a, b, c) {
    if (c === void 0) { c = "c"; }
    return a + b + c;
}
var defaultConcat = concatStringsDefault("a", "b");
console.log("defaultConcat: " + defaultConcat);
// Rest parameters
function testArguments() {
    var argArray = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        argArray[_i] = arguments[_i];
    }
    if (argArray.length > 0) {
        for (var i = 0; i < argArray.length; i++) {
            console.log("argArray[" + i + "] = " + argArray[i]);
            // use JavaScript arguments variable; inferred type any
            console.log("arguments[" + i + "] = " + arguments[i]);
        }
    }
}
testArguments(9);
testArguments(1, 2, 3);
function testNormalAndRestArguments(arg1, arg2) {
    var argArray = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        argArray[_i - 2] = arguments[_i];
    }
    console.log("arg1: " + arg1);
    console.log("arg2: " + arg2);
    if (argArray.length > 0) {
        for (var i = 0; i < argArray.length; i++) {
            console.log("argArray[" + i + "] = " + argArray[i]);
        }
    }
}
testNormalAndRestArguments("string", 1);
testNormalAndRestArguments("string", 1, 2, 3, 4);
// Function callbacks
function callbackFunction(text) {
    console.log("inside callbackFunction " + text);
}
function doSomethingWithACallback(initialText, callback) {
    console.log("inside doSomethingWithACallback " + initialText);
    callback(initialText);
}
doSomethingWithACallback("myText", callbackFunction);
function add(a, b) {
    return a + b; // any keyword by convention.
}
console.log("add(1,1) = " + add(1, 1));
console.log("add(\"1\",\"1\") = " + add("1", "1"));
