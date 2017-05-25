import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Navigation from './Navigation';
import './../styles/home.css';

class UserDropdown extends Component {

  render() {
    return (
    	<div className="user-dropdown">
    	  <ul>
    	  	<li className="profile">My Profile</li>
    	  	<li onClick={() => {Accounts.logout()}}>Sign out</li>
    	  </ul>
    	</div>
    )
  }
}

export default UserDropdown;