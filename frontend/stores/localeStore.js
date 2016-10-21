var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher.js');
var LocaleConstants = require('../constants/localeConstants.js');
var LocaleStore = new Store(Dispatcher);

var _localeItems = {};

var setLocaleItems = function (localeItems) {
  for (var main in localeItems) {
    for (var lang in localeItems[main]) {
      _localeItems[lang] = localeItems[main][lang];
    }
  }
};
LocaleStore.all = function () {
  var localeItems = [];
  for (var id in _localeItems) {
    localeItems.push(_localeItems[id]);
  }
  return localeItems;
};
LocaleStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case LocaleConstants.LOCALES_RECEIVED:
      setLocaleItems(payload.localeItems);
      LocaleStore.__emitChange();
      break;
  }
};

module.exports = LocaleStore;
