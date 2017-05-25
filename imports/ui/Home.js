import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Navigation from './Navigation';
import UserDropdown from './UserDropdown';
import Menu from './Menu';
import Category from './Category';
import './../styles/home.css';
import Icon from 'react-ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Home extends TrackerReact(Component) {

  render() {
    return (
      <div className="row home">
      	<Navigation />
        {
          (this.props.dropdownIsOpen.dropdownIsOpen === true) &&
          <UserDropdown />
        }
      	<Menu />
      	<Category />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    dropdownIsOpen :state.dropdownReducer.dropdownIsOpen
  }
}

export default connect(mapStateToProps)(Home);
