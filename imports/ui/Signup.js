import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import './../styles/auth.css';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import User from './../api/User';

class Signup extends TrackerReact(Component) {

  constructor() {
    super();

    this.state = {
      firstname_state: null,
      telephone_state: null,
      email_state: null,
      password_state: null,
      phone_number_match_state: null,
      role_state: null
    }
  } 

  addUser (event) {
    event.preventDefault();

    const user = {
      firstname: this.refs.firstname.value.trim(),
      telephone: this.refs.telephone.value.trim(),
      email: this.refs.email.value.trim(),
      password: this.refs.password.value.trim(),
      isAdmin: this.refs.role.value.trim()
    }

    const phonenumber = /^\d{10}$/;

    if(!this.refs.firstname.value.trim()){
      this.setState({firstname_state: true});
    } 
    else if(!this.refs.telephone.value.trim()){
      this.setState({telephone_state: true});
    } 
    else if(!this.refs.telephone.value.trim().match(phonenumber)){
      this.setState({phone_number_match_state: true});
    } 
    else if(!this.refs.email.value.trim()){
      this.setState({email_state: true});
    } 
    else if(!this.refs.password.value.trim()){
      this.setState({password_state: true});
    } else if(role === 'null'){
      this.setState({role_state: true});
    } 
    else {
      Meteor.call('addUser', user, (error)=> {
        if(error){
          console.log(error);
        } else {
          Bert.alert('Your account has been successfully added', 'success', 'growl-bottom-left');
          this.refs.firstname.value = '';
          this.refs.telephone.value = '';
          this.refs.password.value = '';
          this.refs.email.value = '';
          this.refs.role.value = 'null';

          this.setState({firstname_state: false});
          this.setState({telephone_state: false});
          this.setState({email_state: false});
          this.setState({password_state: false});
          this.setState({phone_number_match_state: false});
          this.setState({role_state: false});
        }
      });
    }
  }

  onChangeFirstname(event) {
    event.preventDefault();
    var firstname = this.refs.firstname.value.trim();
    if(!firstname){
      this.setState({firstname_state: true});
    } 
    else {
      this.setState({firstname_state: false});
    }
  }

  onChangeTelelephone(event) {
    event.preventDefault();
    const phonenumber = /^\d{10}$/;
    var telephone = this.refs.telephone.value.trim();
    if(!telephone){
      this.setState({telephone_state: true});
      this.setState({phone_number_match_state: true});
    } 
    else if(!telephone.match(phonenumber)) {
      this.setState({telephone_state: true});
      this.setState({phone_number_match_state: true});
    }
    else {
      this.setState({telephone_state: false});
      this.setState({phone_number_match_state: false});
    }
  }

  onChangeEmail(event) {
    event.preventDefault();
    var email = this.refs.email.value.trim();
    if(!email){
      this.setState({email_state: true});
    } 
    else {
      this.setState({email_state: false});
    }
  }

  onChangePassword(event) {
    event.preventDefault();
    var password = this.refs.password.value.trim();
    if(!password){
      this.setState({password_state: true});
    } 
    else {
      this.setState({password_state: false});
    }
  }

  onChangeRole(event) {
    event.preventDefault();
    var role = this.refs.role.value.trim();
    if(role === 'null'){
      this.setState({role_state: true});
    } else {
      this.setState({role_state: false});
    }
  }

  render() {
  	return (
	  <div className="row auth-container">
        <div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 col-xs-12">
          <div className="auth">
            <p className="auth-title">Sign up</p>
            <div className="panel panel-default">
              <div className="panel-body">
                <form className="new-user" onSubmit={this.addUser.bind(this)}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      className={'form-control ' + (this.state.firstname_state ? 'hasError' : '')} 
                      id="firstname"
                      ref="firstname" 
                      onChange={this.onChangeFirstname.bind(this)}
                      placeholder="Firstname"
                      name="firstname" />
                  </div>
                  <div className="form-group">
                    <input 
                      type="text" 
                      className={'form-control ' + (this.state.telephone_state ? 'hasError' : '')}
                      id="telephone" 
                      ref="telephone" 
                      placeholder="Telephone"
                      onChange={this.onChangeTelelephone.bind(this)}
                      name="telephone" />
                  </div>
                  <div className="form-group">
                    <input 
                      type="text" 
                      className={'form-control ' + (this.state.email_state ? 'hasError' : '')}
                      id="email" 
                      ref="email" 
                      placeholder="Email"
                      onChange={this.onChangeEmail.bind(this)}
                      name="email" />
                  </div>
                  <div className="form-group">
                    <input 
                      type="password" 
                      className={'form-control ' + (this.state.password_state ? 'hasError' : '')}
                      id="password" 
                      ref="password" 
                      placeholder="Password"
                      onChange={this.onChangePassword.bind(this)}
                      name="password" />
                  </div>
                  <div className="form-group">
                    <div className={'select-enclosure ' + (this.state.role_state ? 'hasError' : '')}>
                      <select
                        className="form-control"
                        id="role" 
                        onChange={this.onChangeRole.bind(this)}
                        ref="role"
                        placeholder="Role"
                        name="role">
                        <option value="null">Choose one</option>
                        <option value="false">Normal user</option>
                        <option value="true">Administrator</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success btn-block">Submit</button>
                </form>
              </div>
            </div>
            <p className="link" onClick={() => {browserHistory.push('/signin')}}>I already have an account</p>
          </div>
        </div>
      </div>
  	)
  }
}

export default Signup;
