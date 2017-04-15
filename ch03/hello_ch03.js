// Interfaces
// ==========
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var FirstNameSpace;
(function (FirstNameSpace) {
    var NotExported = (function () {
        function NotExported() {
        }
        return NotExported;
    }());
    var NameSpaceClass = (function () {
        function NameSpaceClass() {
        }
        return NameSpaceClass;
    }());
    FirstNameSpace.NameSpaceClass = NameSpaceClass;
})(FirstNameSpace || (FirstNameSpace = {}));
var firstNameSpace = new FirstNameSpace.NameSpaceClass();
var SecondNameSpace;
(function (SecondNameSpace) {
    var NameSpaceClass = (function () {
        function NameSpaceClass() {
        }
        return NameSpaceClass;
    }());
    SecondNameSpace.NameSpaceClass = NameSpaceClass;
})(SecondNameSpace || (SecondNameSpace = {}));
var secondNameSpace = new SecondNameSpace.NameSpaceClass();
var InterfaceInheritanceClass = (function () {
    function InterfaceInheritanceClass() {
    }
    return InterfaceInheritanceClass;
}());
// Class inheritance
// =================
var BaseClass = (function () {
    function BaseClass() {
    }
    return BaseClass;
}());
var DerivedFromBaseClass = (function (_super) {
    __extends(DerivedFromBaseClass, _super);
    function DerivedFromBaseClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DerivedFromBaseClass;
}(BaseClass));
var MultipleInterfaces = (function () {
    function MultipleInterfaces() {
    }
    return MultipleInterfaces;
}());
// The super keyword
// =================
var BaseClassWithConstructor = (function () {
    function BaseClassWithConstructor(_id) {
        this.id = _id;
    }
    return BaseClassWithConstructor;
}());
var DerivedClassWithConstructor = (function (_super) {
    __extends(DerivedClassWithConstructor, _super);
    function DerivedClassWithConstructor(_id, _name) {
        var _this = _super.call(this, _id) || this;
        _this.name = _name;
        return _this;
    }
    return DerivedClassWithConstructor;
}(BaseClassWithConstructor));
// Function overloading
// ====================
var BaseClassWithFunction = (function () {
    function BaseClassWithFunction() {
    }
    BaseClassWithFunction.prototype.getProperties = function () {
        return "id: " + this.id;
    };
    return BaseClassWithFunction;
}());
var DerivedClassWithFunction = (function (_super) {
    __extends(DerivedClassWithFunction, _super);
    function DerivedClassWithFunction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DerivedClassWithFunction.prototype.getProperties = function () {
        return _super.prototype.getProperties.call(this) + ", name: " + this.name;
    };
    return DerivedClassWithFunction;
}(BaseClassWithFunction));
var derivedClassWithFunction = new DerivedClassWithFunction();
derivedClassWithFunction.id = 1;
derivedClassWithFunction.name = "derivedName";
console.log("" + derivedClassWithFunction.getProperties());
// Protected class members
// =======================
var ClassUsingProtected = (function () {
    function ClassUsingProtected() {
    }
    ClassUsingProtected.prototype.getId = function () {
        return this.id;
    };
    return ClassUsingProtected;
}());
var DerivedFromProtected = (function (_super) {
    __extends(DerivedFromProtected, _super);
    function DerivedFromProtected() {
        var _this = _super.call(this) || this;
        _this.id = 0;
        return _this;
    }
    return DerivedFromProtected;
}(ClassUsingProtected));
var derivedFromProtected = new DerivedFromProtected();
// id property of derivedFromProtected is protected; not accessible here
console.log("getId() returns: " + derivedFromProtected.getId());
// Abstract classes
// ================
var Employee = (function () {
    function Employee() {
    }
    Employee.prototype.printDetails = function () {
        console.log("id: " + this.id + ", name: " + this.name);
    };
    return Employee;
}());
var Manager = (function () {
    function Manager() {
    }
    Manager.prototype.printDetails = function () {
        console.log("id: " + this.id + ", name: " + this.name + ",\n            employeeCount: " + this.employees.length);
    };
    return Manager;
}());
var AbstractEmployee = (function () {
    function AbstractEmployee() {
    }
    AbstractEmployee.prototype.printDetails = function () {
        // This calls the subclass getDetails()
        console.log(this.getDetails());
    };
    return AbstractEmployee;
}());
var NewEmployee = (function (_super) {
    __extends(NewEmployee, _super);
    function NewEmployee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewEmployee.prototype.getDetails = function () {
        return "id: " + this.id + ", name: " + this.name;
    };
    return NewEmployee;
}(AbstractEmployee));
var NewManager = (function (_super) {
    __extends(NewManager, _super);
    function NewManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewManager.prototype.getDetails = function () {
        return _super.prototype.getDetails.call(this) + (", employeeCount: " + this.employees.length);
    };
    return NewManager;
}(NewEmployee));
var employee = new NewEmployee();
employee.id = 1;
employee.name = "Employee Name";
employee.printDetails();
var manager = new NewManager();
manager.id = 2;
manager.name = "Manager Name";
manager.employees = new Array();
manager.printDetails();
// Factory Design pattern
// ======================
var PersonCategory;
(function (PersonCategory) {
    PersonCategory[PersonCategory["Infant"] = 0] = "Infant";
    PersonCategory[PersonCategory["Child"] = 1] = "Child";
    PersonCategory[PersonCategory["Adult"] = 2] = "Adult";
})(PersonCategory || (PersonCategory = {}));
var Person = (function () {
    function Person(dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
    Person.prototype.printDetails = function () {
        console.log("Person: ");
        console.log("Date of Birth : " + this.dateOfBirth.toDateString());
        console.log("Category      : " + PersonCategory[this.category]);
        console.log("Can sign      : " + this.canSignContracts());
    };
    return Person;
}());
var Infant = (function (_super) {
    __extends(Infant, _super);
    function Infant(dateOfBirth) {
        var _this = _super.call(this, dateOfBirth) || this;
        _this.category = PersonCategory.Infant;
        return _this;
    }
    Infant.prototype.canSignContracts = function () { return false; };
    return Infant;
}(Person));
var Child = (function (_super) {
    __extends(Child, _super);
    function Child(dateOfBirth) {
        var _this = _super.call(this, dateOfBirth) || this;
        _this.category = PersonCategory.Child;
        return _this;
    }
    Child.prototype.canSignContracts = function () { return false; };
    return Child;
}(Person));
var Adult = (function (_super) {
    __extends(Adult, _super);
    function Adult(dateOfBirth) {
        var _this = _super.call(this, dateOfBirth) || this;
        _this.category = PersonCategory.Adult;
        return _this;
    }
    Adult.prototype.canSignContracts = function () { return true; };
    return Adult;
}(Person));
var PersonFactory = (function () {
    function PersonFactory() {
    }
    /**
     * Return the correct type of person based on the date of birth.
     */
    PersonFactory.prototype.getPerson = function (dateOfBirth) {
        var dateNow = new Date(); // today's date
        var currentMonth = dateNow.getMonth() + 1;
        var currentDate = dateNow.getDate(); // day of the month
        var dateTwoYearsAgo = new Date(dateNow.getFullYear() - 2, currentMonth, currentDate);
        var date18YearsAgo = new Date(dateNow.getFullYear() - 18, currentMonth, currentDate);
        if (dateOfBirth >= dateTwoYearsAgo) {
            return new Infant(dateOfBirth);
        }
        if (dateOfBirth >= date18YearsAgo) {
            return new Child(dateOfBirth);
        }
        return new Adult(dateOfBirth);
    };
    return PersonFactory;
}());
var factory = new PersonFactory();
var p1 = factory.getPerson(new Date(2015, 0, 20));
p1.printDetails();
var p2 = factory.getPerson(new Date(2000, 0, 20));
p2.printDetails();
var p3 = factory.getPerson(new Date(1969, 0, 20));
p3.printDetails();
//# sourceMappingURL=hello_ch03.js.map