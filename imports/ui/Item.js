import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import './../styles/home.css';
import Layout from './Layout';

class Item extends TrackerReact(Component) {

  constructor(){
    super();
  }


  render() {
    return (
      <div>
        <Layout />
        <div className="row home">
          <div className="container">
            <div className="row title-row">
              <span>Items</span>
              <div className="pull-right right-container">
                <input 
                  type="text" 
                  className="search" 
                  placeholder="Search" 
                  ref="search"/>
                <a>New item</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Item;
