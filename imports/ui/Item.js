import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import './../styles/home.css';
import './../styles/item.css';
import Layout from './Layout';
import Icon from 'react-ionicons';
import ItemList from './ItemList';
import ItemInput from './ItemInput';
import ItemUpdate from './ItemUpdate';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleModalState } from './../store/actions/modalActions';
import DeleteModal from './DeleteModal';

class Item extends TrackerReact(Component) {

  constructor(){
    super();
    this.state = {
      subscription: {
        items : Meteor.subscribe('items'),
        categories : Meteor.subscribe('categories')
      }
    }
  }

  componentWillUnmount() {
    this._renderComputation.stop();
    Meteor.subscribe('items').stop();
    Meteor.subscribe('categories').stop();
  }

  displayModal(event){
    event.preventDefault();
    this.props.toggleModalState(this.props.modalIsDiplayed)
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
                <a onClick={this.displayModal.bind(this)}>New item</a>
              </div>
            </div>
          </div>
          <ItemList />
          {
            (this.props.modalIsDiplayed.modalIsDiplayed === true) &&
            <ItemInput />
          }
          {
            (this.props.isEditing.isEditingItem === true) &&
            <ItemUpdate />
          }
          {
            (this.props.isDeleting.isDeleting === true) &&
            <DeleteModal />
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    modalIsDiplayed :state.modalReducer.modalIsDiplayed,
    isDeleting: state.deletionReducer.isDeleting,
    isEditing: state.itemReducer.isEditingItem
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleModalState: toggleModalState
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Item);

