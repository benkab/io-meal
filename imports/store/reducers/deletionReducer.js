const initialState = {
  theObject : null,
  isDeleting: false,
  objectType: null
}

export default deletionReducer = function(state=initialState, action) {
  switch(action.type) {
  	case "SETOBJECT": {
  	  state = {...state, theObject: action.payload}
  	  break;
  	}
  	case "RESETOBJECT": {
      state = {...state, theObject: action.payload}
      break;
    }
    case "ENABLEDELETION": {
      state = {...state, isDeleting: action.payload}
      break;
    }
    case "DISABLEDELETION": {
      state = {...state, isDeleting: action.payload}
      break;
    }
    case "SETOBJECTTYPE": {
      state = {...state, objectType: action.payload}
      break;
    }
  }
 return state;
}
