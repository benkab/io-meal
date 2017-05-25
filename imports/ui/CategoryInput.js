import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Icon from 'react-ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { closeModalState, toggleModalState } from './../store/actions/modalActions';
import './../styles/category.css';

class CategoryInput extends TrackerReact(Component) {

  constructor(){
    super();
    this.state = {
      description: null
    }
  }

  closeModal(event){
    event.preventDefault();
    this.props.closeModalState(this.props.modalIsDiplayed.modalIsDiplayed);
  }

  onChangeDescription(event) {
    event.preventDefault();
    var description = this.refs.description.value.trim();
    if(!description){
      this.setState({description: true});
    } 
    else {
      this.setState({description: false});
    }
  }

  addCategory(event){
    event.preventDefault();
    const category = {
      description: this.refs.description.value.trim()
    }

    if(!description){
      this.setState({description: true});
      Bert.alert('Validation failed', 'danger', 'growl-bottom-left');
    } else {
      if(this.refs.description.value.trim()){
        Meteor.call('addCategory', category, (error, result) => {
          if(error){
            console.log(error);
          } else {
            if(result === 'Existing'){
              Bert.alert('You have entered an existing category description', 'danger', 'growl-bottom-left');
            } else {
              Bert.alert('You have successfully added a new category', 'success', 'growl-bottom-left');
              this.refs.description.value = '';
              this.props.closeModalState(this.props.modalIsDiplayed.modalIsDiplayed);
            }
          }
        });
      }
    }
      
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
          <p className="title">Add a category</p>
          <div className="modal-body">
            <form className="new-category" onSubmit={this.addCategory.bind(this)}>
              <div className="form-group">
                <input 
                  type="text" 
                  className={'form-control' + (this.state.description ? ' hasError' : '')}
                  id="description"
                  placeholder="Description"
                  ref="description"
                  onChange={this.onChangeDescription.bind(this)}
                  name="description" />
              </div>
              <button type="submit" className="small-submit-btn btn-block">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    modalIsDiplayed :state.modalReducer
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    closeModalState: closeModalState,
    toggleModalState: toggleModalState
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(CategoryInput);
