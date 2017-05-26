import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import './../styles/menu.css';
import { Link, browserHistory } from 'react-router';

class Menu extends Component {

  constructor(){
  	super();
  	this.state = {
  	  hasOpenClass: true
  	}
  }

  toggleMenu(event){
  	event.preventDefault();
  	this.setState({hasOpenClass: !this.state.hasOpenClass})
  }

  render() {
    return (
	  	<div className={(this.state.hasOpenClass ? 'open menu' : 'menu')}>
	  	  <div className="row">
	      	<ul>
	      	  <li onClick={() => {browserHistory.push('/items')}}>
	      	   	<a>Items</a>
	      	  </li>
	      	  <li onClick={() => {browserHistory.push('/categories')}}>
	      	   	<a>Categories</a>
	      	  </li>
	      	  <li>
	      	   	<a>Orders</a>
	      	  </li>
	      	  <li>
	      	   	<a>Users</a>
	      	  </li>
	      	</ul>
	  	  </div>
	  	  <div className="row navContainer">
	  	  	{
	  	      (this.state.hasOpenClass === true) &&
	  	      <img src="/down.png" onClick={this.toggleMenu.bind(this)}/>
	  	  	}
	  	  	{
	  	      (this.state.hasOpenClass === false) &&
	  	      <img src="/up.png" onClick={this.toggleMenu.bind(this)}/>
	  	  	}
	  	  </div>
	  	</div>
    )
  }
}

export default Menu;

