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
// Implementing interfaces
// =======================
//# sourceMappingURL=hello_ch03.js.map