var React = require('react');
// var ApiUtil = require('../util/apiUtil');
var GroceryActions = require('../actions/groceryItemActions');
var GroceryItemStore = require('../stores/groceryItemStore');

var editicon = require("../assets/editicon.png");
var downcaret = require("../assets/downcaret.png");
var caretleft= require("../assets/caretleft.png");
var removebutton= require("../assets/removebutton.png");
var icon_edit_active = require("../assets/icon_edit_active.png");


var GroceryItem = React.createClass({
  getInitialState: function() {
    return {purchased: false, assigned: "Me", comments: "", quantity: 1, showComments: false, editComment: true, name: this.props.name};
  },
  toggleCheck: function(e) {
    this.setState({purchased: !this.state.purchased});
    if (this.state.purchased) {
      e.currentTarget.parentNode.parentNode.style.background = "lightgrey";
    } else {
      e.currentTarget.parentNode.parentNode.style.background = "#95d495";
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
      e.currentTarget.parentNode.getElementsByTagName('input')[0].style.display = "inline-block";
    }
    this.setState({editComment: !this.state.editComment})
    this.setState({comments: newComment});
  },
  removeGroceryItem: function(e){
    var item = e.currentTarget.parentNode.getElementsByClassName('name')[0].innerHTML;
    GroceryActions.removeGroceryItem(item);
  },
  editItemName: function(e){
    var parent = e.currentTarget.parentNode;

    if (!this.editingName) {
      var newInput = document.createElement('input');
      newInput.value = this.props.name;
      parent.replaceChild(newInput, e.currentTarget.parentNode.getElementsByClassName('name')[0]);
      this.editingName = true;
    } else {
      this.setState({name: "hi"});
      var newInput = document.createElement('div');
      var inputVal = parent.getElementsByTagName('input')[0];
      newInput.innerHTML = inputVal.value;
      newInput.className = 'name';
      parent.replaceChild(newInput, inputVal);
      this.editingName = false;
      this.setState({name: inputVal.value})
    }


  },
  render: function() {
    var commentsStyle;
    var imgSrc1 = editicon;
    var imgSrc2;
    if (this.state.showComments) {
      commentsStyle = {'display': 'inline-block'}
      imgSrc2 = downcaret;
    } else {
      commentsStyle = {'display': 'none'}
      imgSrc2 = caretleft;
    }
    return (
      <div className='grocery-item'>
        <div className='grocery-item-row'>
          <img className="remove-button" src={removebutton} onClick={this.removeGroceryItem}/>
          <div className="name-col">
            <div className="quantity">
              <div className="minus" onClick={this.decreaseQuantity}>-</div>
              <div className="quantity-num">{this.state.quantity}</div>
              <div className="plus" onClick={this.increaseQuantity}>+</div>
            </div>
            <div className="name">{this.state.name}</div>
            <img className="edit-grocery-name" src={imgSrc1} style={commentsStyle} onClick={this.editItemName}/>
            <img src={imgSrc2} onClick={this.commentClicked}/>
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
          <div className="purchased" onClick={this.toggleCheck}>
            <input type="checkbox" checked={this.state.purchased}></input>
            <div>Mark Purchased</div>
          </div>
        </div>
        <div className="edit-comments" style={commentsStyle}>
          <div className="comments">{this.state.comments}</div>
          <input type="text-area" placeholder="Add Comment"></input>
          <img src={icon_edit_active} onClick={this.editComment}/>
        </div>
      </div>
    );
  }
});

module.exports = GroceryItem;
