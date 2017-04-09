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

