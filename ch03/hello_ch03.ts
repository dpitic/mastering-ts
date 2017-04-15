// Interfaces
// ==========

interface IComplexType {
    id: number;
    name: string;
}

let complexType: IComplexType;
complexType = { id: 1, name: "test" };

// Optional properties
// ===================

interface IOptionalProp {
    id: number;
    name?: string;
}

let idOnly: IOptionalProp = { id: 1 };
let idAndName: IOptionalProp = { id: 2, name: "idAndName" };

idAndName = idOnly;

// Classes
// =======

class SimpleClass {
    id: number;
    print(): void {
        console.log(`SimpleClass has id: ${this.id}`);
    }
}

let mySimpleClass = new SimpleClass();
mySimpleClass.id = 1001;
mySimpleClass.print();

// Implementing interfaces
// =======================

interface IPrint {
    print();
}

function printClass(a: IPrint) {
    a.print();
}

class ClassA implements IPrint {
    print() { console.log('ClassA.print()') };
}

class ClassB implements IPrint {
    print() { console.log('ClassB.print()') };
}

let classA = new ClassA();
let classB = new ClassB();

printClass(classA);
printClass(classB);

// Class constructors
// ==================

class ClassWithConstructor {
    id: number;
    name: string;
    constructor(_id: number, _name: string) {
        this.id = _id;
        this.name = _name;
    }
}

let classWithConstructor = new ClassWithConstructor(1, "name");

console.log(`classWithConstructor.id = ${classWithConstructor.id}`);
console.log(`classWithConstructor.name = ${classWithConstructor.name}`);

// Class functions
// ===============

class ComplexType implements IComplexType {
    id: number;
    name: string;
    constructor(idArg: number, nameArg: string);
    constructor(idArg: string, nameArg: string);
    constructor(idArg: any, nameArg: any) {
        // Type guard for id
        if (typeof idArg === "number") {
            this.id = idArg;
        }
        this.name = nameArg;
    }

    print(): void {
        console.log(`id: ${this.id} name: ${this.name}`);
    }

    usingTheAnyKeyword(arg1: any): any {
        this.id = arg1;
    }

    usingOptionalParameters(optionalArg1?: number) {
        if (optionalArg1) {
            this.id = optionalArg1;
        }
    }

    usingDefaultParameter(defaultArg1: number = 0) {
        this.id = defaultArg1;
    }

    usingRestSyntax(...argArray: number[]) {
        if (argArray.length > 0) {
            this.id = argArray[0];
        }
    }

    usingFunctionCallbacks(callback: (id: number) => string) {
        callback(this.id);
    }
}

let ct_1 = new ComplexType(1, "ct_1");
let ct_2 = new ComplexType("abc", "ct_2");
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

function myCallbackFunction(id: number): string {
    return id.toString();
}
ct_1.usingFunctionCallbacks(myCallbackFunction);

// Class modifiers
// ===============

class ClassWithPublicProperty {
    public id: number;
}

let publicAccess = new ClassWithPublicProperty();
publicAccess.id = 10;

class ClassWithPrivateProperty {
    private id: number;
    constructor(_id: number) {
        this.id = _id;
    }
}

let privateAccess = new ClassWithPrivateProperty(10);
// id property of privateAccess object is private

// Constructor access modifiers
// ============================

class ClassWithAutomaticProperties {
    // Object properties will be defined in the constructor parameter list
    // ** This makes code harder to read compared to explicitly declaring **
    // ** object properties.                                              **
    constructor(public id: number, private name: string) {
    }
}

let myAutoClass = new ClassWithAutomaticProperties(1, "className");
console.log(`myAutoClass.id: ${myAutoClass.id}`);
// name property of myAutoClass object is private

// Readonly properties
// ===================

class ClassWithReadOnly {
    readonly name: string;        // readonly can only be set in the constructor
    constructor(_name: string) {
        // Readonly properties can only be set in the constructor
        this.name = _name;
    }
}

// Class property accessors
// ========================

class ClassWithAccessors {
    private _id: number;
    get id() {
        console.log(`inside get id()`);
        return this._id;
    }

