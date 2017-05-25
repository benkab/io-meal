const initialState = {
  category : null,
  isEditingCategory: false
}

export default categoryReducer = function(state=initialState, action) {
  switch(action.type) {
  	case "SETCATEGORY": {
  	  state = {...state, category: action.payload}
  	  break;
  	}
  	case "RESETCATEGORY": {
      state = {...state, category: action.payload}
      break;
    }
    case "ENABLECATEGORYEDITION": {
      state = {...state, isEditingCategory: action.payload}
      break;
    }
    case "DISABLECATEGORYEDITION": {
      state = {...state, isEditingCategory: action.payload}
      break;
    }
  }
 return state;
}
