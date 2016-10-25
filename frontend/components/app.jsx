var React = require('react');
var GroceryItemStore = require('../stores/groceryItemStore');
var groceryItemActions = require('../actions/groceryItemActions');
var GroceryItem = require('./groceryItem');
var MemberModal = require('./memberModal');


var App = React.createClass({
  getInitialState: function() {
    return {listName: "New List", groceryItems: [], sharedList: [{shareName:"Me", email:"myemail@email.com"}, {shareName:"John", email:"johnsemail@email.com"}]};
  },

  _onChange: function() {
    this.setState({groceryItems: GroceryItemStore.all()});
  },

  componentDidMount: function() {
    document.onkeypress = this.enterClicked;
    this.groceryItemListener = GroceryItemStore.addListener(this._onChange);
  },
  groceryItemsMap: function(){
    // console.log(this.state.groceryItems)
    var map = [];
    if (typeof this.state.groceryItems !== 'undefined') {
      map = this.state.groceryItems.map(function(item){
        if (typeof item !== 'undefined') {
          return <GroceryItem
                  key={item.name}
                  name={item.name}
                  sharedList={this.state.sharedList}
                  bringUpModal={this.showModal}
                  removeItem={this.removeItem}/>;
        }
      }.bind(this));
    }
    return map;
  },
  addMember: function() {
    var list = this.state.sharedList;
    var name = $('.add-name').val();
    var email = $('.add-email').val();
    list.push({shareName: name, email: email});
    this.setState({sharedList: list});
    $('.add-name').val("");
    $('.add-email').val("");
  },
  removeModal: function() {
    this.updateName();
    $('.cover').remove();
    $('.edit-list-modal').remove();
  },
  updateName: function(e) {
    var inputVal = $('#name-input').val()
    if (typeof e === 'undefined' || e.key === "Enter") {
      if (inputVal.length != 0) {
        this.setState({listName:$('#name-input').val()})
      }
      $('#name-input').remove();
      $('.list-name').css('display', 'inline-block');

      document.onkeypress = this.enterClicked;
      this.nameOpen = false;
    }
  },
  enterClicked: function(e){
    if (typeof e === 'undefined' || e.key === "Enter") {
      this.addItem();
    }
  },

  changeName: function() {
    var name = this.state.listName;
    if (!this.nameOpen) {
      $('.list-name-edit').before('<input id="name-input" type="text" placeholder="' + name + '">')
      $('.list-name').css('display', 'none');
      document.onkeypress = this.updateName;
      this.nameOpen = true;
    } else {
      this.updateName()
    }
  },
  addItem: function() {
    var itemInput = $('#item-input').val();
    if (itemInput.length != 0) {
      groceryItemActions.addItem(
        {name: $('#item-input').val()}
      )
      $('#item-input').val("");
    }
  },
  showModal: function() {
    $('#root').before('<div class="cover"></div>')
    $('.member-modal').css('display', 'block');
  },
  render: function() {
    return (
      <div id="wrapper">
        <div className="nav-bar-row">
          <h1>BASKET</h1>
          <div className="share-button" onClick={this.showModal}>Share List</div>
        </div>
        <div className="row-headers">
          <div className="list-name-section">
            <h2 className="list-name">{this.state.listName}</h2>
            <img onClick={this.changeName} className="list-name-edit" src="assets/icon_edit_active.png" alt="" />
          </div>
        </div>

        <div className="new-item-line">
          <div className='item-input-col'>
            <input id="item-input" type="text-area" placeholder="Enter Grocery Item"></input>
            <div className="add-item-button btn btn-success" onClick={this.addItem}>Add New Item</div>
          </div>
          <h3 className="item-assignment">Assignment</h3>
        </div>

        <div className="list">{this.groceryItemsMap()}</div>
        <MemberModal sharedList={this.state.sharedList} addMember={this.addMember} listName={this.state.listName} groceryItems={this.state.groceryItems}/>
      </div>
    );
  }
});

module.exports = App;
