import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import './../styles/home.css';
import Icon from 'react-ionicons';
import Avatar from 'react-avatar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setObject, enableDeletion, setObjectType } from './../store/actions/deletionActions';
import { setCategory, enableCategoryDeletion } from './../store/actions/categoryActions';
import Items from './../api/Item';

class CategoryItem extends TrackerReact(Component) {

  constructor(){
    super();
    this.state = {
      isDeletable: null,
    }
  }

  deleteCategory(event){
    event.preventDefault();
    this.props.setObjectType("Category");
    this.props.setObject(this.props.category);
    this.props.enableDeletion(this.props.isDeleting);
  }

  updateCategory(event){
    event.preventDefault();
    this.props.setCategory(this.props.category);
    this.props.enableCategoryDeletion(this.props.isEditingCategory);
  }

  componentDidMount(){
    Meteor.setTimeout(() => {
      const count = Items.find({category: this.props.category._id}).count();
      if(count === 0){
        this.setState({isDeletable: true})
      } else if(count === 1) {
        this.setState({isDeletable: null})
      }
    }, 400);
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
            {
              (this.state.isDeletable) &&
              <li onClick={this.deleteCategory.bind(this)}>
                <Icon icon="ion-android-delete" fontSize="13px" color="#ffffff"/>
              </li>
            }
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
    enableCategoryDeletion: enableCategoryDeletion,
    setObjectType: setObjectType
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(CategoryItem);

