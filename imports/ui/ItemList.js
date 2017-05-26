import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ItemItem from './ItemItem';
import Items from './../api/Item';

class ItemList extends TrackerReact(Component) {

  constructor(){
    super();
  }

  items(){
    return Items.find({}).fetch();
  }

  render() {
    return (
      <div className="container items">
        <div className="row">
          {this.items().map( (item) => {
            return <ItemItem key={item._id} item={item} />
          })}
        </div>
      </div>
    )
  }
}

export default ItemList;
