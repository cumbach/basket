var Dispatcher = require('../dispatcher/dispatcher.js');
var GroceryConstants = require('../constants/groceryItemConstants.js');

var groceryItemActions = {
  addItem: function(groceryItem) {
    Dispatcher.dispatch({
      actionType: GroceryConstants.ADD_GROCERY_ITEM,
      groceryItem: groceryItem
    });
  },
  removeGroceryItem: function(groceryItem) {
    Dispatcher.dispatch({
      actionType: GroceryConstants.REMOVE_GROCERY_ITEM,
      groceryItem: groceryItem
    });
  }
};

module.exports = groceryItemActions;
