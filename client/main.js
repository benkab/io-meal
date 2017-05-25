import { Meteor } from 'meteor/meteor';
import React from 'react'; 
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Tracker } from 'meteor/tracker';
import Home from '../imports/ui/Home';
import Signin from '../imports/ui/Signin';
import Signup from '../imports/ui/Signup';

import { Provider } from 'react-redux';
import store from './../imports/store';

const unauthenticatedPages = [
  '/signin', '/signup'
];
const authenticatedPages = [
  '/'
];
const onEnterPublicPage = () => {
  if(Meteor.userId()){
  	browserHistory.replace('/');
  }
};
const onEnterPrivatePage = () => {
  if(!Meteor.userId()){
  	browserHistory.replace('/signin');
  }
};

const routes = (
  <Provider store={store}>
  	<Router history={browserHistory}>
  	  <Route path="/" component={Home} onEnter={onEnterPrivatePage}/>
      <Route path="/signin" component={Signin} onEnter={onEnterPublicPage}/>
      <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
  	</Router>
  </Provider>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});

Tracker.autorun(() => {

  const isAuthenticated 		= !!Meteor.userId();
  const pathname 				= browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage 	= unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage 	= authenticatedPages.includes(pathname);

  if(isUnauthenticatedPage && isAuthenticated){
  	browserHistory.replace('/');
  } else if (isAuthenticatedPage && !isAuthenticated) {
  	browserHistory.replace('/signin');
  }
  
});
