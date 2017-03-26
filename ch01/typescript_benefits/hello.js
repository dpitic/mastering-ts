var test = "this is a string";
var MyClass = (function () {
    function MyClass() {
    }
    MyClass.prototype.add = function (x, y) {
        return x + y;
    };
    return MyClass;
}());
var classInstance = new MyClass();
var result = classInstance.add(1, 2);
console.log("add(1,2) returns " + result);
var CountClass = (function () {
    function CountClass() {
        this._count = 0;
    }
    CountClass.prototype.countUp = function () {
        this._count++;
    };
    CountClass.prototype.getCount = function () {
        return this._count;
    };
    return CountClass;
}());
var countInstance = new CountClass();
