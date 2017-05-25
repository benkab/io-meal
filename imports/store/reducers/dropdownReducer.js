const initialState = {
  dropdownIsOpen : false
}

export default dropdownReducer = function(state=initialState, action) {
  switch(action.type) {
  	case "TOGGLEDROPDOWNSTATE": {
  	  state = {...state, dropdownIsOpen: action.payload}
  	  break;
  	}
  	case "CLOSEDROPDOWNSTATE": {
  	  state = {...state, dropdownIsOpen: action.payload}
  	  break;
  	}
  }
 return state;
}