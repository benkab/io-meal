import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Icon from 'react-ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { disableCategoryDeletion } from './../store/actions/categoryActions';
import './../styles/category.css';

class CategoryUpdate extends TrackerReact(Component) {

  constructor(){
    super();
    this.state = {
      description: null
    }
  }

  closeModal(event){
    event.preventDefault();
    this.props.disableCategoryDeletion(this.props.isEditingCategory.isEditingCategory);
  }

  cancelUpdate(event){
    event.preventDefault();
    this.props.disableCategoryDeletion(this.props.isEditingCategory.isEditingCategory);
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

  updateCategory(event){
    event.preventDefault();
    const category = {
      id: this.props.category.category._id,
      description: this.refs.description.value.trim()
    }

    if(!description){
      this.setState({description: true});
      Bert.alert('Validation failed', 'danger', 'growl-bottom-left');
    } else {
      if(this.refs.description.value.trim()){
        Meteor.call('updateCategory', category, (error, result) => {
          if(error){
            console.log(error);
          } else {
            Bert.alert('You have successfully updated the category', 'success', 'growl-bottom-left');
            this.refs.description.value = '';
            this.props.disableCategoryDeletion(this.props.isEditingCategory.isEditingCategory);
          }
        });
      }
    }
      
  }

  render() {
    console.log(this.props.category)
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
          <p className="title">Update a category</p>
          <div className="modal-body">
            <form className="new-category" onSubmit={this.updateCategory.bind(this)}>
              <div className="form-group">
                <input 
                  type="text" 
                  className={'form-control' + (this.state.description ? ' hasError' : '')}
                  id="description"
                  placeholder="Description"
                  ref="description"
                  defaultValue={this.props.category.category.description}
                  onChange={this.onChangeDescription.bind(this)}
                  name="description" />
              </div>
              <button 
                type="submit" 
                className="small-submit-btn btn-block">Submit</button>
              <button 
                type="button" 
                className="small-submit-cancel btn-block"
                onClick={this.cancelUpdate.bind(this)}>Cancel</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isEditingCategory : state.categoryReducer,
    category:  state.categoryReducer.category,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    disableCategoryDeletion: disableCategoryDeletion
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(CategoryUpdate);