    set id(value: number) {
        console.log(`inside set id()`);
        this._id = value;
    }
}

var classWithAccessors = new ClassWithAccessors();
classWithAccessors.id = 2;
console.log(`id property is set to ${classWithAccessors.id}`);

// Static functions
// ================

class StaticClass {
    static printTwo() {
        console.log(`2`);
    }
}

StaticClass.printTwo();

// Static properties
// =================

class StaticProperty {
    static count = 0;
    updateCount() {
        StaticProperty.count++;
    }
}

let firstInstance = new StaticProperty();

console.log(`StaticProperty.count = ${StaticProperty.count}`);
firstInstance.updateCount();
console.log(`StaticProperty.count = ${StaticProperty.count}`);

let secondInstance = new StaticProperty();

console.log(`StaticProperty.count = ${StaticProperty.count}`);
secondInstance.updateCount();
console.log(`StaticProperty.count = ${StaticProperty.count}`);

// Namespaces
// ==========

namespace FirstNameSpace {
    class NotExported {
    }
    export class NameSpaceClass {
        id: number;
    }
}

let firstNameSpace = new FirstNameSpace.NameSpaceClass();

namespace SecondNameSpace {
    export class NameSpaceClass {
        name: string;
    }
}

let secondNameSpace = new SecondNameSpace.NameSpaceClass();

// Interface inheritance
// =====================

interface IBase {
    id: number;
}

interface IDerivedFromBase extends IBase {
    name: string;
}

class InterfaceInheritanceClass implements IDerivedFromBase {
    id: number;
    name: string;
}

// Class inheritance
// =================

class BaseClass implements IBase {
    id: number;
}

class DerivedFromBaseClass extends BaseClass implements IDerivedFromBase {
    name: string;
}

interface IFirstInterface {
    id: number;
}

interface ISecondInterface {
    name: string;
}

class MultipleInterfaces implements IFirstInterface, ISecondInterface {
    id: number;
    name: string;
}

// The super keyword
// =================

class BaseClassWithConstructor {
    private id: number;
    constructor(_id: number) {
        this.id = _id;
    }
}

class DerivedClassWithConstructor extends BaseClassWithConstructor {
    private name: string;
    constructor(_id: number, _name: string) {
        super(_id);
        this.name = _name;
    }
}

// Function overloading
// ====================

class BaseClassWithFunction {
    public id: number;
    getProperties(): string {
        return `id: ${this.id}`;
    }
}

class DerivedClassWithFunction extends BaseClassWithFunction {
    public name: string;
    getProperties(): string {
        return `${super.getProperties()}, name: ${this.name}`;
    }
}

var derivedClassWithFunction = new DerivedClassWithFunction();
derivedClassWithFunction.id = 1;
derivedClassWithFunction.name = "derivedName";
console.log(`${derivedClassWithFunction.getProperties()}`);

// Protected class members
// =======================

class ClassUsingProtected {
    protected id: number;
    public getId() {
        return this.id;
    }
}

class DerivedFromProtected extends ClassUsingProtected {
    constructor() {
        super();
        this.id = 0;
    }
}

var derivedFromProtected = new DerivedFromProtected();
// id property of derivedFromProtected is protected; not accessible here
console.log(`getId() returns: ${derivedFromProtected.getId()}`);

// Abstract classes
// ================

class Employee {
    public id: number;
    public name: string;
    printDetails() {
        console.log(`id: ${this.id}, name: ${this.name}`);
    }
}

class Manager {
    public id: number;
    public name: string;
    public employees: Employee[];
    printDetails() {
        console.log(`id: ${this.id}, name: ${this.name}, 
            employeeCount: ${this.employees.length}`);
    }
}

abstract class AbstractEmployee {
    public id: number;
    public name: string;
    abstract getDetails(): string;
    public printDetails() {
        console.log(this.getDetails());
    }
}

class NewEmployee extends AbstractEmployee {
    getDetails(): string {
        return `id: ${this.id}, name: ${this.name}`;
    }
}

class NewManager extends NewEmployee {
    public employees: NewEmployee[];
    getDetails(): string {
        return super.getDetails() + `, employeeCount: ${this.employees.length}`;
    }
}