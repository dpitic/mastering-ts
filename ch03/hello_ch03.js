// Interfaces
// ==========
var complexType;
complexType = { id: 1, name: "test" };
var idOnly = { id: 1 };
var idAndName = { id: 2, name: "idAndName" };
idAndName = idOnly;
// Classes
// =======
var SimpleClass = (function () {
    function SimpleClass() {
    }
    SimpleClass.prototype.print = function () {
        console.log("SimpleClass has id: " + this.id);
    };
    return SimpleClass;
}());
var mySimpleClass = new SimpleClass();
mySimpleClass.id = 1001;
mySimpleClass.print();
function printClass(a) {
    a.print();
}
var ClassA = (function () {
    function ClassA() {
    }
    ClassA.prototype.print = function () { console.log('ClassA.print()'); };
    ;
    return ClassA;
}());
var ClassB = (function () {
    function ClassB() {
    }
    ClassB.prototype.print = function () { console.log('ClassB.print()'); };
    ;
    return ClassB;
}());
var classA = new ClassA();
var classB = new ClassB();
printClass(classA);
printClass(classB);
// Class constructors
// ==================
var ClassWithConstructor = (function () {
    function ClassWithConstructor(_id, _name) {
        this.id = _id;
        this.name = _name;
    }
    return ClassWithConstructor;
}());
var classWithConstructor = new ClassWithConstructor(1, "name");
console.log("classWithConstructor.id = " + classWithConstructor.id);
console.log("classWithConstructor.name = " + classWithConstructor.name);
// Class functions
// ===============
var ComplexType = (function () {
    function ComplexType(idArg, nameArg) {
        // Type guard for id
        if (typeof idArg === "number") {
            this.id = idArg;
        }
        this.name = nameArg;
    }
    ComplexType.prototype.print = function () {
        console.log("id: " + this.id + " name: " + this.name);
    };
    ComplexType.prototype.usingTheAnyKeyword = function (arg1) {
        this.id = arg1;
    };
    ComplexType.prototype.usingOptionalParameters = function (optionalArg1) {
        if (optionalArg1) {
            this.id = optionalArg1;
        }
    };
    ComplexType.prototype.usingDefaultParameter = function (defaultArg1) {
        if (defaultArg1 === void 0) { defaultArg1 = 0; }
        this.id = defaultArg1;
    };
    ComplexType.prototype.usingRestSyntax = function () {
        var argArray = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argArray[_i] = arguments[_i];
        }
        if (argArray.length > 0) {
            this.id = argArray[0];
        }
    };
    ComplexType.prototype.usingFunctionCallbacks = function (callback) {
        callback(this.id);
    };
    return ComplexType;
}());
var ct_1 = new ComplexType(1, "ct_1");
var ct_2 = new ComplexType("abc", "ct_2");
//let ct_3 = new ComplexType(true, "test");
ct_1.print();
ct_2.print();
ct_1.usingTheAnyKeyword(true);
ct_1.print();
ct_1.usingTheAnyKeyword({ id: 1, name: "string" });
ct_1.print();
ct_1.usingOptionalParameters(1);
ct_1.print();
ct_1.usingOptionalParameters();
ct_1.print();
ct_1.usingDefaultParameter(2);
ct_1.print();
ct_1.usingDefaultParameter();
ct_1.print();
ct_1.usingRestSyntax(1, 2, 3);
ct_1.print();
ct_1.usingRestSyntax(1, 2, 3, 4, 5);
ct_1.print();
function myCallbackFunction(id) {
    return id.toString();
}
ct_1.usingFunctionCallbacks(myCallbackFunction);
// Class modifiers
// ===============
var ClassWithPublicProperty = (function () {
    function ClassWithPublicProperty() {
    }
    return ClassWithPublicProperty;
}());
var publicAccess = new ClassWithPublicProperty();
publicAccess.id = 10;
var ClassWithPrivateProperty = (function () {
    function ClassWithPrivateProperty(_id) {
        this.id = _id;
    }
    return ClassWithPrivateProperty;
}());
var privateAccess = new ClassWithPrivateProperty(10);
// id property of privateAccess object is private
// Constructor access modifiers
// ============================
var ClassWithAutomaticProperties = (function () {
    // Object properties will be defined in the constructor parameter list
    // ** This makes code harder to read compared to explicitly declaring **
    // ** object properties.                                              **
    function ClassWithAutomaticProperties(id, name) {
        this.id = id;
        this.name = name;
    }
    return ClassWithAutomaticProperties;
}());
var myAutoClass = new ClassWithAutomaticProperties(1, "className");
console.log("myAutoClass.id: " + myAutoClass.id);
// name property of myAutoClass object is private
// Readonly properties
// ===================
var ClassWithReadOnly = (function () {
    function ClassWithReadOnly(_name) {
        // Readonly properties can only be set in the constructor
        this.name = _name;
    }
    return ClassWithReadOnly;
}());
// Class property accessors
// ========================
var ClassWithAccessors = (function () {
    function ClassWithAccessors() {
    }
    Object.defineProperty(ClassWithAccessors.prototype, "id", {
        get: function () {
            console.log("inside get id()");
            return this._id;
        },
        set: function (value) {
            console.log("inside set id()");
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    return ClassWithAccessors;
}());
var classWithAccessors = new ClassWithAccessors();
classWithAccessors.id = 2;
console.log("id property is set to " + classWithAccessors.id);
// Static functions
// ================
var StaticClass = (function () {
    function StaticClass() {
    }
    StaticClass.printTwo = function () {
        console.log("2");
    };
    return StaticClass;
}());
StaticClass.printTwo();
// Static properties
// =================
var StaticProperty = (function () {
    function StaticProperty() {
    }
    StaticProperty.prototype.updateCount = function () {
        StaticProperty.count++;
    };
    return StaticProperty;
}());
StaticProperty.count = 0;
var firstInstance = new StaticProperty();
console.log("StaticProperty.count = " + StaticProperty.count);
firstInstance.updateCount();
console.log("StaticProperty.count = " + StaticProperty.count);
var secondInstance = new StaticProperty();
console.log("StaticProperty.count = " + StaticProperty.count);
secondInstance.updateCount();
console.log("StaticProperty.count = " + StaticProperty.count);
// Namespaces
// ==========
//# sourceMappingURL=hello_ch03.js.map