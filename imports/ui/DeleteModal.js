import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Icon from 'react-ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './../styles/category.css';
import { resetObject, disableDeletion } from './../store/actions/deletionActions';

class DeleteModal extends TrackerReact(Component) {

  closeModal(event){
    event.preventDefault();
    this.props.resetObject(this.props.theObject.theObject);
    this.props.disableDeletion(this.props.isDeleting.isDeleting);
  }

  cancelDeletion(event){
    event.preventDefault();
    this.props.resetObject(this.props.theObject.theObject);
    this.props.disableDeletion(this.props.isDeleting.isDeleting);
  }

  delete(event){
    event.preventDefault();
    const id = this.props.theObject.theObject._id;
    Meteor.call('deleteCategory', id, (error, result) => {
      if(error){
        console.log(error);
      } else {
        Bert.alert('You have successfully deleted a category', 'success', 'growl-bottom-left');
        this.props.resetObject(this.props.theObject.theObject);
        this.props.disableDeletion(this.props.isDeleting.isDeleting);
      }
    });    
  }


  render(props) {
    return (
      <div className="modal-container">
        <span className="closeButton" onClick={this.closeModal.bind(this)}>
          <Icon 
            icon="ion-close-circled" 
            fontSize="19px" 
            color="#ffffff" 
          />
        </span>
        <div className="modal-box">
          <p className="title">Delete a category</p>
          <div className="modal-body">
            <p>Do you want to delete the category?</p>
            <button 
              type="button" 
              className="small-submit-delete btn-block"
              onClick={this.delete.bind(this)}>Delete</button>
            <button 
              type="button" 
              className="small-submit-cancel btn-block"
              onClick={this.cancelDeletion.bind(this)}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    theObject: state.deletionReducer.theObject,
    isDeleting: state.deletionReducer.isDeleting
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    resetObject: resetObject,
    disableDeletion: disableDeletion
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(DeleteModal);
