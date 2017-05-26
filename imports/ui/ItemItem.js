import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Icon from 'react-ionicons';
import Avatar from 'react-avatar';
import { setObject, enableDeletion, setObjectType } from './../store/actions/deletionActions';
import { setItem, enableItemEdition } from './../store/actions/itemActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Categories from './../api/Category';

class ItemItem extends TrackerReact(Component) {

  constructor(){
    super();
    this.state = {
      category: null
    }
  }

  componentDidMount(){
    Meteor.setTimeout(() => {
      const category = Categories.findOne({_id: this.props.item.category});
      this.setState({category: category})
    }, 200);
  }

  deleteItem(event){
    event.preventDefault();
    this.props.setObject(this.props.item);
    this.props.setObjectType("Item");
    this.props.enableDeletion(this.props.isDeleting);
  }

  updateItem(event){
    event.preventDefault();
    this.props.setItem(this.props.item);
    this.props.enableItemEdition(this.props.theItem);
  }

  render(props) {
    return (
      <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <div className="panel panel-default">
          <div className="panel-body">
            <p>{this.props.item.description}</p>
            <div className="comment">
              {this.props.item.comment}
            </div>
            <div className="category">
              {
                this.state.category &&
                <span>
                  {this.state.category.description}
                </span>
              }
            </div>
            <div className="actions">
              <ul>
                <li onClick={this.updateItem.bind(this)}>
                  <Icon icon="ion-edit" fontSize="13px" color="#ffffff"/>
                </li>
                <li onClick={this.deleteItem.bind(this)}>
                  <Icon icon="ion-android-delete" fontSize="13px" color="#ffffff"/>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    theObject: state.deletionReducer.theObject,
    isDeleting: state.deletionReducer.isDeleting,
    theItem: state.itemReducer.item
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setObject: setObject,
    enableDeletion: enableDeletion,
    setObjectType: setObjectType,
    setItem: setItem,
    enableItemEdition: enableItemEdition
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ItemItem);
