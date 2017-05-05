// Function overrides
// ==================

declare function trace(arg: string | number | boolean);
declare function trace(arg: { id: number; name: string });

// Nested namespaces
// =================

declare module FirstNamespace {
  module SecondNamespace {
    module ThirdNamespace {
      function log(msg: string);
    }
  }
}

// Classes
// =======

declare class MyClass { }

// Class namespaces
// ================

declare module OuterName {
  module InnerName {
    class NestedClass {}
  }
}

// Class constructor overloads
// ===========================

declare class MyClassConstructor {
	constructor(id: number, name: string);
	constructor();
}

// Class properties
// ================

declare class ClassWithProperty {
	id: number;
}

// Class functions
// ===============

declare class ClassWithFunction {
	functionToRun(): void;
}

// Static properties and functions
// ===============================

declare class StaticClass {
	static staticId: number;
	static staticFunction(): void;
}

// Global functions
// ================

declare function globalLogError(msg: string);

// Function signatures
// ===================

declare function describe(name: string, functionDef: () => void);

// Optional properties
// ===================

interface IOptionalProperties {
  id?: number;
  name?: string;
}

declare class ClassWithOptionals {
  constructor(options?: IOptionalProperties);
}

// Merging functions and modules
// =============================

declare function fnWithProperty(id: number);
declare module fnwithProperty { 
  var name: string;
}