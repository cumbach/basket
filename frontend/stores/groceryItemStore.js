var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var GroceryItemConstants = require('../constants/groceryItemConstants.js');
var GroceryItemStore = new Store(Dispatcher);

var _groceryItems = [];

function addGroceryItem(groceryItem) {
  _groceryItems.push(groceryItem);
};
function removeGroceryItem(groceryItem) {
  _groceryItems = _groceryItems.filter(function(item){
    return item.name != groceryItem;
  });
};
GroceryItemStore.all = function(){
  return _groceryItems;
}

GroceryItemStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case GroceryItemConstants.ADD_GROCERY_ITEM:
      addGroceryItem(payload.groceryItem);
      GroceryItemStore.__emitChange();
      break;
    case GroceryItemConstants.REMOVE_GROCERY_ITEM:
      removeGroceryItem(payload.groceryItem);
      GroceryItemStore.__emitChange();
      break;
  }
};

module.exports = GroceryItemStore;
