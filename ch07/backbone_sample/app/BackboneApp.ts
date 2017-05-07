interface IClickableItem {
	DisplayName: string;
	Id: number;
}

let ClickableItemCollection: IClickableItem[] = ([
	{ Id: 1, DisplayName: 'firstItem' },
	{ Id: 2, DisplayName: 'secondItem' },
	{ Id: 3, DisplayName: 'thirdItem' }
]);

// Backbone models
// ===============

// The first model is used for each item in the IClickableItem array.
class ItemModel extends Backbone.Model implements IClickableItem {
	get DisplayName(): string {
		return this.get('DisplayName');
	}
	set DisplayName(value: string) { this.set('DisplayName', value) }
	get Id(): number {
		return this.get('Id');
	}
	set Id(value: number) {
		this.set('Id', value);
	}
	constructor(input: IClickableItem) {
		super();
		// Loop through each property in the IClickableItem structure and set the
		// relevant internal property name of the Backbone model (this ItemModel).
		for (let key in input) {
			if (key) {
				this[key] = input[key];
			}
		}
	}
}

// ItemModel instance can be created from a JavaScript static object
let itemModelInstance = new ItemModel({ Id: 1, DisplayName: 'test' });

// The second model is used to hold the entire IClickableItem array.
class ItemCollection extends Backbone.Collection<ItemModel> {
	model = ItemModel;
}

let itemCollection = new ItemCollection(ClickableItemCollection);

// Backbone Views
// ==============

// Backbone ItemView
// -----------------
// The first view will be used to render each item in the IClickableItem array.
// This view will be nested in the second view, which will be used to render
// the entire collection.
class ItemView extends Backbone.View<ItemModel> {
	template: (json, options?) => string;
	constructor(options = <Backbone.ViewOptions<ItemModel>>{}) {
		options.tagName = 'li';           // outer HTML tag
    // Backbone events are used to tie DOM events back to functions in the view.
    // Register the onClicked() callback with the 'click' event.
		options.events = <any>{ 'click': 'onClicked' };

		super(options);
    // Set up the template to be used for this view. Query the HTML DOM tree for
    // and element with the id of itemViewTemplate
		this.template = _.template($('#itemViewTemplate').html());
	}
	render() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
	onClicked() {
		alert(`Item clicked: { Id: ${this.model.get('Id')},
			DisplayName: ${this.model.get('DisplayName')} }`);
	}
}

// Backbone CollectionView
// -----------------------
// The second view is for the overall collection itself. This view is created
// with two models. The first model is its own internal model, and is used to
// render properties to the screen. The second model is the collection to be
// used with each ItemView.
class ItemCollectionView extends Backbone.View<ItemModel> {
  template: (json, options?) => string;
	constructor(options?: any) {
    if (!options) options = {}
    super(options);
    this.template = _.template($(`#itemCollectionViewTemplate`).html());
  }
  render() {
    this.$el.html(this.template(this.model.toJSON()));
    this.collection.each((item) => {
      var itemView = new ItemView({ model: item });
      this.$el.find('#ulRegions').append(itemView.render().el);
    });
    return this;
  }
}

// Backbone application
// ====================

// Backbone controller
// -------------------
// Controller binds the models and the views together. Backbone does not have
// a dedicated controller class, so a standard TypeScript class is used to
// implement th econtroller.
class ScreenViewApp {
	constructor() {
		console.log(`ScreenViewApp.constructor()`);
	}
	start() {
		let collectionModel = new ItemModel(
			{ Id: 0, DisplayName: "Select an Option:"});
		let itemCollection =
			new ItemCollection(ClickableItemCollection);
		let itemCollectionView = new ItemCollectionView(
			{
				model: collectionModel,
				collection: itemCollection
			}
		);
		$('#pageLayoutRegion').html(itemCollectionView.render().el);
	}
}
