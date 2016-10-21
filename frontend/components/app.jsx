var React = require('react');
var LocaleStore = require('../stores/localeStore');
var ApiUtil = require('../util/apiUtil');
var LocaleActions = require('../actions/localeActions');
var LocaleIndexItem = require('./localeIndexItem');


var App = React.createClass({
  getInitialState: function() {
    return {localeItems: [], selectedDelimiters: {}, selectors: 1};
  },

  _onChange: function() {
    this.setState({localeItems: LocaleStore.all()});
  },

  componentDidMount: function() {
    ApiUtil.fetchAllLocaleItems();
    this.localeListener = LocaleStore.addListener(this._onChange);
  },
  componentWillUnmount: function(){
    this.localeListener.remove();
  },
  localeMap: function(){
    var map = [];
    var selectedDelimiters = this.state.selectedDelimiters;
    if (typeof this.state.localeItems !== 'undefined') {
      map = this.state.localeItems.map(function(locale){
        if (typeof locale !== 'undefined') {
          return <LocaleIndexItem
                  key={locale.identity.language}
                  selectedDelimiters={selectedDelimiters}
                  delimiters={locale.delimiters}
                  language={locale.identity.language}/>;
        }
      });
    }
    return map;
  },
  click: function(e) {
    var id = e.target.id;
    var dropdown = document.getElementById(id);
    var dropdownIndex = dropdown.id[dropdown.id.length - 1];
    var index = dropdown.selectedIndex;
    var newSelected = this.state.selectedDelimiters
    newSelected[dropdownIndex] = (dropdown.value);
    this.setState({selectedDelimiters: newSelected});
  },
  selectTags: function() {
    var result = [];
    for (var i = 1; i <= this.state.selectors; i++) {
      var idName = 'selectorNum' + i;
      result.push(
        <select className='agent' id={idName} onChange={this.click}>
          <option value="null">Select Property</option>
          <option value="quotationStart">quotationStart</option>
          <option value="quotationEnd">quotationEnd</option>
          <option value="alternateQuotationStart">alternateQuotationStart</option>
          <option value="alternateQuotationEnd">alternateQuotationEnd</option>
        </select>
      )
    }
    return result;
  },
  addSelector: function() {
    var selectorNum = this.state.selectors + 1
    this.setState({selectors: selectorNum});
  },
  minusSelector: function() {
    var selectorNum = this.state.selectors - 1;
    var newSelected = this.state.selectedDelimiters;
    delete newSelected[this.state.selectors];
    this.setState({selectors: selectorNum});
    this.setState({selectedDelimiters: newSelected});
  },
  render: function() {
    return (
      <div id="wrapper">
        <h1>Locale Properties:</h1>
        <div className='row-headers'>
          <h4>Locales</h4>
          <div className='selector'>
            {this.selectTags()}
          </div>
          <div onClick={this.minusSelector} className='minus-selector'>-</div>
          <div onClick={this.addSelector} className='add-selector'>+</div>
        </div>
        <div className='list'>{this.localeMap()}</div>
      </div>
    );
  }
});

module.exports = App;
