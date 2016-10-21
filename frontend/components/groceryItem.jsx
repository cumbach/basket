var React = require('react');
// var ApiUtil = require('../util/apiUtil');
var GroceryActions = require('../actions/groceryItemActions');
var GroceryItemStore = require('../stores/groceryItemStore');

var GroceryItem = React.createClass({
  getInitialState: function() {
    return {purchased: false, assigned: "Me", comments: ""};
  },
  toggleCheck: function() {
    this.setState({purchased: !this.state.purchased});
    // this.props.changeAssign();
  },
  mapShares: function() {
    var map = this.props.sharedList.map(function(person){
      return <li key={person.shareName}><a onClick={this.selectName}>{person.shareName}</a></li>
    }.bind(this))
    map.push(<li key="separator" className="divider"></li>);
    map.push(<li key="edit"><a onClick={this.props.bringUpModal}>Edit Member List</a></li>);

    return map;
  },
  selectName: function(e) {
    this.setState({assigned: e.target.innerHTML})
  },
  render: function() {
    return (
      <div className='grocery-item'>
        <div className='grocery-item-row'>
          <div className="name">{this.props.name}</div>

          <div className="purchased" onClick={this.toggleCheck}><input type="checkbox" checked={this.state.purchased}></input></div>
          <div className="assigned btn-group">
            <button type="button" className="btn btn-default dropdown-toggle"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false">{this.state.assigned}
                                  <span className="caret"></span>

            </button>
            <ul className="dropdown-menu">
              {this.mapShares()}
            </ul>

          </div>
        </div>
        <div className="comments">{this.props.comments}</div>
      </div>
    );
  }
});

module.exports = GroceryItem;
