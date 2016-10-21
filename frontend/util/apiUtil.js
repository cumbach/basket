var LocaleActions = require('../actions/localeActions');
var langArray = require('../constants/langArray');


module.exports = {
  fetchAllLocaleItems: function() {
    for (var i = 0; i < langArray.length; i++) {
      $.ajax({
        url: 'https://rawgit.com/unicode-cldr/cldr-misc-full/master/main/' + langArray[i] + '/delimiters.json',
        success: function (locales) {
          LocaleActions.receiveAllLocaleItems(locales)
        }
      });
    }
  }
};
