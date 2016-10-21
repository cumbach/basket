var Dispatcher = require('../dispatcher/dispatcher.js');
var GroceryConstants = require('../constants/groceryItemConstants.js');

var groceryItemActions = {
  addItem: function(groceryItem) {
    Dispatcher.dispatch({
      actionType: GroceryConstants.ADD_GROCERY_ITEM,
      groceryItem: groceryItem
    });
  },
  receiveAllLocaleItems: function (localeItems) {
    Dispatcher.dispatch({
      actionType: LocaleConstants.LOCALES_RECEIVED,
      localeItems: localeItems
    });
  }
};

module.exports = groceryItemActions;
