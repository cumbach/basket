var React = require('react');
// var ApiUtil = require('../util/apiUtil');
var GroceryActions = require('../actions/groceryItemActions');
var GroceryItemStore = require('../stores/groceryItemStore');

var GroceryItem = React.createClass({
  getInitialState: function() {
    return {purchased: false, assigned: "Me", comments: "", quantity: 1, showComments: false, editComment: true};
  },
  toggleCheck: function(e) {
    this.setState({purchased: !this.state.purchased});
    if (!this.state.purchased) {
    }
  },
  componentDidMount: function(){
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
  commentClicked: function(e) {
    this.setState({showComments: !this.state.showComments});
  },
  increaseQuantity: function() {
    this.setState({quantity: this.state.quantity + 1})
  },
  decreaseQuantity: function() {
    if (this.state.quantity > 0) {
      this.setState({quantity: this.state.quantity - 1})
    }
  },
  editComment: function(e) {
    if (this.state.editComment) {
      var newComment = e.currentTarget.parentNode.getElementsByTagName('input')[0].value;
      e.currentTarget.parentNode.getElementsByTagName('input')[0].style.display = "none";
    } else {
      e.currentTarget.parentNode.getElementsByTagName('input')[0].style.display = "block";
    }
    this.setState({editComment: !this.state.editComment})
    this.setState({comments: newComment});
  },
  render: function() {
    var commentsStyle;
    var imgSrc;
    if (this.state.showComments) {
      commentsStyle = {'display': 'block'}
      imgSrc = "assets/downcaret.png"
    } else {
      commentsStyle = {'display': 'none'}
      imgSrc = "assets/caretleft.png"

    }
    return (
      <div className='grocery-item'>
        <div className='grocery-item-row'>
          <div className="name-col">
            <div className="quantity">
              <div className="minus" onClick={this.decreaseQuantity}>-</div>
              <div className="quantity-num">{this.state.quantity}</div>
              <div className="plus" onClick={this.increaseQuantity}>+</div>
            </div>
            <div className="name">{this.props.name}</div>
            <img src={imgSrc} onClick={this.commentClicked}/>
          </div>
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
          <div className="purchased" onClick={this.toggleCheck}><input type="checkbox" checked={this.state.purchased}></input>Mark Purchased</div>
        </div>
        <div className="edit-comments" style={commentsStyle}>
          <h4>Comments:</h4>
          <div className="comments">{this.state.comments}</div>
          <input type="text-area"></input>
          <img src="assets/icon_edit_active.png" onClick={this.editComment}/>
        </div>
      </div>
    );
  }
});

module.exports = GroceryItem;
