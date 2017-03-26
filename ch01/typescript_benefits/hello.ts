var test: string = "this is a string";

declare function describe(
  description: string,
  specDefinitions: () => void
) : void;

class MyClass {
  add(x, y) {
    return x + y;
  }
}

var classInstance = new MyClass();
var result = classInstance.add(1, 2);
console.log(`add(1,2) returns ${result}`);

class CountClass {
  private _count: number;
  constructor() {
    this._count = 0;
  }
  countUp() {
    this._count++;
  }
  getCount() {
    return this._count;
  }
}

var countInstance = new CountClass();
