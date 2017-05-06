// The Model
// =========
var Model = (function () {
    function Model(model) {
        this.displayName = model.displayName;
        this.id = model.id;
    }
    return Model;
}());
var firstModel = new Model({ id: 1, displayName: 'firstModel' });
// The View
// ========
