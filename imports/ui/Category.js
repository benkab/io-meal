import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import './../styles/home.css';
import Icon from 'react-ionicons';
import Avatar from 'react-avatar';
import CategoryItem from './CategoryItem';
import CategoryInput from './CategoryInput';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleModalState } from './../store/actions/modalActions';
import Categories from './../api/Category';
import DeleteModal from './DeleteModal';
import CategoryUpdate from './CategoryUpdate';
import Layout from './Layout';

class Category extends TrackerReact(Component) {

  constructor(){
    super();
    this.state = {
      showModal: false,
      subscription : {
        categories : Meteor.subscribe('categories'),
        items : Meteor.subscribe('items')
      },
      search: null,
      results: []
    }
  }

  displayModal(event){
    event.preventDefault();
    this.props.toggleModalState(this.props.modalIsDiplayed)
  }

  categories(){
    return Categories.find({}).fetch();
  }

  categories_resutls(){
    const term = this.refs.search.value.trim();
    if(term){
      this.setState({search: term})
      const categories = Categories.find(
        {description: 
          { $regex: new RegExp("^" + term.toLowerCase(), "i") }
        }
      );
      this.setState({results: categories})
    } else {
      this.setState({search: null})
      this.setState({results: []})
    }
  }

  componentWillUnmount() {
    this._renderComputation.stop();
    Meteor.subscribe('items').stop();
    Meteor.subscribe('categories').stop();
  }

  render() {
    return (
      <div>
        <Layout />
        <div className="row home">
          <div className="container">
            <div className="row title-row">
              <span>Categories</span>
              <div className="pull-right right-container">
                <input 
                  type="text" 
                  className="search" 
                  placeholder="Search" 
                  ref="search"
                  onChange={this.categories_resutls.bind(this)}/>
                <a onClick={this.displayModal.bind(this)}>New category</a>
              </div>
            </div>
            {
              !this.state.search &&
              <div>
                {this.categories().map( (category) => {
                  return <CategoryItem key={category._id} category={category} />
                })}
              </div>
            }
            {
              (this.state.search && this.state.results) &&
              <div>
                {this.state.results.map( (category) => {
                  return <CategoryItem key={category._id} category={category} />
                })}
              </div>
            }  
          </div>
          {
            (this.props.modalIsDiplayed.modalIsDiplayed === true) &&
            <CategoryInput title={'Adding a category'} />
          }
          {
            (this.props.isDeleting.isDeleting === true) &&
            <DeleteModal />
          }
          {
            (this.props.isEditingCategory.isEditingCategory === true) &&
            <CategoryUpdate />
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    modalIsDiplayed :state.modalReducer.modalIsDiplayed,
    theObject: state.deletionReducer.theObject,
    isDeleting: state.deletionReducer.isDeleting,
    isEditingCategory : state.categoryReducer.isEditingCategory
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleModalState: toggleModalState
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Category);

