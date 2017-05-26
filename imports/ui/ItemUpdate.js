import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Icon from 'react-ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setItem, disableItemEdition } from './../store/actions/itemActions';
import { closeModalState, toggleModalState } from './../store/actions/modalActions';
import './../styles/category.css';
import Categories from './../api/Category';

class ItemUpdate extends TrackerReact(Component) {

  constructor(){
    super();
    this.state = {
      description: null,
      category: null,
      comment: null,
      subscription: {
        categories : Meteor.subscribe('categories')
      }
    }
  }

  categories(){
    return Categories.find({}).fetch();
  }

  componentWillUnmount() {
    this._renderComputation.stop();
    Meteor.subscribe('categories').stop();
  }

  closeModal(event){
    event.preventDefault();
    this.props.disableItemEdition(this.props.isEditing);
  }

  cancelUpdate(event){
    event.preventDefault();
    this.props.disableItemEdition(this.props.isEditing);
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

  onChangeComment(event) {
    event.preventDefault();
    var comment = this.refs.comment.value.trim();
    if(!comment){
      this.setState({comment: true});
    } 
    else {
      this.setState({comment: false});
    }
  }

  onChangeCategory(event) {
    event.preventDefault();
    var category = this.refs.category.value.trim();
    if(category === 'null'){
      this.setState({category: true});
    } else {
      this.setState({category: false});
    }
  }

  updateItem(event){
    event.preventDefault();
    const item = {
      id: this.props.theItem.item._id,
      description: this.refs.description.value.trim(),
      comment: this.refs.comment.value.trim(),
      category: this.refs.category.value.trim()
    }

    if(!this.refs.description.value.trim()){
      this.setState({description: true});
    } else if(this.refs.category.value.trim() == 'null'){
      this.setState({category: true});
    } else if(!this.refs.comment.value.trim()){
      this.setState({comment: true});
    }
    else {

      Meteor.call('updateItem', item, (error, result) => {
        if(error){
          console.log(error);
        } else {
          Bert.alert('You have successfully updated the item', 'success', 'growl-bottom-left');
          this.refs.description.value = '';
          this.refs.comment.value = '';
          this.refs.category.value = '';
          this.props.disableItemEdition(this.props.isEditing);
        }
      });
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
          <p className="title">Update an item</p>
          <div className="modal-body">
            <form className="new-category" onSubmit={this.updateItem.bind(this)}>
              <div className="form-group">
                <input 
                  type="text" 
                  className={'form-control' + (this.state.description ? ' hasError' : '')}
                  id="description"
                  placeholder="Description"
                  ref="description"
                  onChange={this.onChangeDescription.bind(this)}
                  defaultValue={this.props.theItem.item.description}
                  name="description" />
              </div>
              <div className="form-group">
                <div className={'select-enclosure ' + (this.state.category ? ' hasError' : '')}>
                  <select
                    className="form-control"
                    id="category" 
                    onChange={this.onChangeCategory.bind(this)}
                    ref="category"
                    defaultValue={this.props.theItem.item.category}
                    name="category">
                    <option value="null">Choose one</option>
                    {this.categories().map( (category) => {
                      return <option key={category._id} value={category._id}>{category.description}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <textarea 
                  type="text" 
                  className={'form-control' + (this.state.comment ? ' hasError' : '')}
                  id="comment"
                  placeholder="Comment"
                  ref="comment"
                  onChange={this.onChangeComment.bind(this)}
                  defaultValue={this.props.theItem.item.comment}
                  name="comment"></textarea>
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
    isEditing: state.itemReducer.isEditingItem,
    theItem: state.itemReducer.item
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setItem: setItem,
    disableItemEdition: disableItemEdition
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ItemUpdate);
