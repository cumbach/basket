var React = require('react');
var ApiUtil = require('../util/apiUtil');
var LocaleActions = require('../actions/localeActions');
var LocaleStore = require('../stores/localeStore');

var LocaleIndexItem = React.createClass({
  delimiters: function() {
      var result = [];
      for (var val in this.props.selectedDelimiters) {
        result.push(<div className="delimiter">{this.props.delimiters[this.props.selectedDelimiters[val]]}</div>);
      }
      return result;
  },
  render: function() {
    return (
      <div className='row'>
        <div className="language">{this.props.language}</div>
        {this.delimiters()}
      </div>
    );
  }
});

module.exports = LocaleIndexItem;
