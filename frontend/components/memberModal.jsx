var React = require('react');
// var ApiUtil = require('../util/apiUtil');
var GroceryActions = require('../actions/groceryItemActions');
var GroceryItemStore = require('../stores/groceryItemStore');

var MemberModal = React.createClass({
  getInitialState: function() {
    return {sharedList: this.props.sharedList, assigned: "Me", comments: ""};
  },
  toggleCheck: function() {
    // this.setState({purchased: !this.state.purchased});
    // this.props.changeAssign();
  },
  mapShares: function() {
    // var map = this.props.sharedList.map(function(person){
    //   return <li key={person.shareName}><a onClick={this.selectName}>{person.shareName}</a></li>
    // }.bind(this))
    // map.push(<li key="separator" className="divider"></li>);
    // map.push(<li key="edit"><a onClick={this.props.bringUpModal}>Edit Member List</a></li>);
    //
    // return map;
  },
  selectName: function(e) {
    // this.setState({assigned: e.target.innerHTML})
  },
  memberMap: function() {
    var map = [];
    if (typeof this.state.sharedList !== 'undefined') {
      map = this.state.sharedList.map(function(person){
        if (typeof person !== 'undefined') {
          return (<div className="member-list-row"
                    key={person.shareName}>
                    <div className="member-list-name">{person.shareName}</div>
                    <div className="member-list-email">{person.email}</div>
                    <div className="email-list" onClick={this.sendEmail}>Send Email</div>
                  </div>);
        }
      }.bind(this));
    }
    return map;
  },
  sendEmail: function(e) {
    console.log(e.currentTarget.parentNode)
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
