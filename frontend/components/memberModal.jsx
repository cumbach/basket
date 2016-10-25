var React = require('react');
var GroceryActions = require('../actions/groceryItemActions');
var GroceryItemStore = require('../stores/groceryItemStore');

var MemberModal = React.createClass({
  getInitialState: function() {
    return {sharedList: this.props.sharedList, assigned: "Me", comments: ""};
  },
  memberMap: function() {
    var map = [];
    if (typeof this.state.sharedList !== 'undefined') {
      map = this.state.sharedList.map(function(person){
        if (typeof person !== 'undefined') {
          return (<div className="member-list-row"
                    key={person.shareName}>
                    <div className="member-list-name">{person.shareName}</div>
                    <a className="member-list-email" onClick={this.sendEmail}>{person.email}</a>
                  </div>);
        }
      }.bind(this));
    }
    return map;
  },
  sendEmail: function(e) {
    var emailBody = "Grocery List:\n";
    this.props.groceryItems.forEach(function(item){
      emailBody += item.name;
      emailBody += "\n";
    })

    var parent = e.currentTarget.parentNode;
    var email = parent.getElementsByClassName('member-list-email')[0].innerHTML;
    var subject = this.props.listName;

    var ebody = encodeURIComponent(emailBody);
    document.location = "mailto:"+email+"?subject="+subject+"&body="+ebody;
  },
  hideModal: function() {
    $('.member-modal').css('display', 'none');
    $('.cover').remove();

  },
  render: function() {
    return (
      <div className='member-modal'>
        <div className="edit-list-modal">
          <div className="member-div"><h3>Member List</h3>{this.memberMap()}</div>
          <div className="add-member-row">
            <input className="add-name" type="text-area" placeholder="Name"></input>
            <input className="add-email" type="text-area" placeholder="Email"></input>
            <div className="add-member-button" onClick={this.props.addMember}>Add Member</div>

          </div>
          <div className="modal-done" onClick={this.hideModal}>Done</div>
        </div>
      </div>
    );
  }
});

module.exports = MemberModal;
