const initialState = {
  item : null,
  isEditingItem: false
}

export default itemReducer = function(state=initialState, action) {
  switch(action.type) {
  	case "SETITEM": {
  	  state = {...state, item: action.payload}
  	  break;
  	}
  	case "RESETITEM": {
      state = {...state, item: action.payload}
      break;
    }
    case "ENABLEITEMEDITION": {
      state = {...state, isEditingItem: action.payload}
      break;
    }
    case "DISABLEITEMEDITION": {
      state = {...state, isEditingItem: action.payload}
      break;
    }
  }
 return state;
}
