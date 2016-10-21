var Dispatcher = require('../dispatcher/dispatcher.js');
var LocaleConstants = require('../constants/localeConstants.js');

var LocaleActions = {
  receiveAllLocaleItems: function (localeItems) {
    Dispatcher.dispatch({
      actionType: LocaleConstants.LOCALES_RECEIVED,
      localeItems: localeItems
    });
  }
};

module.exports = LocaleActions;
