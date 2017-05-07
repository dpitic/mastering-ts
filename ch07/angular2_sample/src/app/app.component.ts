import { Component } from '@angular/core';

// Angular 2 models
// ================
// Angular 2 models are simple classes.
// This file belongs in the src/app directory in the Angular app

export class ClickableItem {
  displayName: string;
  id: number;
}

let ClickableItemArray: ClickableItem[] = [
  { id: 1, displayName: "firstName" },
  { id: 2, displayName: "secondName" },
  { id: 3, displayName: "thirdItem" }
];

@Component({
  // HTML DOM element reference where the View will render into
  selector: 'app-root',
  // Specifies the template HTML file for this compoinent
  templateUrl: './app.component.html',
  // Include CSS files used by the component
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  items = ClickableItemArray;
  // Click event handler
  onSelect(selectedItem: ClickableItem) {
    alert(`onSelect: id=${selectedItem.id}
    displayName=${selectedItem.displayName}`);
  }
}
