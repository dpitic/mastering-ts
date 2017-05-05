// Function overrides
// ==================
// If the Typescript function can be called with different types, you need to
// declare a function override for each variant of the function.
trace("trace a string");
trace(true);
trace(1);
trace({ id: 1, name: "test" });
// Nested namespaces
// =================
// Module definitions can contain nested module definition, which then translate
// to nested namespaces.
FirstNamespace.SecondNamespace.ThirdNamespace.log("test");
// Classes
// =======
var myClass = new MyClass();
// Class namespaces
// ================
var myNestedClass = new OuterName.InnerName.NestedClass();
// Class constructor overloads
// ===========================
// Class definitions can contain constructor overloads. Each variant must be
// listed in the declaration file as constructor overloads.
var myClassConstr = new MyClassConstructor();
var myClassConstr2 = new MyClassConstructor(1, "test");
// Class properties
// ================
// Classes can contain properties. Each property will have to be listed with the
// class in the class declaration.
var classWithProperty = new ClassWithProperty();
classWithProperty.id = 1;
// Class functions
// ===============
// Functions of properties that are considered as private do not need to be
// exposed via the declaration file; they can be omitted.
var classWithFunction = new ClassWithFunction();
classWithFunction.functionToRun();
// Static properties and functions
// ===============================
StaticClass.staticId = 1;
StaticClass.staticFunction();
// Golobal functions
// =================
globalLogError("test");
// Function signatures
// ===================
describe("test", function () {
});
// Optional properties
// ===================
var classWithOpt = new ClassWithOptionals();
var classWithOpt1 = new ClassWithOptionals({ id: 1 });
var classWithOpt2 = new ClassWithOptionals({ name: "test" });
var classWithOpt3 = new ClassWithOptionals({ id: 1, name: 'test' });
// Merging functions and modules
// =============================
// A function definition with a specific name can be merged with a module
// definition of the same name.
fnWithProperty(1);
fnwithProperty.name = "name";
