import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import './../styles/home.css';
import Icon from 'react-ionicons';
import Avatar from 'react-avatar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setObject, enableDeletion } from './../store/actions/deletionActions';
import { setCategory, enableCategoryDeletion } from './../store/actions/categoryActions';

class CategoryItem extends TrackerReact(Component) {

  deleteCategory(event){
    event.preventDefault();
    this.props.setObject(this.props.category);
    this.props.enableDeletion(this.props.isDeleting);
  }

  updateCategory(event){
    event.preventDefault();
    this.props.setCategory(this.props.category);
    this.props.enableCategoryDeletion(this.props.isEditingCategory);
  }

  render(props) {
    return (
      <div className="row item-row">
        <div className="col-lg-1 col-md-1 col-sm-2 col-xs-3 first-column">
          <Avatar name={this.props.category.description} size={25} round/>
        </div>
        <div className="col-lg-9 col-md-9 col-sm-8 col-xs-6">
          <span>{this.props.category.description}</span>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-3 text-right last-column">
          <ul>
            <li onClick={this.updateCategory.bind(this)}>
              <Icon icon="ion-edit" fontSize="13px" color="#ffffff"/>
            </li>
            <li onClick={this.deleteCategory.bind(this)}>
              <Icon icon="ion-android-delete" fontSize="13px" color="#ffffff"/>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    theObject: state.deletionReducer.theObject,
    isDeleting: state.deletionReducer.isDeleting,
    isEditingCategory : state.categoryReducer.isEditingCategory
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setObject: setObject,
    enableDeletion: enableDeletion,
    setCategory: setCategory,
    enableCategoryDeletion: enableCategoryDeletion
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(CategoryItem);

