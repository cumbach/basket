var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var GroceryItemConstants = require('../constants/groceryItemConstants.js');
var GroceryItemStore = new Store(Dispatcher);

var _groceryItems = [];

// var setLocaleItems = function (localeItems) {
//   for (var main in localeItems) {
//     for (var lang in localeItems[main]) {
//       _localeItems[lang] = localeItems[main][lang];
//     }
//   }
// };
function addGroceryItem(groceryItem) {
  // console.log(groceryItem);
  _groceryItems.push(groceryItem);
};
GroceryItemStore.all = function () {
  // var groceryItems = [];
  // for (var id in _localeItems) {
  //   localeItems.push(_localeItems[id]);
  // }
  return _groceryItems;
};
GroceryItemStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case GroceryItemConstants.ADD_GROCERY_ITEM:
      addGroceryItem(payload.groceryItem);
      GroceryItemStore.__emitChange();
      break;
  }
};

module.exports = GroceryItemStore;
