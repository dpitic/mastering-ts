// The Model
// =========

interface IModel {
	displayName: string;
	id: number;
}

class Model implements IModel {
	displayName: string;
	id: number;
	constructor(model: IModel) {
		this.displayName = model.displayName;
		this.id = model.id;
	}
}

let firstModel = new Model({ id: 1, displayName: 'firstModel' });

// The View
// ========

// The view in MVC represents the visual representation of a Model. In web
// frameworks, this would typically be a snippet of HTML. In this example the
// view is implemented in index.html.

class View {
	template: string;
	constructor(_template: string) {
		this.template = _template;
	}
	render(model: Model) {
		// combine template and view and return the resulting HTML
	}
}

// The Controller
// ==============

// The controller in an MVC framework does the job of coordinating the 
// interaction between the Model and the View.

class Controller {
	model: Model;
	view: View;
	constructor() {
		this.model = new Model({id: 1, displayName: 'firstModel'});
	}
	render() {
		$('#domElement').html(this.view.render(this.model));
	}
}
