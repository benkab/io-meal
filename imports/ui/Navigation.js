import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import './../styles/navigation.css';
import Icon from 'react-ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleDropdownState } from './../store/actions/dropdownActions';
import { Link, browserHistory } from 'react-router';

class Navigation extends TrackerReact(Component) {

  handleDropdown(event){
    event.preventDefault();
    this.props.toggleDropdownState(this.props.dropdownIsOpen)
  }

  render() {
    return (
      <div className="row navigation">
        <img src="io-logo.svg" onClick={() => {browserHistory.push('/')}} className="logo"/>
        <ul className="pull-right">
          <li>
             <img src="avatar.svg" className="avatar"/>
          </li>
          <li>
             <Icon icon="ion-merge" fontSize="18px" color="#ffffff"/>
          </li>
          <li>
          	 <Icon icon="ion-android-notifications-none" fontSize="18px" color="#ffffff"/>
          </li>
          <li onClick={this.handleDropdown.bind(this)}>
          	 <Icon icon="ion-chevron-down" fontSize="11px" color="#ffffff"/>
          </li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    dropdownIsOpen :state.dropdownReducer.dropdownIsOpen
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleDropdownState: toggleDropdownState
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Navigation);
