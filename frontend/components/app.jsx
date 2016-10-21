var React = require('react');
var GroceryItemStore = require('../stores/groceryItemStore');
// var ApiUtil = require('../util/apiUtil');
var groceryItemActions = require('../actions/groceryItemActions');
var GroceryItem = require('./groceryItem');


var App = React.createClass({
  getInitialState: function() {
    return {listName: "New List", groceryItems: [], sharedList: [{shareName:"Me", email:"myemail@email.com"}, {shareName:"John", email:"johnsemail@email.com"}]};
  },

  _onChange: function() {
    this.setState({groceryItems: GroceryItemStore.all()});
  },

  componentDidMount: function() {
    // ApiUtil.fetchAllLocaleItems();
    this.groceryItemListener = GroceryItemStore.addListener(this._onChange);
    // this.nameOpen = false;
  },
  // componentWillUnmount: function(){
  //   this.localeListener.remove();
  // },
  groceryItemsMap: function(){
    var map = [];
    if (typeof this.state.groceryItems !== 'undefined') {
      map = this.state.groceryItems.map(function(item){
        if (typeof item !== 'undefined') {
          return <GroceryItem
                  key={item.name}
                  name={item.name}
                  // comments={item.comments}
                  // assigned={item.assigned}
                  sharedList={this.state.sharedList}
                  bringUpModal={this.bringUpModal}/>;
        }
      }.bind(this));
    }
    return map;
  },
  bringUpModal: function() {
    $('body').append('<div class="cover"></div>')
    var listName = this.state.listName
    $('body').append('<div class="edit-list-modal">' +
                        '<div class="input-group input-group-lg">' +
                          '<span class="input-group-addon" id="sizing-addon1">List Name</span>' +
                          '<input id="name-input" type="text" class="form-control" placeholder="' + listName + '" aria-describedby="sizing-addon1">' +
                        '</div>' +
                        '<div class="member-div"><h3>Member List</h3>' + this.memberMap() + '</div>' +
                        '<div class="modal-done btn btn-success">Done</div>' +
                      '</div>')
    $('.add-item-button').click(this.addMember);
    $('.modal-done').click(this.removeModal);

  },
  memberMap: function() {
    var result = "";
    if (typeof this.state.sharedList !== 'undefined') {
      this.state.sharedList.forEach(function(person){
        result += '<div class="member-info"><li class="member-name">' + person.shareName + '</li><li class="member-email">' + person.email + '</li></div>';
      })
    }
    result += '<div class="new-member-input input-group input-group-sm">' +
                  '<input id="new-member-name" type="text" class="form-control" placeholder="Name" aria-describedby="sizing-addon3">' +
                  '<input id="new-member-email" type="text" class="form-control" placeholder="Email" aria-describedby="sizing-addon3">' +
                  '<div class="add-item-button btn btn-success">Add Member</div>' +
                '</div>';

    return result;
  },
  addMember: function() {
    var list = this.state.sharedList;
    var name = $('#new-member-name').val();
    var email = $('#new-member-email').val();
    list.push({shareName: name, email: email});
    this.setState({sharedList: list});
    $('.member-info').last().after('<div class="member-info"><li class="member-name">' + name + '</li><li class="member-email">' + email + '</li></div>');
    $('#new-member-name').val("");
    $('#new-member-email').val("");
  },
  removeModal: function() {
    this.updateName();
    $('.cover').remove();
    $('.edit-list-modal').remove();
  },
  // click: function(e) {
  //   var id = e.target.id;
  //   var dropdown = document.getElementById(id);
  //   var dropdownIndex = dropdown.id[dropdown.id.length - 1];
  //   var index = dropdown.selectedIndex;
  //   var newSelected = this.state.selectedDelimiters
  //   newSelected[dropdownIndex] = (dropdown.value);
  //   this.setState({selectedDelimiters: newSelected});
  // },
  // selectTags: function() {
  //   var result = [];
  //   for (var i = 1; i <= this.state.selectors; i++) {
  //     var idName = 'selectorNum' + i;
  //     result.push(
  //       <select className='agent' id={idName} onChange={this.click}>
  //         <option value="null">Select Property</option>
  //         <option value="quotationStart">quotationStart</option>
  //         <option value="quotationEnd">quotationEnd</option>
  //         <option value="alternateQuotationStart">alternateQuotationStart</option>
  //         <option value="alternateQuotationEnd">alternateQuotationEnd</option>
  //       </select>
  //     )
  //   }
  //   return result;
  // },
  // addSelector: function() {
  //   var selectorNum = this.state.selectors + 1
  //   this.setState({selectors: selectorNum});
  // },
  // minusSelector: function() {
  //   var selectorNum = this.state.selectors - 1;
  //   var newSelected = this.state.selectedDelimiters;
  //   delete newSelected[this.state.selectors];
  //   this.setState({selectors: selectorNum});
  //   this.setState({selectedDelimiters: newSelected});
  // },
  updateName: function(e) {
    var inputVal = $('#name-input').val()
    if (typeof e === 'undefined' || e.key === "Enter") {
      if (inputVal.length != 0) {
        this.setState({listName:$('#name-input').val()})
      }
      // $('#name-input').remove();
      $('.list-name').css('display', 'inline-block');

      document.onkeypress = null;
      this.nameOpen = false;
    }
  },

  changeName: function() {
    var name = this.state.listName;
    if (!this.nameOpen) {
      this.bringUpModal()
      // $('.list-name').css('display', 'none');
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
  render: function() {
    return (
      <div id="wrapper">

        <h1>BASKET</h1>
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

      </div>
    );
  }
});

module.exports = App;
