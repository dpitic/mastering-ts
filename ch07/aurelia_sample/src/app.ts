// Aurelia models
// ==============
// Aurelia is based on the ECMAScript 2016 standards, which means that a 
// standard class can be used as a model.
//
// This file lives in the src directory in the Aurelia application.

export class App {
  message: string = 'Select an Option';
  items: ClicableItem[] = [
  	{ id: 1, displayName: "firstItem" },
  	{ id: 2, displayName: "secondItem" },
  	{ id: 3, displayName: "thirdItem" }
  ];
  onItemClicked(event: ClicableItem) {
  	alert(`App.onItemClicked , event.id ${event.id} - ${event.displayName}`);
  }
}

export class ClicableItem {
	displayName: string;
	id: number;
}
