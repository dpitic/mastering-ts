var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ClickableItemCollection = ([
    { Id: 1, DisplayName: 'firstItem' },
    { Id: 2, DisplayName: 'secondItem' },
    { Id: 3, DisplayName: 'thirdItem' }
]);
// Backbone models
// ===============
// The first model is used for each item in the IClickableItem array.
var ItemModel = (function (_super) {
    __extends(ItemModel, _super);
    function ItemModel(input) {
        var _this = _super.call(this) || this;
        // Loop through each property in the IClickableItem structure and set the
        // relevant internal property name of the Backbone model (this ItemModel).
        for (var key in input) {
            if (key) {
                _this[key] = input[key];
            }
        }
        return _this;
    }
    Object.defineProperty(ItemModel.prototype, "DisplayName", {
        get: function () {
            return this.get('DisplayName');
        },
        set: function (value) { this.set('DisplayName', value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemModel.prototype, "Id", {
        get: function () {
            return this.get('Id');
        },
        set: function (value) {
            this.set('Id', value);
        },
        enumerable: true,
        configurable: true
    });
    return ItemModel;
}(Backbone.Model));
// ItemModel instance can be created from a JavaScript static object
var itemModelInstance = new ItemModel({ Id: 1, DisplayName: 'test' });
// The second model is used to hold the entire IClickableItem array.
var ItemCollection = (function (_super) {
    __extends(ItemCollection, _super);
    function ItemCollection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = ItemModel;
        return _this;
    }
    return ItemCollection;
}(Backbone.Collection));
var itemCollection = new ItemCollection(ClickableItemCollection);
// Backbone Views
// ==============
// Backbone ItemView
// -----------------
// The first view will be used to render each item in the IClickableItem array.
// This view will be nested in the second view, which will be used to render
// the entire collection.
var ItemView = (function (_super) {
    __extends(ItemView, _super);
    function ItemView(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        options.tagName = 'li'; // outer HTML tag
        // Backbone events are used to tie DOM events back to functions in the view.
        // Register the onClicked() callback with the 'click' event.
        options.events = { 'click': 'onClicked' };
        _this = _super.call(this, options) || this;
        // Set up the template to be used for this view. Query the HTML DOM tree for
        // and element with the id of itemViewTemplate
        _this.template = _.template($('#itemViewTemplate').html());
        return _this;
    }
    ItemView.prototype.render = function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    };
    ItemView.prototype.onClicked = function () {
        alert("Item clicked: { Id: " + this.model.get('Id') + ",\n\t\t\tDisplayName: " + this.model.get('DisplayName') + " }");
    };
    return ItemView;
}(Backbone.View));
// Backbone CollectionView
// -----------------------
// The second view is for the overall collection itself. This view is created
// with two models. The first model is its own internal model, and is used to
// render properties to the screen. The second model is the collection to be
// used with each ItemView.
var ItemCollectionView = (function (_super) {
    __extends(ItemCollectionView, _super);
    function ItemCollectionView(options) {
        var _this = this;
        if (!options)
            options = {};
        _this = _super.call(this, options) || this;
        _this.template = _.template($("#itemCollectionViewTemplate").html());
        return _this;
    }
    ItemCollectionView.prototype.render = function () {
        var _this = this;
        this.$el.html(this.template(this.model.toJSON()));
        this.collection.each(function (item) {
            var itemView = new ItemView({ model: item });
            _this.$el.find('#ulRegions').append(itemView.render().el);
        });
        return this;
    };
    return ItemCollectionView;
}(Backbone.View));
// Backbone application
// ====================
// Backbone controller
// -------------------
// Controller binds the models and the views together. Backbone does not have
// a dedicated controller class, so a standard TypeScript class is used to
// implement th econtroller.
var ScreenViewApp = (function () {
    function ScreenViewApp() {
        console.log("ScreenViewApp.constructor()");
    }
    ScreenViewApp.prototype.start = function () {
        var collectionModel = new ItemModel({ Id: 0, DisplayName: "Select an Option:" });
        var itemCollection = new ItemCollection(ClickableItemCollection);
        var itemCollectionView = new ItemCollectionView({
            model: collectionModel,
            collection: itemCollection
        });
        $('#pageLayoutRegion').html(itemCollectionView.render().el);
    };
    return ScreenViewApp;
}());
