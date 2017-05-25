const initialState = {
  modalIsDiplayed : false
}

export default modalReducer = function(state=initialState, action) {
  switch(action.type) {
  	case "TOGGLEMODALSTATE": {
  	  state = {...state, modalIsDiplayed: action.payload}
  	  break;
  	}
  	case "CLOSEMODALSTATE": {
  	  state = {...state, modalIsDiplayed: action.payload}
  	  break;
  	}
  }
 return state;
}