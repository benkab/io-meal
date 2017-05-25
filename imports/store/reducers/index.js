import { combineReducers } from 'redux';

import modalReducer from './modalReducer';
import dropdownReducer from './dropdownReducer';
import deletionReducer from './deletionReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
  modalReducer,
  dropdownReducer,
  deletionReducer,
  categoryReducer
});
